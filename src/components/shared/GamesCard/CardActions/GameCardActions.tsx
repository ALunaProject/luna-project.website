"use client"

import UserListsButton from "@/components/layout/ListsWrapper/UserListsButton"
import s from "@/components/shared/GamesCard/styles.module.scss"
import { CardActionsSkeleton } from "@/components/ui/skeleton/Skeletons"
import { useAuth } from "@/hooks/useAuth"
import { useUserCollections } from "@/hooks/useUserCollections"
import { addGameToList } from "@/services/userListsServices"
import { addFavoriteGame } from "@/services/userServices"
import type { GameData } from "@/types/gamesDTO"
import type { ListsDTO } from "@/types/UserLIstsDTO"
import { STORAGE_KEYS } from "@/utils/contants"

interface GameCardActionsProps {
	req: GameData
}

const MAX_FAVORITES = 4

export default function GameCardActions({ req }: GameCardActionsProps) {
	const { user, isLoading: authLoading } = useAuth()
	const { lists, favorites, loading, refresh, setFavorites } =
		useUserCollections()

	async function handleCustomList(list: ListsDTO) {
		const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
		if (!token) return console.error("No token")

		const updatedList = await addGameToList(list.id, req, token)
		if (updatedList) {
			alert(`Jogo adicionado na lista "${list.name}"`)
			refresh()
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
			alert(
				"Não foi possível favoritar (limite de 4 jogos ou já favoritado)",
			)
		}
	}

	const favoritesGames = favorites?.games ?? []
	const isGameInFavorites = favoritesGames.some(
		g => String(g.appid) === String(req.appid),
	)

	if (authLoading) return <CardActionsSkeleton />

	if (!user) return null

	return (
		<div className={s.buttonsWrapper}>
			<UserListsButton
				ariaLabel="Ver minhas listas"
				icon="AddIcon"
				label="Adicionar em uma lista"
				lists={lists}
				loading={loading}
				onListsChange={refresh}
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
