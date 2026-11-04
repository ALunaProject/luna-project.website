"use client"

import { MouseEvent, useEffect, useState } from "react"
import s from "@/components/shared/GamesCard/styles.module.scss"
import Button from "@/components/ui/Button/Button"
import { addGameToList, getUserLists } from "@/services/userListsServices"
import { STORAGE_KEYS } from "@/utils/contants"
import { ListsDTO } from "@/types/UserLIstsDTO"
import { useAuth } from "@/hooks/useAuth"
import { GameData } from "@/types/gamesDTO"
import UserListsButton from "@/components/layout/ListsWrapper/UserListsButton"

interface GameCardActionsProps {
	req: GameData
}

export default function GameCardActions({ req }: GameCardActionsProps) {
	const { user } = useAuth()
	const [userLists, setUserLists] = useState<ListsDTO[]>([])

	useEffect(() => {
		if (!user) return

		getUserLists(user.id).then(data => {
			if (data) setUserLists(data)
		})
	}, [user])

	function refreshLists() {
		if (!user) return
		getUserLists(user.id).then(data => {
			if (data) setUserLists(data)
		})
	}

	async function handleAddToList(e: MouseEvent, listType: string) {
		e.preventDefault()
		e.stopPropagation()

		const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
		if (!token) return console.error("No token")

		const list = userLists.find(l => l.type === listType)
		if (!list) return console.error(`Lista ${listType} não encontrada`)

		const updatedList = await addGameToList(list.id, req, token)
		if (updatedList) {
			alert(`Jogo adicionado na lista "${list.name}"`)
		}
	}
	async function handleCustomList(list: ListsDTO) {
		const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
		if (!token) return console.error("No token")

		const updatedList = await addGameToList(list.id, req, token)
		if (updatedList) {
			alert(`Jogo adicionado na lista "${list.name}"`)
			refreshLists()
		}
	}

	function isGameInList(list: ListsDTO) {
		return list.games.some(g => String(g.appid) === String(req.appid))
	}

	if (!user) return null

	return (
		<div className={s.buttonsWrapper}>
			<Button
				aria-label={`Adicionar à lista "Quero Jogar"`}
				onClick={e => handleAddToList(e, "WISHLIST")}
				icon="PlayWishIcon"
			/>
			<Button
				aria-label={`Adicionar à lista "Jogando"`}
				onClick={e => handleAddToList(e, "PLAYING")}
				icon="PlayAddIcon"
			/>
			<Button
				aria-label={`Adicionar à lista "Jogado"`}
				onClick={e => handleAddToList(e, "PLAYED")}
				icon="PlayCheckIcon"
			/>
			<UserListsButton
				ariaLabel="Ver minhas listas"
				icon="AddIcon"
				lists={userLists}
				onListsChange={refreshLists}
				onAddToList={handleCustomList}
				isGameInList={isGameInList}
			/>
		</div>
	)
}
