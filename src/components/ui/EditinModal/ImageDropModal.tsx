"use client"

import { DragEvent, useEffect, useRef, useState } from "react"
import Button from "@/components/ui/Button/Button"
import ModalShell from "./ModalShell"
import s from "./modals.module.scss"

const MAX_IMAGE_MB = 5

interface ImageDropModalProps {
	title: string
	shape: "round" | "wide"
	isSaving: boolean
	error: string | null
	onClose: () => void
	onConfirm: (file: File) => void
}

// Popup básico (teste): arrastar a imagem ou escolher do computador
export default function ImageDropModal({
	title,
	shape,
	isSaving,
	error,
	onClose,
	onConfirm,
}: ImageDropModalProps) {
	const inputRef = useRef<HTMLInputElement>(null)
	const [file, setFile] = useState<File | null>(null)
	const [preview, setPreview] = useState<string | null>(null)
	const [isDragging, setIsDragging] = useState(false)
	const [localError, setLocalError] = useState<string | null>(null)

	useEffect(() => {
		if (!file) {
			setPreview(null)
			return
		}
		const url = URL.createObjectURL(file)
		setPreview(url)
		return () => URL.revokeObjectURL(url)
	}, [file])

	function pickFile(picked?: File) {
		if (!picked) return
		if (!picked.type.startsWith("image/")) {
			setLocalError("Esse arquivo não é uma imagem.")
			return
		}
		if (picked.size > MAX_IMAGE_MB * 1024 * 1024) {
			setLocalError(`A imagem passa de ${MAX_IMAGE_MB}MB.`)
			return
		}
		setLocalError(null)
		setFile(picked)
	}

	function handleDrop(e: DragEvent<HTMLDivElement>) {
		e.preventDefault()
		setIsDragging(false)
		pickFile(e.dataTransfer.files?.[0])
	}

	return (
		<ModalShell title={title} onClose={isSaving ? () => {} : onClose}>
			<div
				className={s.dropzone}
				data-dragging={isDragging}
				onDragOver={e => {
					e.preventDefault()
					setIsDragging(true)
				}}
				onDragLeave={() => setIsDragging(false)}
				onDrop={handleDrop}>
				{preview ? (
					<img
						src={preview}
						alt="Pré-visualização"
						className={`${s.preview} ${shape === "round" ? s.round : s.wide}`}
					/>
				) : null}

				<p>
					Coloque sua imagem aqui ou{" "}
					<button
						type="button"
						className={s.pickBtn}
						onClick={() => inputRef.current?.click()}>
						selecione dos arquivos
					</button>
				</p>

				{file ? <span className={s.fileName}>{file.name}</span> : null}

				<input
					ref={inputRef}
					type="file"
					accept="image/*"
					hidden
					onChange={e => {
						pickFile(e.target.files?.[0])
						e.target.value = "" // permite escolher o mesmo arquivo de novo
					}}
				/>
			</div>

			{localError || error ? (
				<span className={s.error}>{localError ?? error}</span>
			) : null}

			<div className={s.actions}>
				<Button
					type="button"
					label={isSaving ? "Enviando..." : "Salvar"}
					disabled={!file || isSaving}
					onClick={() => file && onConfirm(file)}
				/>
				<Button
					type="button"
					label="Cancelar"
					disabled={isSaving}
					onClick={onClose}
				/>
			</div>
		</ModalShell>
	)
}
