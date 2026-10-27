export interface ListsDTO {
	id: string
	name: string
	type: "WISHLIST" | "PLAYING" | "PLAYED" | "CUSTOM"
	user: {
		id: string
	}
	games: GameCacheResponse[]
}

export interface GameCacheResponse {
	appid: string
	libraryCapsule: string
}