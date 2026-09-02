import s from "./styles.module.scss"

interface TagsProps {
	label: string
}

export default function Tags({ label }: TagsProps) {
	return <span className={s.tagContainer}>{label}</span>
}
