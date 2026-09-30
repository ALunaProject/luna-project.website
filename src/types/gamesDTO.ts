// espera appIds passado da rota para atribuir em params, e puxar infos do game na pagina do game,
export interface GamesPageProps {
	params: Promise<{ appId: string }>
}

// atributos do jogo(appList) em si
export interface GameData {
	item_type: string
	id: string
	name: string
}

// response da API - appList
export interface GamesResponse {
	response: {
		metadata: {
			total_matching_records: string
			start: string
			count: string
		}
		ids: Array<{ appId: string; item_type?: string }>
		store_items: GameData[]
	}
}

// atributos do jogo(appDetails) em si
export interface GameDetailsData {
	type: string
	name: string
	detailed_description: string
	header_image: string
	genres: Array<{ id: string; description: string }>
	release_date: {
		coming_soon: boolean
		date: string
	}
}

// entrada para validação de appDetails
interface GameDetailsEntry {
	success: boolean
	data?: GameDetailsData
}

// resposta de appDetails
export type GameDetailsResponse = Record<string, GameDetailsEntry>

// export interface GameCategories {
//     response: {
//         categories: GameCategory[]
//     }
// }
//
// export interface GameCategory {
//     categoryid: string;
//     type: string;
//     display_name: string
// }
