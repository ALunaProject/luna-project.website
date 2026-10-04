// espera appIds passado da rota para atribuir em params, e puxar infos do game na pagina do game,
export interface GamesPageProps {
	params: Promise<{ appId: string }>
}

// atributos do jogo(appList) em si
export interface GameData {
	appid: string
	name: string
	assets: {
		header_2x: string
		header: string
		community_icon: string
	}
	tags: Array<{ tagid: number; weight: string }>
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
	name: string
	is_free: boolean
	detailed_description: string
	about_the_game: string
	header_image: string
	background: string
	background_raw: string

	genres: Array<{ id: string; description: string }>
	categories: Array<{ id: string; description: string }>
	screenshots: Array<{ id: string; path_full: string }>
	movies: Array<{ id: string; thumbnail: string; dash_av1: string }>

	release_date: {
		coming_soon: boolean
		date: string
	}
	pc_requirements: {
		minimum: string
		recommended: string
	}
	price_overview: {
		currency: string
		final_formatted: string
	}
	platforms: {
		windows: boolean
		mac: boolean
		linux: boolean
	}
	ratings: {
		dejus: {
			required_age: string
			descriptors: string
		}
	}
}

// entrada para validação de appDetails
interface GameDetailsEntry {
	success: boolean
	data?: GameDetailsData
}

// resposta de appDetails
export type GameDetailsResponse = Record<string, GameDetailsEntry>

export interface GameTags {
	data: Array<{ tagid: number; name: string }>
}
