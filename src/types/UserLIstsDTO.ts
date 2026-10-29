import { GameData } from "@/types/gamesDTO";

export interface ListsDTO {
	id: string
	name: string
	type: "WISHLIST" | "PLAYING" | "PLAYED" | "CUSTOM"
	user: {
		id: string
	}
	games: GameData[]
}

export type ListModalMode =
	| { mode: "create" }
	| { mode: "edit"; listId: string; listName: string }

export type UseListModalProps = ListModalMode & {
	open: boolean
	onClose: () => void
}