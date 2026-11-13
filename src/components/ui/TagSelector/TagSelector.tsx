"use client"

import { useEffect, useId, useMemo, useState } from "react"
import s from "./styles.module.scss"
import Tags from "@/components/ui/Tags/Tags"
import { getTags } from "@/services/tagsService"
import { Tag } from "@/types/tagsDTO"
import { EXCLUDES_TAGS } from "@/utils/contants"

interface TagSelectorProps {
	value: number[]
	onChange: (ids: number[]) => void
	max?: number
	disabled?: boolean
}

// "acao" encontra "Ação", "cooperativo" encontra "Cooperativo"
const normalize = (text: string) =>
	text
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()

export default function TagSelector({
	value,
	onChange,
	max = 5,
	disabled = false,
}: TagSelectorProps) {
	const inputId = useId()
	const [tags, setTags] = useState<Tag[]>([])
	const [query, setQuery] = useState("")

	useEffect(() => {
		let active = true
		getTags().then(list => {
			if (!active) return
			// tira as tags excluídas do app e nomes repetidos (ex.: "Jogo de Tabuleiro" tem 2 ids)
			const seen = new Set<string>()
			setTags(
				list.filter(tag => {
					if (EXCLUDES_TAGS.includes(tag.id) || seen.has(tag.name)) return false
					seen.add(tag.name)
					return true
				}),
			)
		})
		return () => {
			active = false
		}
	}, [])

	const byId = useMemo(() => new Map(tags.map(tag => [tag.id, tag])), [tags])
	const limitReached = value.length >= max

	const suggestions = useMemo(() => {
		const q = normalize(query.trim())
		if (!q) return []
		return tags
			.filter(tag => !value.includes(tag.id) && normalize(tag.name).includes(q))
			.slice(0, 8)
	}, [tags, value, query])

	function addTag(id: number) {
		if (limitReached || value.includes(id)) return
		onChange([...value, id])
		setQuery("")
	}

	function removeTag(id: number) {
		onChange(value.filter(tagId => tagId !== id))
	}

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<label htmlFor={inputId}>Tags (opcional)</label>
				<span>
					{value.length}/{max}
				</span>
			</div>

			{value.length > 0 && (
				<ul className={s.chips}>
					{value.map(id => {
						const name = byId.get(id)?.name ?? `#${id}`
						return (
							<li key={id}>
								<button
									type="button"
									className={s.chip}
									onClick={() => removeTag(id)}
									disabled={disabled}
									aria-label={`Remover tag ${name}`}>
									<Tags label={name} />
									<span className={s.remove} aria-hidden="true">
										×
									</span>
								</button>
							</li>
						)
					})}
				</ul>
			)}

			<input
				id={inputId}
				type="text"
				value={query}
				onChange={e => setQuery(e.target.value)}
				placeholder={
					limitReached ? `Máximo de ${max} tags` : "Buscar tag (ex.: Cooperativo)"
				}
				disabled={disabled || limitReached}
				autoComplete="off"
			/>

			{suggestions.length > 0 && (
				<ul className={s.suggestions}>
					{suggestions.map(tag => (
						<li key={tag.id}>
							<button
								type="button"
								className={s.suggestion}
								onClick={() => addTag(tag.id)}>
								{tag.name}
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
