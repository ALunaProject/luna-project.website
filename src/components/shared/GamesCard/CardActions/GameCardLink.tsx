"use client"

import { MouseEvent, ReactNode, useEffect, useRef, useState } from "react"
import Link from "next/link"
import s from "../styles.module.scss"

interface GameCardLinkProps {
	href: string
	children: ReactNode
}

// quem estiver no celular precisa ver as Actions, ent a gente "remove" o primeiro clique de navegação
export default function GameCardLink({ href, children }: GameCardLinkProps) {
	const ref = useRef<HTMLAnchorElement>(null)
	const [active, setActive] = useState(false)

	useEffect(() => {
		if (!active) return

		function handleOutside(e: PointerEvent) {
			const target = e.target as Element
			if (target.closest("dialog")) return
			if (!ref.current?.contains(target)) setActive(false)
		}

		document.addEventListener("pointerdown", handleOutside)
		return () => document.removeEventListener("pointerdown", handleOutside)
	}, [active])

	function handleClick(e: MouseEvent<HTMLAnchorElement>) {
		const noHover = window.matchMedia("(hover: none)").matches

		const hasActions = !!ref.current?.querySelector("button")

		if (noHover && hasActions && !active) {
			e.preventDefault() // 1º toque: só revela as ações
			setActive(true)
		}
		// 2º toque (active = true): segue o fluxo normal e navega
	}

	return (
		<Link
			ref={ref}
			href={href}
			className={`${s.gamesCard} ${active ? s.active : ""}`}
			onClick={handleClick}>
			{children}
		</Link>
	)
}