"use client"

import { MouseEvent, useEffect, useState } from "react"
import s from "@/components/shared/GamesCard/styles.module.scss"
import Button from "@/components/ui/Button/Button"
import { addGameToList, getUserLists } from "@/services/userListsServices"
import { STORAGE_KEYS } from "@/utils/contants"
import { ListsDTO } from "@/types/UserLIstsDTO"
import { useAuth } from "@/hooks/useAuth";
import { GameData } from "@/types/gamesDTO";

interface GameCardActionsProps {
	req: GameData
}

export default function GameCardActions({req}: GameCardActionsProps) {
	const {user} = useAuth()
	const [userLists, setUserLists] = useState<ListsDTO[]>([])

	useEffect(() => {
		if (!user) return

		getUserLists(user.id).then(data => {
			if (data) setUserLists(data)
		})
	}, [user])

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

	if (!user) return null

	return (
		<div className={s.buttonsWrapper}>
			<Button onClick={e => handleAddToList(e, "WISHLIST")} icon="PlayWishIcon"/>
			<Button onClick={e => handleAddToList(e, "PLAYING")} icon="PlayAddIcon"/>
			<Button onClick={e => handleAddToList(e, "PLAYED")} icon="PlayCheckIcon"/>
			<Button
				onClick={e => {
					e.preventDefault()
					e.stopPropagation()
					// para listas customizadas precisa abrir um modal para escolher a lista
				}}
				icon="AddIcon"
			/>
		</div>
	)
}