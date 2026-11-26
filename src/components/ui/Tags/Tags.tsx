"use client"

import Link from "next/link"
import s from "./styles.module.scss"

interface TagsProps {
	label: string
	inCard?: boolean
	href?: string
	onClick?: () => void
	selected?: boolean
	disabled?: boolean
}

export default function Tags({
	label,
	inCard,
	href,
	onClick,
	selected,
	disabled,
}: TagsProps) {
	const text =
		inCard && label.length > 15
			? label.slice(0, 15).trimEnd() + "..."
			: label

	if (onClick) {
		return (
			<button
				type="button"
				className={`${s.tagContainer} ${s.interactive} ${selected ? s.selected : ""}`}
				onClick={onClick}
				disabled={disabled}
				aria-pressed={Boolean(selected)}>
				{text}
			</button>
		)
	}

	if (href) {
		return (
			<Link href={href} className={`${s.tagContainer} ${s.link}`}>
				{text}
			</Link>
		)
	}

	return <span className={s.tagContainer}>{text}</span>
}
