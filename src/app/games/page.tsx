import s from "./styles.module.scss"
import Sidebar from "@/components/layout/Sidebar/Sidebar"
import { getAllGames, getGameDetails } from "@/services/gamesServices"

import GamesCard from "@/components/shared/GamesCard/GamesCard"
import { GameData } from "@/types/gamesDTO"
import { Metadata } from "next"
import { constructMetadata } from "@/utils/metadata"
import { notFound } from "next/navigation"

export async function generateMetadata(): Promise<Metadata> {
	return constructMetadata({
		title: "Catalogo de Jogos",
		description:
			"Explore e conheça jogos em alta a mano algume escreve um texto generico aqui vai",
	})
}

export default async function GamesPage() {
	const games: GameData[] = await getAllGames()

	return (
		<main className={s.container}>
			<Sidebar />
			<section className={s.content}>
				<div className={s.gamesWrapper}>
					{games.map((game: GameData) => (
						<GamesCard key={game.id} {...game} />
					))}
					{games.length === 0 && (
						<p>Nenhum jogo encontrado no momento.</p>
					)}
				</div>
			</section>
		</main>
	)
}
