"use client"

import { ReactNode } from "react"
import { EditIcon } from "@/assets/icons/LinksIcons"
import { ImageField, useProfileEdit } from "./ProfileEditContext"
import s from "./editable.module.scss"

interface EditableFieldProps {
	field: ImageField
	label: string
	// corner: lápis no canto (foto) | floating: botão solto no topo da página (banner)
	placement?: "corner" | "floating"
	children?: ReactNode
}

// Mostra o lápis de foto/banner quando o modo "Editar Perfil" está ligado; o clique abre o popup de imagem
export default function EditableField({
	field,
	label,
	placement = "corner",
	children,
}: EditableFieldProps) {
	const { canEdit, isEditing, openImagePicker } = useProfileEdit()
	const active = canEdit && isEditing

	const button = active ? (
		<button
			type="button"
			className={`${s.editBtn} ${placement === "floating" ? s.floating : ""}`}
			aria-label={`Editar ${label}`}
			title={`Editar ${label}`}
			onClick={() => openImagePicker(field)}>
			<EditIcon />
		</button>
	) : null

	if (placement === "floating") return button

	return (
		<div className={`${s.editable} ${s.corner}`} data-editing={active}>
			{children}
			{button}
		</div>
	)
}
