import s from "./styles.module.scss"
import Sidebar from "@/components/layout/Sidebar/Sidebar"
import { getAllGames } from "@/services/gamesServices"
import GamesCard from "@/components/shared/GamesCard/GamesCard"
import { GameData } from "@/types/gamesDTO"
import { Metadata } from "next"
import { constructMetadata } from "@/utils/metadata"
import Pagination from "@/components/shared/Pagination/Pagination"
import { Suspense } from "react"
import { GamesCardSkeletonList } from "@/components/ui/skeleton/GamesCardSK"

const GAMES_PER_PAGE = 25

export async function generateMetadata(): Promise<Metadata> {
	return constructMetadata({
		title: "Catalogo de Jogos",
		description:
			"Explore e conheça jogos em alta a mano algume escreve um texto generico aqui vai",
	})
}

async function GamesList({ page }: { page: number }) {
	const start = page * GAMES_PER_PAGE
	const games: GameData[] = await getAllGames({
		start,
		count: GAMES_PER_PAGE,
		sort: "20",
	})

	if (games.length === 0) {
		return <p>Nenhum jogo encontrado no momento.</p>
	}

	return (
		<>
			{games.map((game: GameData) => (
				<GamesCard key={game.appid} {...game} />
			))}
		</>
	)
}

export default async function GamesPage({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>
}) {
	const params = await searchParams
	const page = Math.max(0, Number(params.page) || 0)

	return (
		<main className={s.container}>
			<Sidebar />
			<section className={s.content}>
				<div className={s.gamesWrapper}>
					<Suspense key={page} fallback={<GamesCardSkeletonList />}>
						<GamesList page={page} />
					</Suspense>
				</div>
				<Pagination page={page} />
			</section>
		</main>
	)
}
