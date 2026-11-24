"use server"

import { unstable_cache } from "next/cache"
import type {
	GameData,
	GameDetailsData,
	GameDetailsResponse,
	GameReviewsData,
	GameReviewsResponse,
	GamesResponse,
	StoreSearchResponse,
} from "@/types/gamesDTO"
import {
	EXCLUDES_TAGS,
	FALLBACK_ASSETS,
	GAME_SORT,
	type GameSort,
} from "@/utils/contants"
import { gamesApi, gamesStoreApi } from "@/utils/games-api"

const MIN_TERM_LENGTH = 2
const MAX_SEARCH_RESULTS = 25

type QueryGamesParams = {
	start: number
	count: number
	sort?: GameSort | string
	tagIds?: number[]
}

async function queryGames({
	start,
	count,
	sort = GAME_SORT.NEWEST,
	tagIds = [],
}: QueryGamesParams): Promise<GameData[]> {
	const queryPayload = {
		query: {
			start: start,
			count: count,
			sort: sort,
			// valores de sort: veja GAME_SORT em utils/contants.ts
			filters: {
				released_only: true,
				type_filters: {
					include_games: true,
				},
				tagids_exclude: [...EXCLUDES_TAGS],
				// um objeto por tag, cada um com um único id: o jogo precisa ter TODAS
				// (formato descrito em services/STEAMAPI_DOCS.md)
				...(tagIds.length > 0 && {
					tagids_must_match: tagIds.map(id => ({
						tagids: [String(id)],
					})),
				}),
				// TODO: olhar na docs da api (clanker) todos os filtros para inicializar e utilizar na aba de filtros
			},
		},
		context: {
			language: "brazilian",
			country_code: "BR",
		},
		data_request: {
			include_assets: true,
			include_ratings: true,
			include_tag_count: 69,
		},
	}

	const res = await gamesApi.get<GamesResponse>(
		"IStoreQueryService/Query/v1",
		{
			params: {
				input_json: JSON.stringify(queryPayload),
			},
		},
	)
	return res.data?.response?.store_items ?? []
}

export async function getAllGames(
	params: QueryGamesParams,
): Promise<GameData[]> {
	try {
		return await queryGames(params)
	} catch (error) {
		console.error("Erro ao carregar jogos da Steam:", error)
		return []
	}
}

const getCachedGameDetails = unstable_cache(
	async (appId: string) => {
		const res = await gamesStoreApi.get<GameDetailsResponse>(
			"api/appdetails",
			{
				params: { appids: appId, cc: "br", l: "brazilian" },
			},
		)
		const entry = res.data[appId]
		if (!entry?.success || !entry.data) return null
		return entry.data
	},
	["game-details"],
	{ revalidate: 60 * 60 * 24 }, // salvo por 24h

	// `next/unstable_cache` é um cache do serve-side, compartilha o cache para o servidor inteiro
)

export async function getGameDetails(
	appId: string | null,
): Promise<GameDetailsData | null> {
	if (!appId) return null
	try {
		return await getCachedGameDetails(appId)
	} catch (error) {
		console.error("Erro ao carregar detalhes do jogo da Steam:", error)
		return null
	}
}

// A Steam desativou store.steampowered.com/appreviews em 22/10/2026.
// O substituto é IUserReviewsService/GetAppReviews (não precisa de chave).
// Sem chave, a Steam usa um limite de requisições menor (HTTP 429) e guarda a resposta por até 10 min
// usando cache do servidor para armazenar por 1h

const getCachedAppReviews = unstable_cache(
	async (appId: number) => {
		const res = await gamesApi.get<GameReviewsResponse>(
			"IUserReviewsService/GetAppReviews/v1/",
			{
				params: {
					input_json: JSON.stringify({
						appid: appId,
						languages: ["brazilian"],
						num_per_page: 1,
					}),
				},
			},
		)
		const data = res.data?.response
		if (!data?.query_summary) return null
		return { query_summary: data.query_summary }
	},
	["app-reviews"],
	{ revalidate: 60 * 60 },
)

export async function getAppReviews(
	appId: string | null,
): Promise<GameReviewsData | null> {
	if (!appId) return null

	const id = Number(appId)
	if (!Number.isInteger(id) || id <= 0) return null

	try {
		return await getCachedAppReviews(id)
	} catch (error) {
		console.error("Erro ao carregar análises da Steam:", error)
		return null
	}
}

// Itens em lote (IStoreBrowseService/GetItems): uma requisição devolve assets e tags de
// vários jogos, no mesmo formato de `store_items` da listagem.
async function fetchStoreItems(appIds: number[]): Promise<GameData[]> {
	const res = await gamesApi.get<{ response: { store_items: GameData[] } }>(
		"IStoreBrowseService/GetItems/v1/",
		{
			params: {
				input_json: JSON.stringify({
					ids: appIds.map(appid => ({ appid })),
					context: { language: "brazilian", country_code: "BR" },
					data_request: {
						include_assets: true,
						include_tag_count: 69,
					},
				}),
			},
		},
	)
	return res.data?.response?.store_items ?? []
}

const getCachedGameTags = unstable_cache(
	async (appId: number) => {
		const [item] = await fetchStoreItems([appId])
		return item?.tags ?? []
	},
	["game-tags"],
	{ revalidate: 60 * 60 * 24 },
)

export async function getGameTags(
	appId: string | null,
): Promise<GameData["tags"]> {
	const id = Number(appId)
	if (!Number.isInteger(id) || id <= 0) return []

	try {
		return await getCachedGameTags(id)
	} catch (error) {
		console.error("Erro ao carregar tags do jogo:", error)
		return []
	}
}

type SearchInput = { term?: string; tagIds?: number[] }

function searchByTags(tagIds: number[]): Promise<GameData[]> {
	return queryGames({
		start: 0,
		count: MAX_SEARCH_RESULTS,
		sort: GAME_SORT.NEWEST,
		tagIds,
	})
}


async function searchByName(
	term: string,
	tagIds: number[],
): Promise<GameData[]> {
	const search = await gamesStoreApi.get<StoreSearchResponse>(
		"api/storesearch/",
		{
			params: { term, l: "brazilian", cc: "br" },
		},
	)
	const found = (search.data?.items ?? [])
		.filter(item => item.type === "app")
		.slice(0, MAX_SEARCH_RESULTS)
	if (!found.length) return []

	const items = await fetchStoreItems(found.map(item => item.id))
	const byId = new Map(items.map(game => [String(game.appid), game]))

	return found
		.map((item): GameData => {
			const full = byId.get(String(item.id))
			return {
				appid: String(item.id),
				name: item.name,
				assets: full?.assets ?? FALLBACK_ASSETS,
				tags: full?.tags ?? [],
				tiny_image: item.tiny_image,
			}
		})
		.filter(game =>
			tagIds.every(id => game.tags.some(tag => tag.tagid === id)),
		)
}

async function runSearch({
	term = "",
	tagIds = [],
}: SearchInput): Promise<GameData[]> {
	if (term.length >= MIN_TERM_LENGTH) return searchByName(term, tagIds)
	return tagIds.length > 0 ? searchByTags(tagIds) : []
}

const getCachedSearch = unstable_cache(runSearch, ["search-games-v3"], {
	revalidate: 60 * 10,
})

export async function searchGames({
	term = "",
	tagIds = [],
}: SearchInput): Promise<GameData[]> {
	try {
		return await getCachedSearch({
			term: term.trim().toLowerCase(),
			tagIds: [...new Set(tagIds)].sort((a, b) => a - b),
		})
	} catch (error) {
		console.error("Erro ao buscar jogos da Steam:", error)
		return []
	}
}
