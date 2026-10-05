import s from "./styles.module.scss"

interface TagsProps {
	label: string
	inCard?: boolean
}

export default function Tags({ label, inCard }: TagsProps) {
	return (
		<span className={s.tagContainer}>
			{inCard
				? label.length > 15
					? label.slice(0, 15).trimEnd() + "..."
					: label
				: label}
		</span>
	)
}
