"use client"

import { useProfileEdit } from "@/components/ui/EditinModal/ProfileEditContext"
import s from "./styles.module.scss"
import Button from "@/components/ui/Button/Button";

interface ListEditButtonProps {
	listId: string
	listName: string
	onEdit?: (listId: string) => void
}

export default function ListEditButton({listId, listName}: ListEditButtonProps) {
	const {canEdit, isEditing} = useProfileEdit()

	if (!canEdit || !isEditing) return null

	return (
		<Button
			type="button"
			className={s.editListBtn}
			aria-label={`Editar lista ${listName}`}
			title={`Editar lista ${listName}`}
			icon="EditIcon"
			onClick={() => {
				// abrir modal de edição, navegar para /lists/[id]/edit, etc.
			}}
		/>
	)
}