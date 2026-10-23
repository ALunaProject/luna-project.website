"use client"

import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { STORAGE_KEYS } from "@/utils/contants"
import { isReservedUsername } from "@/utils/reservedUsernames"
import { updateUserProfile, uploadUserImage } from "@/services/userServices"
import ImageDropModal from "./ImageDropModal"

export type ImageField = "avatar" | "banner"
export type TextField = "username" | "bio"

type Previews = Record<ImageField, string | null>
type Files = Record<ImageField, File | null>

interface ProfileEditContextValue {
	canEdit: boolean
	isEditing: boolean
	isSaving: boolean
	error: string | null
	// rascunho dos textos (só vale enquanto isEditing)
	draft: Record<TextField, string>
	usernameError: string | null
	// URL local (blob) das imagens escolhidas, ainda não enviadas
	previews: Previews
	setText: (field: TextField, value: string) => void
	openImagePicker: (field: ImageField) => void
	startEditing: () => void
	cancelEditing: () => void
	finishEditing: () => void
}

const ProfileEditContext = createContext<ProfileEditContextValue | null>(null)

export function useProfileEdit() {
	const ctx = useContext(ProfileEditContext)
	if (!ctx) {
		throw new Error("useProfileEdit precisa estar dentro de <ProfileEditProvider>")
	}
	return ctx
}

// devolve uma frase curta; quem chama coloca o "Não foi possível salvar X." na frente
function getErrorMessage(err: unknown) {
	if (err instanceof Error && err.message === "username-not-applied") {
		return "O servidor não aplicou o novo username."
	}
	if (axios.isAxiosError(err)) {
		const status = err.response?.status
		if (status === 401 || status === 403) {
			return "Sem permissão. Faça login de novo."
		}
		if (status === 409) return "Esse username já está em uso."
		if (status === 400) return "Dados inválidos. Confira o username e a imagem."
		if (status === 413) return "Imagem grande demais para o servidor."
		if (!err.response) return "Não consegui falar com o servidor."
	}
	return "Tente de novo."
}

interface ProviderProps {
	profileUser: UserDTO
	children: ReactNode
}

export function ProfileEditProvider({ profileUser, children }: ProviderProps) {
	const router = useRouter()
	const { isLoggedIn, user } = useAuth()

	const [isEditing, setIsEditing] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [error, setError] = useState<string | null>(null)

	// rascunho: nada disso vai pro back até clicar em "Concluir edição"
	const [draft, setDraft] = useState<Record<TextField, string>>({
		username: profileUser.username,
		bio: profileUser.bio ?? "",
	})
	const [files, setFiles] = useState<Files>({ avatar: null, banner: null })
	const [pickerField, setPickerField] = useState<ImageField | null>(null)

	// previews (blob:) — o ref guarda o valor atual pra conseguir liberar a URL antiga
	const previewRef = useRef<Previews>({ avatar: null, banner: null })
	const [previews, setPreviews] = useState<Previews>(previewRef.current)

	const setPreview = useCallback((field: ImageField, url: string | null) => {
		const old = previewRef.current[field]
		if (old) URL.revokeObjectURL(old)
		previewRef.current = { ...previewRef.current, [field]: url }
		setPreviews(previewRef.current)
	}, [])

	// libera as URLs locais ao sair da página
	useEffect(() => {
		return () => {
			Object.values(previewRef.current).forEach(url => {
				if (url) URL.revokeObjectURL(url)
			})
		}
	}, [])

	// depois de salvar, o router.refresh() traz a URL nova do back: aí o preview local não é mais necessário
	useEffect(() => {
		setPreview("avatar", null)
	}, [profileUser.profilePicUrl, setPreview])
	useEffect(() => {
		setPreview("banner", null)
	}, [profileUser.bannerUrl, setPreview])

	// só o dono do perfil edita (/[username] == usuário logado)
	const canEdit = isLoggedIn && !!user && user.username === profileUser.username

	// valida o username enquanto digita (bloqueia espaço e nome de rota)
	const usernameError = useMemo(() => {
		if (!isEditing) return null
		const name = draft.username.trim()
		if (!name) return "O username não pode ficar vazio."
		if (/\s/.test(name)) return "O username não pode ter espaço."
		// quem já tem um nome reservado (conta antiga) ainda pode editar o resto do perfil
		if (name !== profileUser.username && isReservedUsername(name)) {
			return "Esse nome é reservado pelo site. Escolha outro."
		}
		return null
	}, [isEditing, draft.username, profileUser.username])

	function startEditing() {
		setDraft({ username: profileUser.username, bio: profileUser.bio ?? "" })
		setFiles({ avatar: null, banner: null })
		setError(null)
		setIsEditing(true)
	}

	function leaveEditing() {
		setIsEditing(false)
		setFiles({ avatar: null, banner: null })
		setPickerField(null)
		setError(null)
	}

	// descarta o rascunho (inclusive os previews de imagem)
	function cancelEditing() {
		if (isSaving) return
		setPreview("avatar", null)
		setPreview("banner", null)
		leaveEditing()
	}

	function setText(field: TextField, value: string) {
		setDraft(prev => ({ ...prev, [field]: value }))
	}

	function openImagePicker(field: ImageField) {
		if (canEdit && isEditing) setPickerField(field)
	}

	// o popup só escolhe o arquivo: vira preview e fica guardado até o "Concluir edição"
	function pickImage(field: ImageField, file: File) {
		setFiles(prev => ({ ...prev, [field]: file }))
		setPreview(field, URL.createObjectURL(file))
		setPickerField(null)
	}

	async function finishEditing() {
		if (isSaving) return
		if (usernameError) {
			setError("Corrija o username antes de concluir.")
			return
		}

		const nextUsername = draft.username.trim()
		const renamed = nextUsername !== profileUser.username
		const textChanged = renamed || draft.bio !== (profileUser.bio ?? "")

		// nada mudou: só sai do modo de edição
		if (!textChanged && !files.avatar && !files.banner) {
			leaveEditing()
			return
		}

		setIsSaving(true)
		setError(null)

		let step = "os dados do perfil"
		try {
			if (textChanged) {
				const updated = await updateUserProfile(profileUser.id, {
					username: nextUsername,
					bio: draft.bio,
				})
				// se o back respondeu com outro username, ele não aplicou a troca
				if (updated?.username && updated.username !== nextUsername) {
					throw new Error("username-not-applied")
				}
			}
			if (files.avatar) {
				step = "a foto"
				await uploadUserImage(profileUser.id, "profilePic", files.avatar)
			}
			if (files.banner) {
				step = "o banner"
				await uploadUserImage(profileUser.id, "banner", files.banner)
			}
		} catch (err) {
			// continua no modo de edição, com o rascunho intacto, pra tentar de novo
			setError(`Não foi possível salvar ${step}. ${getErrorMessage(err)}`)
			setIsSaving(false)
			return
		}

		setIsSaving(false)
		leaveEditing()

		if (renamed) {
			// a rota é /[username], então precisa ir pra nova URL
			localStorage.setItem(STORAGE_KEYS.USER, nextUsername)
			router.replace(`/${encodeURIComponent(nextUsername)}`)
		} else {
			router.refresh() // re-renderiza a página (server) com os dados novos
		}
	}

	const value: ProfileEditContextValue = {
		canEdit,
		isEditing,
		isSaving,
		error,
		draft,
		usernameError,
		previews,
		setText,
		openImagePicker,
		startEditing,
		cancelEditing,
		finishEditing,
	}

	return (
		<ProfileEditContext.Provider value={value}>
			{children}

			{canEdit && isEditing && pickerField ? (
				<ImageDropModal
					title={
						pickerField === "avatar" ? "Alterar foto de perfil" : "Alterar banner"
					}
					shape={pickerField === "avatar" ? "round" : "wide"}
					onClose={() => setPickerField(null)}
					onConfirm={file => pickImage(pickerField, file)}
				/>
			) : null}
		</ProfileEditContext.Provider>
	)
}
