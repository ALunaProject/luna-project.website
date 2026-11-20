"use client"

import { useId, useMemo, useState } from "react"
import s from "./styles.module.scss"
import { AddIcon } from "@/assets/icons/LinksIcons"
import {
	EXCLUDES_TAGS,
	POPULAR_TAG_IDS,
	STEAM_TAG_NAMES,
} from "@/utils/contants"
import Tags from "@/components/ui/Tags/Tags";

interface TagSelectorProps {
	value: number[]
	onChange: (ids: number[]) => void
	max?: number
	disabled?: boolean
}

type TagOption = { id: number; name: string; key: string }

// "aven" encontra "Aventura", "coop" encontra "Co-op", "umjog" encontra "Um Jogador"
const normalize = (text: string) =>
	text
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]/g, "")

// montado uma vez, quando o módulo é importado (não a cada render)
const ALL_TAGS: TagOption[] = (() => {
	const seen = new Set<string>()
	return Object.entries(STEAM_TAG_NAMES).flatMap(([rawId, name]) => {
		const id = Number(rawId)
		// tira tags excluídas do app e nomes repetidos (ex.: "Jogo de Tabuleiro" tem 2 ids)
		if (EXCLUDES_TAGS.includes(id) || seen.has(name)) return []
		seen.add(name)
		return [{ id, name, key: normalize(name) }]
	})
})()

const TAGS_BY_ID = new Map(ALL_TAGS.map(tag => [tag.id, tag]))

const POPULAR_TAGS = POPULAR_TAG_IDS.map(id => TAGS_BY_ID.get(id)).filter(
	(tag): tag is TagOption => Boolean(tag),
)

export default function SearchTagSelector({
										value,
										onChange,
										max = 5,
										disabled = false,
									}: TagSelectorProps) {
	const inputId = useId()
	const [query, setQuery] = useState("")
	const q = normalize(query)
	const limitReached = value.length >= max

	const selected = value.map(id => ({
		id,
		name: STEAM_TAG_NAMES[id] ?? `#${id}`,
	}))

	const matches = useMemo(() => {
		if (!q) return []
		return ALL_TAGS.filter(tag => !value.includes(tag.id) && tag.key.includes(q))
			.sort(
				(a, b) =>
					// quem começa com o texto vem primeiro, depois ordem alfabética
					Number(!a.key.startsWith(q)) - Number(!b.key.startsWith(q)) ||
					a.name.localeCompare(b.name, "pt-BR"),
			)
			.slice(0, 16)
	}, [q, value])

	const visible = q ? matches : POPULAR_TAGS.filter(tag => !value.includes(tag.id))

	function toggle(id: number) {
		if (disabled) return
		if (value.includes(id)) onChange(value.filter(tagId => tagId !== id))
		else if (!limitReached) onChange([...value, id])
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key !== "Enter") return
		e.preventDefault() // não envia o formulário de busca
		if (matches[0]) {
			toggle(matches[0].id)
			setQuery("")
		}
	}

	return (
		<div className={s.wrapper}>
			<label className={s.search} htmlFor={inputId}>
				<AddIcon />
				<input
					id={inputId}
					type="text"
					value={query}
					onChange={e => setQuery(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder={limitReached ? `Máximo de ${max} tags` : "Buscar tag"}
					disabled={disabled || limitReached}
					autoComplete="off"
				/>
			</label>

			{selected.length > 0 && (
				<ul className={s.chips} aria-label="Tags selecionadas">
					{selected.map(tag => (
						<li key={tag.id} className={s.item}>
							<Tags
								label={tag.name}
								selected
								onClick={() => toggle(tag.id)}
								disabled={disabled}
							/>
						</li>
					))}
				</ul>
			)}

			<p className={s.label}>
				<span>{q ? "Resultados" : "Mais pesquisados"}</span>
				<span>
                {value.length}/{max}
             </span>
			</p>

			<ul className={s.chips} aria-live="polite">
				{visible.map((tag, i) => (
					<li
						key={tag.id}
						className={s.item}
						style={{ "--i": i } as React.CSSProperties}>
						<Tags
							label={tag.name}
							onClick={() => toggle(tag.id)}
							disabled={disabled || limitReached}
						/>
					</li>
				))}
			</ul>

			{q && matches.length === 0 && <p className={s.empty}>Nenhuma tag encontrada</p>}
		</div>
	)
}