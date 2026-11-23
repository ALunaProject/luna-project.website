import s from "../styles.module.scss"
import { Suspense } from "react"
import { Metadata } from "next"
import { searchGames } from "@/services/gamesServices"
import { parseTagIds } from "@/utils/searchTags"
import { GameData } from "@/types/gamesDTO"
import { constructMetadata } from "@/utils/metadata"
import GamesCard from "@/components/shared/GamesCard/GamesCard"
import { GamesCardSkeletonList } from "@/components/ui/skeleton/GamesCardSK"
import SearchSideBar from "@/components/forms/SearchSideBar/SearchSideBar"
import Sidebar from "@/components/layout/Sidebar/Sidebar";

type SearchPageProps = {
	searchParams: Promise<{ q?: string; tags?: string }>
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
	const { q = "" } = await searchParams
	return constructMetadata({
		title: q ? `Busca: ${q}` : "Busca de Jogos",
		description: "Resultados da busca no catálogo de jogos.",
	})
}

async function SearchResults({ term, tagIds }: { term: string; tagIds: number[] }) {
	if (!term && !tagIds.length) {
		return <p>Digite um nome ou escolha tags para buscar.</p>
	}

	const games: GameData[] = await searchGames({ term, tagIds })

	if (!games.length) {
		return <p>Nenhum jogo encontrado para essa busca.</p>
	}

	return (
		<>
			{games.map(game => (
				<GamesCard key={game.appid} {...game} />
			))}
		</>
	)
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
	const { q = "", tags } = await searchParams
	const term = q.trim().slice(0, 100) // limita o tamanho vindo da URL
	const tagIds = parseTagIds(tags)

	return (
		<main className={s.container}>
			<Sidebar />
			<Suspense fallback={null}>
				<SearchSideBar />
			</Suspense>

			<section className={s.content}>
				<h3>Resultador para: {q}</h3>
				<div className={s.gamesWrapper}>
					<Suspense
						key={`${term}|${tagIds.join(",")}`}
						fallback={<GamesCardSkeletonList />}>
						<SearchResults term={term} tagIds={tagIds} />
					</Suspense>
				</div>
			</section>
		</main>
	)
}