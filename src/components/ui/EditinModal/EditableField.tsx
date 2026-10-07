"use client"

import { ReactNode } from "react"
import { EditIcon } from "@/assets/icons/LinksIcons"
import { EditableFieldName, useProfileEdit } from "./ProfileEditContext"
import s from "./editable.module.scss"

interface EditableFieldProps {
	field: EditableFieldName
	label: string
	placement?: "inline" | "corner" | "floating"
	children?: ReactNode
}
export default function EditableField({
	field,
	label,
	placement = "inline",
	children,
}: EditableFieldProps) {
	const { canEdit, isEditing, openField } = useProfileEdit()
	const active = canEdit && isEditing

	const button = active ? (
		<button
			type="button"
			className={`${s.editBtn} ${placement === "floating" ? s.floating : ""}`}
			aria-label={`Editar ${label}`}
			title={`Editar ${label}`}
			onClick={() => openField(field)}>
			<EditIcon />
		</button>
	) : null

	if (placement === "floating") return button

	return (
		<div
			className={`${s.editable} ${placement === "corner" ? s.corner : ""}`}
			data-editing={active}>
			{children}
			{button}
		</div>
	)
}
