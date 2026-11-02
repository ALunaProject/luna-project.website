"use client"

import s from "./styles.module.scss"
import Button from "@/components/ui/Button/Button"
import { useProfileEdit } from "./ProfileEditContext"

// "Editar Perfil" liga o modo de edição; "Concluir edição" salva tudo de uma vez; "Cancelar" descarta
export default function EditingButton() {
	const { canEdit, isEditing, isSaving, error, startEditing, finishEditing, cancelEditing } =
		useProfileEdit()

	if (!canEdit) return null

	if (!isEditing) {
		return (
			<div className={s.modalContainer}>
				<Button onClick={startEditing} label="Editar Perfil" icon={"EditIcon"} />
			</div>
		)
	}

	return (
		<div className={s.actions}>
			<Button
				onClick={finishEditing}
				label={isSaving ? "Salvando..." : "Concluir edição"}
				disabled={isSaving}
			/>
			<Button
				onClick={cancelEditing}
				label="Cancelar"
				variant="danger"
				disabled={isSaving}
			/>
			{error ? <span className={s.error}>{error}</span> : null}
		</div>
	)
}
