"use client"

import s from "./styles.module.scss"
import Button from "@/components/ui/Button/Button"
import { useRouter } from "next/navigation"

interface TagsProps {
	label: string
	inCard?: boolean
	onClick?: () => void
	selected?: boolean
	disabled?: boolean
}

export default function Tags({ label, inCard, onClick, selected, disabled }: TagsProps) {
	const router = useRouter()
	const text = inCard && label.length > 15 ? label.slice(0, 15).trimEnd() + "..." : label

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

	if (!inCard) {
		return <Button className={s.tagContainer} label={text} onClick={() => router.push("./")} />
	}

	return <span className={s.tagContainer}>{text}</span>
}