"use client"

import { useCallback, useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useUserCollectionsStore } from "@/stores/userCollectionsStore"

export function useUserCollections() {
	const { user, isLoading: authLoading } = useAuth()
	const userId = user?.id ?? null

	const lists = useUserCollectionsStore(s => s.lists)
	const favorites = useUserCollectionsStore(s => s.favorites)
	const loadedFor = useUserCollectionsStore(s => s.loadedFor)
	const setFavorites = useUserCollectionsStore(s => s.setFavorites)

	useEffect(() => {
		const { load, reset } = useUserCollectionsStore.getState()
		if (userId) void load(userId)
		else if (!authLoading) reset()
	}, [userId, authLoading])

	const refresh = useCallback(() => {
		if (userId) void useUserCollectionsStore.getState().refresh(userId)
	}, [userId])

	return {
		lists,
		favorites,
		// true enquanto o login ou as listas ainda não chegaram
		loading: authLoading || (userId !== null && loadedFor !== userId),
		refresh,
		setFavorites,
	}
}
