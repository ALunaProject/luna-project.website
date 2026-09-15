"use client"
import s from "./styles.module.scss"
import { useAuth } from "@/hooks/useAuth"
import Button from "@/components/ui/Button/Button"
import { useState } from "react"
import UserProfile from "@/components/shared/UserProfile/UserProfile"
import { DEFAULT_AVATAR } from "@/utils/contants"
import { updateUserById } from "@/services/userServices"

interface EditingButtonProps {
	profileUsername: string
	profileUser: UserDTO
}

export default function EditingButton({
	profileUsername,
	profileUser,
}: EditingButtonProps) {
	const { isLoggedIn, user } = useAuth()
	const [isOpen, setIsOpen] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const [username, setUsername] = useState(profileUser.username)
	const [bio, setBio] = useState(profileUser.bio ?? "")
	// adicionar imagens depois, back ta com sono

	if (!isLoggedIn || !user || user.username !== profileUsername) return null

	// só aparece quando {userLogado == http://.../[username]}

	async function handleSave() {
		setIsSaving(true)
		const updated = await updateUserById(profileUser.id, username, bio)
		alert("backend ta com sono")
		setIsSaving(false)
		// if (!updated) {
		//     setError("Não foi possível salvar. Tenta de novo.")
		//     return
		// }
		setIsOpen(false)
	}

	return (
		<div className={s.modalContainer}>
			<Button
				onClick={() => {
					setIsOpen(true)
				}}
				label={"Editar Perfil"}
				icon={"EditIcon"}
			/>
			{isOpen && user ? (
				<div className={s.modalContent}>
					<UserProfile
						username={profileUser.username}
						userPP={profileUser.profilePicUrl || DEFAULT_AVATAR}
					/>
					<div className={s.modalLabelSec}>
						<span>Alterar Username:</span>
						<input
							value={username}
							onChange={e => setUsername(e.target.value)}
							type="text"
						/>
					</div>
					<div className={s.modalLabelSec}>
						<span>Alterar Descrição:</span>
						<input
							value={bio}
							placeholder="sem descrição, ainda sla"
							onChange={e => setBio(e.target.value)}
							type="text"
						/>
					</div>
					<div className={s.modalButtons}>
						<Button
							onClick={handleSave}
							label={isSaving ? "Salvando..." : "Salvar"}
						/>
						<Button
							onClick={() => setIsOpen(false)}
							label={"Cancelar"}
						/>
					</div>
				</div>
			) : null}
		</div>
	)
}
