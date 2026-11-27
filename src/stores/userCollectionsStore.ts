import { create } from "zustand"
import { getUserLists } from "@/services/userListsServices"
import { getUserFavorites } from "@/services/userServices"
import type { ListsDTO } from "@/types/UserLIstsDTO"

// Listas e favoritos do usuário logado, buscados UMA vez e compartilhados pelo servidor!! (zustand cuida disso)

interface CollectionsState {
	loadedFor: string | null
	lists: ListsDTO[]
	favorites: ListsDTO | null
	load: (userId: string) => Promise<void>
	refresh: (userId: string) => Promise<void>
	setFavorites: (favorites: ListsDTO | null) => void
	reset: () => void
}

let inflight: { userId: string; promise: Promise<void> } | null = null
let version = 0

function fetchCollections(
	userId: string,
	set: (s: Partial<CollectionsState>) => void,
) {
	if (inflight?.userId === userId) return inflight.promise

	const currentVersion = version
	const promise = Promise.all([
		getUserLists(userId),
		getUserFavorites(userId),
	])
		.then(([lists, favorites]) => {
			if (currentVersion !== version) return
			set({ loadedFor: userId, lists: lists ?? [], favorites })
		})
		.catch(() => {
			if (currentVersion !== version) return
			set({ loadedFor: userId, lists: [], favorites: null })
		})
		.finally(() => {
			if (inflight?.promise === promise) inflight = null
		})

	inflight = { userId, promise }
	return promise
}

export const useUserCollectionsStore = create<CollectionsState>((set, get) => ({
	loadedFor: null,
	lists: [],
	favorites: null,

	load: async userId => {
		if (get().loadedFor === userId) return
		return fetchCollections(userId, set)
	},

	refresh: async userId => {
		inflight = null
		return fetchCollections(userId, set)
	},

	setFavorites: favorites => set({ favorites }),

	reset: () => {
		version += 1
		inflight = null
		set({ loadedFor: null, lists: [], favorites: null })
	},
}))
