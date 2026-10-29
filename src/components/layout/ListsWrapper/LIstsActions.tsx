"use client"

import { useState } from "react"
import { useProfileEdit } from "@/components/ui/EditinModal/ProfileEditContext"
import Button from "@/components/ui/Button/Button"
import ListModal from "@/components/layout/ListsWrapper/Modals/ListModal";
import s from "./styles.module.scss"

export default function ListsActions() {
	const { canEdit, isEditing } = useProfileEdit()
	const [modalOpen, setModalOpen] = useState(false)

	if (!canEdit || !isEditing) return null

	return (
		<>
			<Button
				className={s.addListBtn}
				onClick={() => setModalOpen(true)}
				label="Nova lista"
				icon="AddIcon"
			/>
			<ListModal
				mode="create"
				open={modalOpen}
				onClose={() => setModalOpen(false)}
			/>
		</>
	)
}