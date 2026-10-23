"use server"

import { gamesApi, gamesStoreApi } from "@/utils/games-api"
import {
    GameDetailsData,
    GameDetailsResponse,
    GamesResponse,
    GameData,
    GameReviewsData,
} from "@/types/gamesDTO"
import { unstable_cache } from "next/cache"
import { MATURE_TAG_IDS } from "@/utils/contants";

export async function getAllGames( {
                                       start,
                                       count,
                                       sort,
                                   }: any ): Promise<GameData[]> {
    try {
        const queryPayload = {
            // mesmo set de SteamWebApi
            query: {
                start: start,
                count: count,
                sort: sort,
                // sort: categoria de listagem (n documentado kk)
                // 11 - Mais vendidos (você testou e confirmou)
                // 20 - Mais recentes
                // 21 - % de reviews positivas (desc)
                filters: {
                    released_only: true,
                    type_filters: {
                        include_games: true,
                    },
                    tagids_exclude: [ ...MATURE_TAG_IDS ],
                    // inicializar numa variavel quando adicionar filtro de sla oq
                    // olhar na docs da api (clanker) todos os filtros para inicializar e utilizar na aba de filtros
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
                    input_json: JSON.stringify( queryPayload ),
                },
            },
        )
        console.log( res.data.response.store_items )
        return res.data?.response?.store_items || []
    } catch (error) {
        console.error( "Erro ao carregar jogos da Steam:", error )
        return []
    }
}

const getCachedGameDetails = unstable_cache(
    async ( appId: string ) => {
        const res = await gamesStoreApi.get<GameDetailsResponse>(
            "api/appdetails",
            {
                params: { appids: appId, cc: "br", l: "brazilian" },
            },
        )
        const entry = res.data[appId]
        if (!entry?.success || !entry.data) return null
        console.log( entry.data )
        return entry.data
    },
    [ "game-details" ],
    { revalidate: 60 * 60 * 24 }, // salvo por 24h

    // `next/unstable_cache` é um cache do serve-side, compartilha o cache para o servidor inteiro,
    // ou seja, todos os usuários acessam o mesmo cache que já está no server
)

export async function getGameDetails(
    appId: string | null,
): Promise<GameDetailsData | null> {
    if (!appId) return null
    try {
        return await getCachedGameDetails( appId )
    } catch (error) {
        console.error( "Erro ao carregar detalhes do jogo da Steam:", error )
        return null
    }
}

export async function getAppReviews(
    appId: string | null,
): Promise<GameReviewsData | null> {
    if (!appId) return null

    try {
        const res = await gamesStoreApi.get<GameReviewsData>(
            `appreviews/${ appId }`,
            {
                params: {
                    json: 1,
                    language: "brazilian",
                    purchase_type: "BR",
                    num_per_page: 0,
                },
            },
        )
        // a Steam responde { success: 0 } (sem query_summary) pra alguns jogos ou quando limita as requisições
        if (!res.data?.query_summary) return null
        return res.data
    } catch (error) {
        console.error( "Erro ao carregar análises da Steam:", error )
        return null
    }
}
