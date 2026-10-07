"use client"

import s from "./styles.module.scss"
import Button from "@/components/ui/Button/Button"
import { useProfileEdit } from "./ProfileEditContext"

// Liga/desliga o modo de edição do perfil (só aparece pro dono do perfil)
export default function EditingButton() {
	const { canEdit, isEditing, toggleEditing } = useProfileEdit()

	if (!canEdit) return null

	return (
		<div className={s.modalContainer}>
			<Button
				onClick={toggleEditing}
				label={isEditing ? "Concluir edição" : "Editar Perfil"}
				icon={"EditIcon"}
			/>
		</div>
	)
}
