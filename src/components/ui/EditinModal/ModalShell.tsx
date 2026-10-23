"use client"

import { ReactNode, useEffect } from "react"
import { createPortal } from "react-dom"
import s from "./modals.module.scss"

interface ModalShellProps {
	title: string
	onClose: () => void
	// card mais largo (ex: recorte do banner)
	wide?: boolean
	children: ReactNode
}

// Fundo borrado + card roxo. Fecha com ESC ou clicando fora.
export default function ModalShell({ title, onClose, wide, children }: ModalShellProps) {
	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") onClose()
		}
		window.addEventListener("keydown", onKey)
		return () => window.removeEventListener("keydown", onKey)
	}, [onClose])

	return createPortal(
		<div
			className={s.overlay}
			onMouseDown={e => {
				if (e.target === e.currentTarget) onClose()
			}}>
			<div
				className={`${s.card} ${wide ? s.cardWide : ""}`}
				role="dialog"
				aria-modal="true"
				aria-label={title}>
				<h3 className={s.title}>{title}</h3>
				{children}
			</div>
		</div>,
		document.body,
	)
}
