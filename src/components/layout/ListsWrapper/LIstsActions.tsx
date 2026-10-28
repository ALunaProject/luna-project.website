"use client"

import { useProfileEdit } from "@/components/ui/EditinModal/ProfileEditContext"
import Button from "@/components/ui/Button/Button";

export default function ListsActions() {
	const { canEdit, isEditing } = useProfileEdit()

	if (!canEdit || !isEditing) return null

	return (
		<Button
			onClick={() => {
				/* criar lista */
			}}
			label="Nova lista"
			icon="AddIcon"
		/>
	)
}