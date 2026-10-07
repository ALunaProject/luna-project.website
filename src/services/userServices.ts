import { api } from "@/utils/api"

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

// Endpoints de edição de perfil (UserController do back)
const USER_ENDPOINTS = {
	update: (id: string) => `/api/users/${id}`, // PUT  { username, bio }
	profilePic: (id: string) => `/api/users/${id}/profile-picture`, // POST multipart (campo "file")
	banner: (id: string) => `/api/users/${id}/banner`, // POST multipart (campo "file")
}

export interface UpdateProfilePayload {
	username: string
	bio: string
}

export type UserImageKind = "profilePic" | "banner"

// Sem try/catch de propósito: quem chama (modal) mostra o erro pro usuário
export async function updateUserProfile(
	userId: string,
	payload: UpdateProfilePayload,
): Promise<UserDTO> {
	const { data } = await api.put<UserDTO>(USER_ENDPOINTS.update(userId), payload)
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

	// o header manual evita o axios serializar o FormData como JSON (default da instância)
	const { data } = await api.post<UserDTO>(url, form, {
		headers: { "Content-Type": "multipart/form-data" },
	})
	return data
}

export async function loginService(data: LoginDTO): Promise<AuthResponseDTO> {
	const response = await api.post("/auth/login", data)
	return response.data
}

export async function signupService(data: RegisterDTO): Promise<AuthResponseDTO> {
	const response = await api.post<AuthResponseDTO>("/api/users", data)
	return response.data
}
