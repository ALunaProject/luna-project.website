"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import s from "@/components/layout/RatingSection/styles.module.scss"
import Button from "@/components/ui/Button/Button";

interface RatingModalProps {
	gameName?: string
	initialScore: number | null
	onClose: () => void
	onSave: (score: number) => Promise<void>
	onRemove?: () => Promise<void>
}

function parseScore(raw: string): number | null {
	const text = raw.trim().replace(",", ".")
	if (text === "") return null

	const n = Number(text)
	if (!Number.isFinite(n) || n < 0 || n > 10) return null

	return Math.round(n * 10) / 10
}

export default function RatingModal({
										gameName,
										initialScore,
										onClose,
										onSave,
										onRemove,
									}: RatingModalProps) {
	const dialogRef = useRef<HTMLDialogElement>(null)
	const [value, setValue] = useState(
		initialScore !== null ? String(initialScore).replace(".", ",") : "",
	)
	const [status, setStatus] = useState<"idle" | "loading" | "error">("idle")

	const parsed = parseScore(value)
	const isInvalid = value.trim() !== "" && parsed === null

	useEffect(() => {
		dialogRef.current?.showModal()
	}, [])

	async function run(action: () => Promise<void>) {
		setStatus("loading")
		try {
			await action()
			dialogRef.current?.close()
		} catch {
			setStatus("error")
		}
	}

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		if (parsed === null) return
		run(() => onSave(parsed))
	}

	return (
		<dialog
			ref={dialogRef}
			className={s.dialog}
			aria-labelledby="rating-modal-title"
			onClose={onClose}
			onClick={e => {
				if (e.target === e.currentTarget) dialogRef.current?.close()
			}}>
			<form className={s.content} onSubmit={handleSubmit} noValidate>
				<h2 id="rating-modal-title" className={s.title}>
					{gameName ? `Sua nota para ${gameName}` : "Sua nota"}
				</h2>

				<div className={s.field}>
					<label htmlFor="rating-score" className={s.fieldLabel}>
						Nota de 0 a 10
					</label>
					<input
						id="rating-score"
						className={s.scoreInput}
						type="text"
						inputMode="decimal"
						autoComplete="off"
						placeholder="Ex: 8,5"
						value={value}
						aria-invalid={isInvalid}
						onChange={e => setValue(e.target.value)}
					/>
				</div>

				{isInvalid && (
					<p role="alert" className={s.error}>
						Digite uma nota entre 0 e 10 (ex: 8,5).
					</p>
				)}

				{status === "error" && (
					<p role="alert" className={s.error}>
						Não foi possível salvar a nota. Verifique sua conexão e
						tente novamente.
					</p>
				)}

				<div className={s.actions}>
					{onRemove && (
						<Button
							type="button"
							disabled={status === "loading"}
							variant="danger"
							onClick={() => run(onRemove)}
							label="Remover nota"
						/>

					)}
					<Button
						type="button"
						variant="danger"
						onClick={() => dialogRef.current?.close()}
						label="Cancelar"
					/>

					<Button
						type="submit"
						disabled={parsed === null || status === "loading"}
						label={status === "loading" ? "Salvando..." : "Salvar nota"}
					/>
				</div>
			</form>
		</dialog>
	)
}