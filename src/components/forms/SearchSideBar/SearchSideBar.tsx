"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import s from "./styles.module.scss"
import { parseTagIds } from "@/utils/searchTags"
import { FilterIcon, SearchIcon } from "@/assets/icons/LinksIcons"
import Button from "@/components/ui/Button/Button";
import SearchTagSelector from "@/components/ui/TagSelector/SearchTagSelector";

export default function SearchSideBar() {
	const router = useRouter()
	const params = useSearchParams()
	const drawerId = useId()

	const [open, setOpen] = useState(false)
	const [term, setTerm] = useState(params.get("q") ?? "")
	const [tagIds, setTagIds] = useState<number[]>(parseTagIds(params.get("tags")))

	const triggerRef = useRef<HTMLButtonElement>(null)
	const searchRef = useRef<HTMLInputElement>(null)

	const canSubmit = term.trim().length > 0 || tagIds.length > 0

	const close = useCallback(() => {
		setOpen(false)
		triggerRef.current?.focus()
	}, [])

	function openDrawer() {
		setTerm(params.get("q") ?? "")
		setTagIds(parseTagIds(params.get("tags")))
		setOpen(true)
	}

	useEffect(() => {
		if (open) searchRef.current?.focus({preventScroll: true})
	}, [open])

	useEffect(() => {
		if (!open) return
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") close()
		}
		document.addEventListener("keydown", onKeyDown)
		return () => document.removeEventListener("keydown", onKeyDown)
	}, [open, close])

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!canSubmit) return

		const next = new URLSearchParams()
		if (term.trim()) next.set("q", term.trim())
		if (tagIds.length) next.set("tags", tagIds.join(","))
		router.push(`/games/search?${next}`)
		close()
	}

	return (
		<>
			<Button
				type="button"
				className={s.trigger}
				onClick={openDrawer}
				aria-label="Abrir filtros"
				aria-expanded={open}
				aria-controls={drawerId}
				icon="LogoutIcon"/>

			<div className={s.backdrop} data-open={open} onClick={close} aria-hidden="true"/>

			<aside
				id={drawerId}
				className={s.container}
				data-open={open}
				role="dialog"
				aria-label="Filtros">
				<form onSubmit={handleSubmit} role="search" className={s.searchForm}>
					<div className={s.sidebarHeader}>
						<label className={s.searchBar}>
							<SearchIcon />
							<input
								ref={searchRef}
								value={term}
								onChange={e => setTerm(e.target.value)}
								placeholder="Buscar jogo..."
								aria-label="Buscar jogos"
							/>
						</label>
						<Button
							type="button"
							aria-label="Fechar filtros"
							icon="LogoutIcon"
							onClick={close}
							style={{width: "fit-content", backgroundColor: "transparent", rotate: "180deg"}}
						/>
					</div>

					<div className={s.titleWrapper}>
						<h2>Filtros</h2>
						<FilterIcon/>
					</div>

					<p className={s.filterStatus}>
						{tagIds.length
							? `${tagIds.length} filtro(s) aplicado(s)`
							: "Nenhum filtro aplicado"}
						{tagIds.length > 0 && (
							<Button type="button" className={s.clear} onClick={() => setTagIds([])} label="Limpar"/>
						)}
					</p>

					<details className={s.categoriesSection} open>
						<summary>Categorías</summary>
						<SearchTagSelector value={tagIds} onChange={setTagIds} max={5}/>
					</details>

					<Button label="Aplicar filtros" type="submit" disabled={!canSubmit}/>
				</form>
			</aside>
		</>
	)
}