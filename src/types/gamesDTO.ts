// interface GamesDTO {
// 	response: {
// 		"rollup_date": string,
// 		"ranks": [
// 			{
// 				"rank": string,
// 				"appid": string,
// 				"last_week_rank": string,
// 				"peak_in_game": string
// 			}
// 		]
// 	}
// }
// esse só funciona para ISteamChartsService/GetMostPlayedGames/v1 (ranked games)


export interface StoreItem {
	item_type: string
	id: string
	name: string
}

export interface GamesDTO {
	response: {
		metadata: {
			total_matching_records: string
			start: string
			count: string
		}
		ids: Array<{ appId: string; item_type?: string }>
		store_items: StoreItem[]
	}
}
export interface GamesPageProps {
	params: Promise<{ appId: string }>
}