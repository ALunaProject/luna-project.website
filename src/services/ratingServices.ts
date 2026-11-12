import { RatingResponse } from "@/types/ratingDTO"
import { api } from "@/utils/api";

export async function getMyGameRating(appId: string) {
	const res = await api.get<RatingResponse>(`/ratings/games/${appId}/me`)
	return res.status === 204 ? null : res.data
}

export async function saveGameRating(appId: string, score: number) {
	const res = await api.put<RatingResponse>(`/ratings/games/${appId}`, {
		score,
	})
	return res.data
}

export async function removeGameRating(appId: string) {
	await api.delete(`/ratings/games/${appId}`)
}