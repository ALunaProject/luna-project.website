export interface ListsDTO {
    id: string
    name: string
    type: "WISHLIST" | "PLAYING" | "PLAYED" | "CUSTOM"
    user: {
        id: string
    }
    games: Array<{ appid: string }>
}