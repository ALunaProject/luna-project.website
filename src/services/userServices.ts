import { api } from "@/utils/api"
import { ListsDTO } from "@/types/UserLIstsDTO";
import { GameData } from "@/types/gamesDTO";
import axios from "axios";

export async function getUserByUsername(
	username: string,
): Promise<UserDTO | null> {
	try {
		const { data } = await api.get<UserDTO[]>("/api/users")
		return data.find(u => u.username === username) ?? null
	} catch (error) {
		console.error("Falha ao buscar usuário:", error)
		return null
	}
}

export async function getUserByID(userId: string): Promise<UserDTO | null> {
	try {
		const { data } = await api.get<UserDTO[]>("/api/users")
		return data.find(u => u.id === userId) ?? null
	} catch (error) {
		console.error(error)
		return null
	}
}

const USER_ENDPOINTS = {
	update: (id: string) => `/api/users/${id}`,
	profilePic: (id: string) => `/api/users/${id}/profile-picture`,
	banner: (id: string) => `/api/users/${id}/banner`,
}

export interface UpdateProfilePayload {
	username: string
	bio: string
}

export type UserImageKind = "profilePic" | "banner"

export async function updateUserProfile(
	userId: string,
	payload: UpdateProfilePayload,
): Promise<UserDTO> {
	const { data } = await api.put<UserDTO>(
		USER_ENDPOINTS.update(userId),
		payload,
	)
	return data
}

export async function uploadUserImage(
	userId: string,
	kind: UserImageKind,
	file: File,
): Promise<UserDTO> {
	const form = new FormData()
	form.append("file", file)

	const url =
		kind === "profilePic"
			? USER_ENDPOINTS.profilePic(userId)
			: USER_ENDPOINTS.banner(userId)

	const { data } = await api.post<UserDTO>(url, form, {
		headers: { "Content-Type": "multipart/form-data" },
	})
	return data
}

export async function loginService(data: LoginDTO): Promise<AuthResponseDTO> {
	const response = await api.post("/auth/login", data)
	return response.data
}

export async function signupService(
	data: RegisterDTO,
): Promise<AuthResponseDTO> {
	const response = await api.post<AuthResponseDTO>("/api/users", data)
	return response.data
}

export async function getUserFavorites(
	userId: string,
): Promise<ListsDTO | null> {
	try {
		const { data } = await api.get<ListsDTO>(`api/favorites/${userId}`)
		return data
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404) {
			return null
		}
		console.error("Falha ao encontrar favoritos do usuário: ", error)
		return null
	}
}

export async function addFavoriteGame(
	req: GameData,
	token: string,
): Promise<ListsDTO | null> {
	try {
		const { data } = await api.post<ListsDTO>(`api/favorites`, req, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		return data
	} catch (error) {
		console.error("Falha ao adicionar jogo aos favoritos: ", error)
		return null
	}
}

export async function removeFavoriteGame(
	appId: string,
	token: string,
): Promise<ListsDTO | null> {
	try {
		const { data } = await api.delete<ListsDTO>(
			`api/favorites/${appId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		)
		return data
	} catch (error) {
		console.error("Falha ao remover jogo dos favoritos: ", error)
		return null
	}
}