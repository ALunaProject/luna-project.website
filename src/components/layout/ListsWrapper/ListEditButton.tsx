"use client"

import { useState } from "react"
import { useProfileEdit } from "@/components/ui/EditinModal/ProfileEditContext"
import s from "./styles.module.scss"
import Button from "@/components/ui/Button/Button"
import ListModal from "@/components/layout/ListsWrapper/Modals/ListModal";

interface ListEditButtonProps {
	listId: string
	listName: string
}

export default function ListEditButton({ listId, listName }: ListEditButtonProps) {
	const { canEdit, isEditing } = useProfileEdit()
	const [modalOpen, setModalOpen] = useState(false) // antes do return condicional

	if (!canEdit || !isEditing) return null

	return (
		<>
			<Button
				type="button"
				className={s.editListBtn}
				aria-label={`Editar lista ${listName}`}
				title={`Editar lista ${listName}`}
				icon="EditIcon"
				onClick={() => setModalOpen(true)}
			/>
			<ListModal
				mode="edit"
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				listId={listId}
				listName={listName}
			/>
		</>
	)
}