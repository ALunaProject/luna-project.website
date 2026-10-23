"use client"

import { DragEvent, useEffect, useRef, useState } from "react"
import Cropper, { Area } from "react-easy-crop"
import Button from "@/components/ui/Button/Button"
import { AVATAR_CROP, BANNER_CROP, cropImageToFile } from "@/utils/cropImage"
import ModalShell from "./ModalShell"
import s from "./modals.module.scss"

// O arquivo ORIGINAL pode ser maior: ele é recortado, reduzido e comprimido (até 2MB, regra do back) antes de virar preview
const MAX_SOURCE_MB = 10
const ACCEPTED_TYPES = ["image/jpeg", "image/png"]

interface ImageDropModalProps {
	title: string
	shape: "round" | "wide"
	onClose: () => void
	onConfirm: (file: File) => void
}

// Popup em 2 passos: 1) arrastar/escolher a imagem  2) escolher a área (arrastar + zoom).
// Ele só ESCOLHE e recorta (vira preview na página); quem envia pro back é o "Concluir edição".
export default function ImageDropModal({
	title,
	shape,
	onClose,
	onConfirm,
}: ImageDropModalProps) {
	const preset = shape === "round" ? AVATAR_CROP : BANNER_CROP

	const inputRef = useRef<HTMLInputElement>(null)
	const [sourceFile, setSourceFile] = useState<File | null>(null)
	const [sourceUrl, setSourceUrl] = useState<string | null>(null)
	const [crop, setCrop] = useState({ x: 0, y: 0 })
	const [zoom, setZoom] = useState(1)
	const [areaPixels, setAreaPixels] = useState<Area | null>(null)
	const [isDragging, setIsDragging] = useState(false)
	const [isProcessing, setIsProcessing] = useState(false)
	const [localError, setLocalError] = useState<string | null>(null)

	// URL local da imagem original (usada pelo recorte); libera ao trocar de arquivo ou fechar
	useEffect(() => {
		if (!sourceFile) {
			setSourceUrl(null)
			return
		}
		const url = URL.createObjectURL(sourceFile)
		setSourceUrl(url)
		return () => URL.revokeObjectURL(url)
	}, [sourceFile])

	function pickFile(picked?: File) {
		if (!picked) return
		if (!ACCEPTED_TYPES.includes(picked.type)) {
			setLocalError("Formato inválido. Apenas JPG e PNG são aceitos.")
			return
		}
		if (picked.size > MAX_SOURCE_MB * 1024 * 1024) {
			setLocalError(`Arquivo muito grande. O limite é ${MAX_SOURCE_MB}MB.`)
			return
		}
		setLocalError(null)
		setCrop({ x: 0, y: 0 })
		setZoom(1)
		setAreaPixels(null)
		setSourceFile(picked)
	}

	function handleDrop(e: DragEvent<HTMLDivElement>) {
		e.preventDefault()
		setIsDragging(false)
		pickFile(e.dataTransfer.files?.[0])
	}

	async function handleConfirm() {
		if (!sourceFile || !sourceUrl || !areaPixels) return
		setIsProcessing(true)
		setLocalError(null)
		try {
			const cropped = await cropImageToFile(sourceUrl, areaPixels, preset, sourceFile.type)
			onConfirm(cropped) // o popup fecha daqui
		} catch (err) {
			setLocalError(
				err instanceof Error && err.message === "image-too-large"
					? "Mesmo recortada, a imagem passa de 2MB. Tente outra."
					: "Não consegui recortar a imagem. Tente outra.",
			)
			setIsProcessing(false)
		}
	}

	return (
		<ModalShell title={title} onClose={onClose} wide={shape === "wide"}>
			{sourceUrl ? (
				<>
					<div className={s.cropArea}>
						<Cropper
							image={sourceUrl}
							crop={crop}
							zoom={zoom}
							aspect={preset.aspect}
							cropShape={shape === "round" ? "round" : "rect"}
							showGrid={shape !== "round"}
							minZoom={1}
							maxZoom={4}
							onCropChange={setCrop}
							onZoomChange={setZoom}
							onCropAreaChange={(_, pixels) => setAreaPixels(pixels)}
							style={{ cropAreaStyle: { border: "2px solid #9d4edd" } }}
						/>
					</div>

					<label className={s.zoomRow}>
						<span>Zoom</span>
						<input
							type="range"
							min={1}
							max={4}
							step={0.01}
							value={zoom}
							onChange={e => setZoom(Number(e.target.value))}
						/>
					</label>

					<span className={s.fileName}>
						Arraste a imagem para posicionar e use o zoom para escolher a área.{" "}
						<button
							type="button"
							className={s.pickBtn}
							onClick={() => inputRef.current?.click()}>
							Trocar imagem
						</button>
					</span>
				</>
			) : (
				<div
					className={s.dropzone}
					data-dragging={isDragging}
					onDragOver={e => {
						e.preventDefault()
						setIsDragging(true)
					}}
					onDragLeave={() => setIsDragging(false)}
					onDrop={handleDrop}>
					<p>
						Coloque sua imagem aqui ou{" "}
						<button
							type="button"
							className={s.pickBtn}
							onClick={() => inputRef.current?.click()}>
							selecione dos arquivos
						</button>
					</p>
				</div>
			)}

			<input
				ref={inputRef}
				type="file"
				accept="image/png,image/jpeg"
				hidden
				onChange={e => {
					pickFile(e.target.files?.[0])
					e.target.value = "" // permite escolher o mesmo arquivo de novo
				}}
			/>

			{localError ? <span className={s.error}>{localError}</span> : null}

			<span className={s.fileName}>
				A imagem só é salva quando você clicar em &quot;Concluir edição&quot;.
			</span>

			<div className={s.actions}>
				<Button
					type="button"
					label={isProcessing ? "Recortando..." : "Usar imagem"}
					disabled={!areaPixels || isProcessing}
					onClick={handleConfirm}
				/>
				<Button type="button" label="Cancelar" variant="danger" onClick={onClose} />
			</div>
		</ModalShell>
	)
}
