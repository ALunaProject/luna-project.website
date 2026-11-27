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
import { CardActionsSkeleton } from "@/components/ui/skeleton/Skeletons"
import { addFavoriteGame, getUserFavorites } from "@/services/userServices";

interface GameCardActionsProps {
	req: GameData
}

const MAX_FAVORITES = 4

export default function GameCardActions({req}: GameCardActionsProps) {
	const [favorites, setFavorites] = useState<ListsDTO | null>(null)
	const [userLists, setUserLists] = useState<ListsDTO[]>([])
	// true só até a primeira resposta (depois de adicionar jogo, atualiza sem piscar skeleton)
	const [listsLoading, setListsLoading] = useState(true)
	const {user, isLoading} = useAuth()

	function refreshLists() {
		if (!user) return
		Promise.all([getUserLists(user.id), getUserFavorites(user.id)])
			.then(([lists, favs]) => {
				if (lists) setUserLists(lists)
				setFavorites(favs)
			})
			.catch(() => {})
			.finally(() => setListsLoading(false))
	}

	useEffect(() => {
		refreshLists()
		// eslint-disable-next-line react-hooks/exhaustive-deps
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

	async function handleAddFavorite() {
		const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
		if (!token) return console.error("No token")

		const updated = await addFavoriteGame(req, token)
		if (updated) {
			setFavorites(updated)
			alert("Jogo adicionado aos favoritos")
		} else {
			alert("Não foi possível favoritar (limite de 4 jogos ou já favoritado)")
		}
	}

	const favoritesGames = favorites?.games ?? []
	const isGameInFavorites = favoritesGames.some(
		g => String(g.appid) === String(req.appid),
	)

	if (isLoading) return <CardActionsSkeleton />

	if (!user) return null

	return (
		<div className={s.buttonsWrapper}>

			<UserListsButton
				ariaLabel="Ver minhas listas"
				icon="AddIcon"
				label="Adicionar em uma lista"
				lists={userLists}
				loading={listsLoading}
				onListsChange={refreshLists}
				onAddToList={handleCustomList}
				isGameInList={isGameInList}
				favorites={{
					count: favoritesGames.length,
					max: MAX_FAVORITES,
					isGameIn: isGameInFavorites,
					onAdd: handleAddFavorite,
				}}
			/>
		</div>
	)
}