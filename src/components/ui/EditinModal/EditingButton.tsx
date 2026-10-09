"use client"

import s from "./styles.module.scss"
import Button from "@/components/ui/Button/Button"
import { useProfileEdit } from "./ProfileEditContext"

// "Editar Perfil" liga o modo de edição; "Concluir edição" salva tudo de uma vez; "Cancelar" descarta
export default function EditingButton() {
	const { canEdit, isEditing, isSaving, error, startEditing, finishEditing, cancelEditing } =
		useProfileEdit()

	if (!canEdit) return null

	return (
		<div className={s.modalContainer}>
			{isEditing ? (
				<div className={s.actions}>
					<Button
						onClick={finishEditing}
						label={isSaving ? "Salvando..." : "Concluir edição"}
						icon={"EditIcon"}
						disabled={isSaving}
					/>
					<Button onClick={cancelEditing} label="Cancelar" disabled={isSaving} />
					{error ? <span className={s.error}>{error}</span> : null}
				</div>
			) : (
				<Button onClick={startEditing} label="Editar Perfil" icon={"EditIcon"} />
			)}
		</div>
	)
}
