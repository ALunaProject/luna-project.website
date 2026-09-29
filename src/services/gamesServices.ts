'use server'

import {gamesApi} from "@/utils/games-api"
import {GamesDTO, StoreItem} from "@/types/gamesDTO";
import {GAMES_API_KEY} from "@/utils/contants";

// export async function getAllGames(): Promise<any[]> {
//     try {
//         const response = await gamesApi.get("/ISteamChartsService/GetMostPlayedGames/v1")
//         console.log("Steam:", response.data)
//         return response.data?.response?.ranks || []
//
//     } catch (error) {
//         console.error("Falha ao buscar todos os jogos:", error)
//         return []
//     }
// }


export async function getAllGames(): Promise<StoreItem[]> {
    try {
        const queryPayload = {
            // mesmo set de SteamWebApi
            query: {
                start: "0",
                count: "100",
                sort: "20",
                // sort: categotia de listagem (relevancia, mais jogados, lançamento, alfabetico, etc)
                // 20 = mais jogados; 11 = mais vendidos, dar uma olhada em cada codigo e testar (nao documentado kk)
                filters: {
                    released_only: true,
                    type_filters: {
                        include_apps: true,
                        include_games: true,
                    },
                },
            },
            context: {
                country_code: "BR",
            },
            data_request: {
                include_basic_info: true,
                // olhar docs para tratar corretamente
            },

        }

        const res = await gamesApi.get<GamesDTO>("IStoreQueryService/Query/v1", {
            params: {
                key: GAMES_API_KEY,
                input_json: JSON.stringify(queryPayload),
                // sei n
            },
        })

        return res.data?.response?.store_items || []
    } catch (error) {
        console.error("Erro ao carregar jogos da Steam:", error)
        return []
    }
}