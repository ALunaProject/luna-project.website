import s from "./styles.module.scss"

import { getAllGames, getGameDetails } from "@/services/gamesServices"
import { notFound } from "next/navigation"
import { GamesPageProps } from "@/types/gamesDTO"
import { Metadata } from "next"
import { constructMetadata } from "@/utils/metadata"
import Tags from "@/components/ui/Tags/Tags"

// export async function generateMetadata({params}: GamesPageProps): Promise<Metadata> {
//     const {appId} = await params
//     const featuredGame = await getGameDetails(appId)
//
//     if (!featuredGame) {
//         return {
//             title: "Luna | Jogo não encontrado",
//         }
//     }
//
//     return {
//         title: `Luna | ${featuredGame.name}`,
//         // You can also add Open Graph / Twitter metadata here:
//         description: `Confira os detalhes de ${featuredGame.name}`,
//     }}

export async function generateMetadata({
	params,
}: GamesPageProps): Promise<Metadata> {
	const { appId } = await params
	const game = await getGameDetails(appId)

	if (!game) {
		return constructMetadata({ title: "Jogo não encontrado" })
	}

	return constructMetadata({
		title: game.name,
		description: `Gêneros: ${game.genres?.map(g => g.description).join(", ")}`,
		image: game.header_image,
	})
}

export default async function GamePage({ params }: GamesPageProps) {
	const { appId } = await params
	const game = await getGameDetails(appId)

	if (!game) {
		notFound()
	}
	return (
		<div>
			{game ? (
				<section>
					<img src={game.header_image} alt={game.name} />
					<h1>{game.name}</h1>
					{/*<p>{game.short_description}</p>*/}
					{game?.genres?.slice(0, 3).map(g => (
						<Tags key={g.id} label={g.description} />
					))}
				</section>
			) : (
				<p>Não foi possível carregar os detalhes do jogo.</p>
			)}
		</div>
	)
}
