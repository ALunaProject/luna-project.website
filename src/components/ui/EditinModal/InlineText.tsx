"use client"

import { KeyboardEvent, useRef } from "react"
import { EditIcon } from "@/assets/icons/LinksIcons"
import { TextField, useProfileEdit } from "./ProfileEditContext"
import s from "./editable.module.scss"

interface InlineTextProps {
	field: TextField
	as: "h5" | "p"
	value: string
	prefix?: string
	multiline?: boolean
	maxLength?: number
	placeholder?: string
}

// Texto do perfil: no modo normal é só o texto; no modo de edição vira um campo editável no mesmo lugar (sem popup)
export default function InlineText({
	field,
	as: Tag,
	value,
	prefix,
	multiline = false,
	maxLength,
	placeholder,
}: InlineTextProps) {
	const { canEdit, isEditing, isSaving, draft, setText, usernameError, finishEditing } =
		useProfileEdit()
	const inputRef = useRef<HTMLInputElement>(null)
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	if (!(canEdit && isEditing)) {
		return (
			<Tag>
				{prefix}
				{value}
			</Tag>
		)
	}

	const label = field === "username" ? "username" : "descrição"
	const error = field === "username" ? usernameError : null

	function focusField() {
		;(multiline ? textareaRef.current : inputRef.current)?.focus()
	}

	return (
		<div className={s.inlineWrap}>
			<Tag className={s.inlineTag}>
				{prefix}
				{multiline ? (
					<textarea
						ref={textareaRef}
						className={s.inlineInput}
						aria-label={label}
						rows={3}
						value={draft[field]}
						maxLength={maxLength}
						placeholder={placeholder}
						disabled={isSaving}
						onChange={e => setText(field, e.target.value)}
					/>
				) : (
					<input
						ref={inputRef}
						className={s.inlineInput}
						aria-label={label}
						type="text"
						value={draft[field]}
						maxLength={maxLength}
						placeholder={placeholder}
						disabled={isSaving}
						onChange={e => setText(field, e.target.value)}
						onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
							if (e.key === "Enter") finishEditing()
						}}
					/>
				)}
			</Tag>
			<button
				type="button"
				className={s.editBtn}
				aria-label={`Editar ${label}`}
				title={`Editar ${label}`}
				onClick={focusField}>
				<EditIcon />
			</button>
			{error ? <span className={s.fieldError}>{error}</span> : null}
		</div>
	)
}
