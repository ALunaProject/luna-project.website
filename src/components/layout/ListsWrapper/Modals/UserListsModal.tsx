"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { createPortal } from "react-dom"
import s from "../styles.module.scss"
import { ListsDTO } from "@/types/UserLIstsDTO";
import { useDialog } from "@/hooks/useDialog";
import Button from "@/components/ui/Button/Button";
import ListModal from "@/components/layout/ListsWrapper/Modals/ListModal";

interface UserListsModalProps {
	open: boolean
	onClose: () => void
	lists: ListsDTO[]
	onListsChange?: () => void
	canCreate?: boolean
	// When provided, each list gets an "Adicionar" button
	onAddToList?: (list: ListsDTO) => void | Promise<void>
	// Optional: marks lists that already contain the game (button disabled)
	isGameInList?: (list: ListsDTO) => boolean
}

export default function UserListsModal({
										   open,
										   onClose,
										   lists,
										   onListsChange,
										   canCreate = true,
										   onAddToList,
										   isGameInList,
									   }: UserListsModalProps) {
	const router = useRouter()
	const dialogRef = useDialog(open)
	const wasOpen = useRef(false)
	const [createOpen, setCreateOpen] = useState(false)
	const [addingId, setAddingId] = useState<string | null>(null)

	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])

	useEffect(() => {
		if (wasOpen.current && !open) router.refresh()
		wasOpen.current = open
	}, [open, router])

	if (!mounted) return null

	async function handleAdd(list: ListsDTO) {
		if (!onAddToList) return
		setAddingId(list.id)
		try {
			await onAddToList(list)
		} finally {
			setAddingId(null)
		}
	}

	return createPortal(
		<dialog
			ref={dialogRef}
			className={s.dialog}
			onClose={onClose}
			onClick={(e) => {
				e.stopPropagation()
				if (e.target === e.currentTarget) onClose()
			}}
		>
			<div className={s.userListsContent}>
				<h2>{onAddToList ? "Adicionar à lista" : "Listas"}</h2>

				{lists.length > 0 ? (
					<ul className={s.userLists}>
						{lists.map(list => {
							const alreadyIn = isGameInList?.(list) ?? false
							const adding = addingId === list.id

							return (
								<li key={list.id} className={s.userListItem}>
									<div className={s.userListInfo}>
										<span>{list.name}</span>
										<span className={s.userListCount}>
                                            {list.games.length} {list.games.length === 1 ? "jogo" : "jogos"}
                                        </span>
									</div>

									{onAddToList && (
										<Button
											className={s.userListAddBtn}
											type="button"
											aria-label={`Adicionar jogo à lista ${list.name}`}
											label={alreadyIn ? "Adicionado" : adding ? "Adicionando..." : "Adicionar"}
											icon={alreadyIn || adding ? undefined : "AddIcon"}
											disabled={alreadyIn || adding || addingId !== null}
											onClick={() => handleAdd(list)}
										/>
									)}
								</li>
							)
						})}
					</ul>
				) : (
					<p>Nenhuma lista até o momento</p>
				)}

				<div className={s.actions}>
					<Button label="Fechar" type="button" onClick={onClose} />
					{canCreate && (
						<Button
							label="Nova lista"
							icon="AddIcon"
							type="button"
							onClick={() => setCreateOpen(true)}
						/>
					)}
				</div>
			</div>
			<ListModal
				mode="create"
				open={createOpen}
				onClose={() => {
					setCreateOpen(false)
					onListsChange?.()
				}}
			/>
		</dialog>,
		document.body
	)
}