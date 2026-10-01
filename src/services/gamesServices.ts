"use server"

import { gamesApi, gamesStoreApi } from "@/utils/games-api"
import {
	GameDetailsData,
	GameDetailsResponse,
	GamesResponse,
	GameData,
} from "@/types/gamesDTO"
import axios from "axios"
import { unstable_cache } from "next/cache"

export async function getAllGames(): Promise<GameData[]> {
	try {
		const queryPayload = {
			// mesmo set de SteamWebApi
			query: {
				start: "0",
				count: "25",
				sort: "11",
				// sort: categotia de listagem (relevancia, mais jogados, lançamento, alfabetico, etc)
				// 20 = mais jogados; 11 = mais vendidos, dar uma olhada em cada codigo e testar (nao documentado kk)
				filters: {
					released_only: true,
					type_filters: {
						include_games: true,
					},
				},
			},
			context: {
				language: "brazilian",
				country_code: "BR",
			},
			data_request: {
				include_basic_info: false,
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
		console.log(res)
		return res.data?.response?.store_items || []
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

	// `next/unstable_cache` é um cache do serve-side, compartilha o cache para o servidor inteiro,
	// ou seja, todos os usuários acessam o mesmo cache que já está no server
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

// export async function getAllCategories(): Promise<GameCategory[]> {
//     try {
//         const res = await gamesApi.get<GameCategories>("IStoreBrowseService/GetStoreCategories/v1/?language=brazilian")
//     	console.log(res)
//         return res.data?.response?.categories || []
//     } catch (error) {
//         console.error("Erro ao carregar jogos da Steam:", error)
//         return []
//     }
// }
