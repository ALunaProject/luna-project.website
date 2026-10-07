"use client"

import {
	createContext,
	ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { STORAGE_KEYS } from "@/utils/contants"
import { updateUserProfile, uploadUserImage } from "@/services/userServices"
import ImageDropModal from "./ImageDropModal"
import TextEditModal from "./TextEditModal"

export type EditableFieldName = "avatar" | "banner" | "username" | "bio"

interface ProfileEditContextValue {
	canEdit: boolean
	isEditing: boolean
	toggleEditing: () => void
	openField: (field: EditableFieldName) => void
}

const ProfileEditContext = createContext<ProfileEditContextValue | null>(null)

export function useProfileEdit() {
	const ctx = useContext(ProfileEditContext)
	if (!ctx) {
		throw new Error("useProfileEdit precisa estar dentro de <ProfileEditProvider>")
	}
	return ctx
}

function getErrorMessage(err: unknown) {
	if (axios.isAxiosError(err)) {
		const status = err.response?.status
		if (status === 401 || status === 403) {
			return "Sem permissão. Faça login de novo e tente outra vez."
		}
		if (status === 409) return "Esse username já está em uso."
		if (status === 400) return "Dados inválidos. Confira o que você digitou."
		if (status === 413) return "Imagem grande demais para o servidor."
		const msg = err.response?.data?.message ?? err.response?.data?.error
		if (typeof msg === "string" && msg) return msg
		if (!err.response) return "Não consegui falar com o servidor."
	}
	return "Não foi possível salvar. Tente de novo."
}

interface ProviderProps {
	profileUser: UserDTO
	children: ReactNode
}

export function ProfileEditProvider({ profileUser, children }: ProviderProps) {
	const router = useRouter()
	const { isLoggedIn, user } = useAuth()

	const [isEditing, setIsEditing] = useState(false)
	const [activeField, setActiveField] = useState<EditableFieldName | null>(null)
	const [isSaving, setIsSaving] = useState(false)
	const [error, setError] = useState<string | null>(null)

	// só o dono do perfil edita (/[username] == usuário logado)
	const canEdit = isLoggedIn && !!user && user.username === profileUser.username

	const toggleEditing = useCallback(() => {
		setIsEditing(prev => !prev)
		setActiveField(null)
		setError(null)
	}, [])

	const openField = useCallback((field: EditableFieldName) => {
		setError(null)
		setActiveField(field)
	}, [])

	const closeField = useCallback(() => {
		setActiveField(null)
		setError(null)
	}, [])

	async function saveText(field: "username" | "bio", value: string) {
		const nextUsername = field === "username" ? value.trim() : profileUser.username
		const nextBio = field === "bio" ? value : (profileUser.bio ?? "")

		if (!nextUsername) {
			setError("O username não pode ficar vazio.")
			return
		}
		// o back recusa username com espaço (UserUpdateDto)
		if (/\s/.test(nextUsername)) {
			setError("O username não pode ter espaço.")
			return
		}

		setIsSaving(true)
		setError(null)
		try {
			const updated = await updateUserProfile(profileUser.id, {
				username: nextUsername,
				bio: nextBio,
			})

			// se o back respondeu com outro username, ele não aplicou a troca: não navega pra uma rota que não existe
			const savedUsername = updated?.username ?? nextUsername
			if (field === "username" && savedUsername !== nextUsername) {
				setError(
					`O back respondeu com o username "${savedUsername}" (não aplicou a troca).`,
				)
				return
			}
			setActiveField(null)

			if (savedUsername !== profileUser.username) {
				// a rota é /[username], então precisa ir pra nova URL
				localStorage.setItem(STORAGE_KEYS.USER, savedUsername)
				router.replace(`/${encodeURIComponent(savedUsername)}`)
			} else {
				router.refresh()
			}
		} catch (err) {
			setError(getErrorMessage(err))
		} finally {
			setIsSaving(false)
		}
	}

	async function saveImage(kind: "profilePic" | "banner", file: File) {
		setIsSaving(true)
		setError(null)
		try {
			await uploadUserImage(profileUser.id, kind, file)
			setActiveField(null)
			router.refresh() // re-renderiza a página (server) com a imagem nova
		} catch (err) {
			setError(getErrorMessage(err))
		} finally {
			setIsSaving(false)
		}
	}

	const value = useMemo(
		() => ({ canEdit, isEditing, toggleEditing, openField }),
		[canEdit, isEditing, toggleEditing, openField],
	)

	return (
		<ProfileEditContext.Provider value={value}>
			{children}

			{canEdit && activeField === "username" ? (
				<TextEditModal
					title="Alterar username"
					label="Username"
					initialValue={profileUser.username}
					maxLength={30}
					isSaving={isSaving}
					error={error}
					onClose={closeField}
					onSave={v => saveText("username", v)}
				/>
			) : null}

			{canEdit && activeField === "bio" ? (
				<TextEditModal
					title="Alterar descrição"
					label="Descrição"
					initialValue={profileUser.bio ?? ""}
					multiline
					maxLength={255}
					isSaving={isSaving}
					error={error}
					onClose={closeField}
					onSave={v => saveText("bio", v)}
				/>
			) : null}

			{canEdit && activeField === "avatar" ? (
				<ImageDropModal
					title="Alterar foto de perfil"
					shape="round"
					isSaving={isSaving}
					error={error}
					onClose={closeField}
					onConfirm={file => saveImage("profilePic", file)}
				/>
			) : null}

			{canEdit && activeField === "banner" ? (
				<ImageDropModal
					title="Alterar banner"
					shape="wide"
					isSaving={isSaving}
					error={error}
					onClose={closeField}
					onConfirm={file => saveImage("banner", file)}
				/>
			) : null}
		</ProfileEditContext.Provider>
	)
}
