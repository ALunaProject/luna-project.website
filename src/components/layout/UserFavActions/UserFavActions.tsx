
import { ListsDTO } from "@/types/UserLIstsDTO"
import { getSteamGamesByIds } from "@/services/gamesServices";
import GamesCard from "@/components/shared/GamesCard/GamesCard";
import FavGameItem from "@/components/layout/UserFavActions/FavGameItem";

interface UserFavActionsProps {
	favorites: ListsDTO | null
}

export default async function UserFavActions({
												 favorites,
											 }: UserFavActionsProps) {
	const favGames = favorites?.games ?? []

	if (favGames.length === 0) {
		return <p>Nenhum jogo favorito ainda</p>
	}

	const steamGames = await getSteamGamesByIds(
		favGames.map(g => Number(g.appid)),
	)

	return (
		<>
			{favGames.map(fav => {
				const game = steamGames.get(Number(fav.appid))
				if (!game) return null
				return (
					<FavGameItem
						key={fav.appid}
						appId={fav.appid}
						gameName={game.name}>
						<GamesCard {...game} />
					</FavGameItem>
				)
			})}
		</>
	)
}