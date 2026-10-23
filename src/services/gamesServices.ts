"use server"

import { gamesApi, gamesStoreApi } from "@/utils/games-api"
import {
    GameDetailsData,
    GameDetailsResponse,
    GamesResponse,
    GameData,
    GameReviewsData,
    GameReviewsResponse,
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

// A Steam desativou store.steampowered.com/appreviews em 22/10/2026.
// O substituto é IUserReviewsService/GetAppReviews (não precisa de chave).
// Sem chave, a Steam usa um limite de requisições menor (HTTP 429) e guarda a resposta por até 10 min,
// então também guardamos o resultado aqui por 1h (igual aos detalhes do jogo).
const getCachedAppReviews = unstable_cache(
    async ( appId: number ) => {
        const res = await gamesApi.get<GameReviewsResponse>(
            "IUserReviewsService/GetAppReviews/v1/",
            {
                params: {
                    input_json: JSON.stringify( {
                        appid: appId,
                        // sem "languages" a Steam devolve só análises em inglês
                        languages: [ "brazilian" ],
                        // só o resumo (query_summary) interessa, não a lista de análises
                        num_per_page: 1,
                    } ),
                },
            },
        )
        // não existe mais "success": os dados vêm dentro de "response", que vem vazio se a Steam não conhece o app
        const data = res.data?.response
        if (!data?.query_summary) return null
        return { query_summary: data.query_summary }
    },
    [ "app-reviews" ],
    { revalidate: 60 * 60 },
)

export async function getAppReviews(
    appId: string | null,
): Promise<GameReviewsData | null> {
    if (!appId) return null

    const id = Number( appId )
    if (!Number.isInteger( id ) || id <= 0) return null

    try {
        return await getCachedAppReviews( id )
    } catch (error) {
        console.error( "Erro ao carregar análises da Steam:", error )
        return null
    }
}
