"use client"

import s from "./styles.module.scss"
import Button from "@/components/ui/Button/Button"
import { useRouter } from "next/navigation"
import { Tag } from "@/types/tagsDTO";

interface TagsProps {
	label: string
	inCard?: boolean
	onClick?: () => void
	selected?: boolean
	disabled?: boolean
	Tag?: {
		id: string
		description: string
	}
}

export default function Tags({ label, inCard, onClick, selected, disabled, Tag }: TagsProps) {
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

	if (!inCard && Tag) {
		return <Button className={s.tagContainer} label={text} onClick={() => router.push(`./games/search?tags=${Tag.id}`)} />
	}

	return <span className={s.tagContainer}>{text}</span>
}