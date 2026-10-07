"use client"

import { FormEvent, useState } from "react"
import Button from "@/components/ui/Button/Button"
import ModalShell from "./ModalShell"
import s from "./modals.module.scss"

interface TextEditModalProps {
	title: string
	label: string
	initialValue: string
	multiline?: boolean
	maxLength?: number
	isSaving: boolean
	error: string | null
	onClose: () => void
	onSave: (value: string) => void
}

export default function TextEditModal({
	title,
	label,
	initialValue,
	multiline = false,
	maxLength,
	isSaving,
	error,
	onClose,
	onSave,
}: TextEditModalProps) {
	const [value, setValue] = useState(initialValue)

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		onSave(value)
	}

	return (
		<ModalShell title={title} onClose={isSaving ? () => {} : onClose}>
			<form
				onSubmit={handleSubmit}
				style={{ display: "flex", flexDirection: "column", gap: 16 }}>
				<div className={s.field}>
					<label htmlFor="edit-field">{label}</label>
					{multiline ? (
						<textarea
							id="edit-field"
							rows={4}
							value={value}
							maxLength={maxLength}
							placeholder="sem descrição, ainda"
							onChange={e => setValue(e.target.value)}
							autoFocus
						/>
					) : (
						<input
							id="edit-field"
							type="text"
							value={value}
							maxLength={maxLength}
							onChange={e => setValue(e.target.value)}
							autoFocus
						/>
					)}
					{maxLength ? (
						<span className={s.counter}>
							{value.length} / {maxLength}
						</span>
					) : null}
				</div>

				{error ? <span className={s.error}>{error}</span> : null}

				<div className={s.actions}>
					<Button
						type="submit"
						label={isSaving ? "Salvando..." : "Salvar"}
						disabled={isSaving}
					/>
					<Button
						type="button"
						label="Cancelar"
						disabled={isSaving}
						onClick={onClose}
					/>
				</div>
			</form>
		</ModalShell>
	)
}
