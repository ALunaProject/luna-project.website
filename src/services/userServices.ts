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

export async function updateUserById(
	userId: string,
	username: string,
	userBio: string,
): Promise<UserDTO | null> {
	try {
		await getUserByID(userId)
		const res = await api.put(`/api/users/${userId}`, {
			username: username,
			userBio: userBio,
		})
		return res.data
	} catch (error) {
		console.error(error)
		return null
		// atualizar tratativa de erro dos services aqui, ou nao, n sei
	}
}

export async function loginService(data: LoginDTO): Promise<AuthResponseDTO> {
	const response = await api.post("/auth/login", data)
	return response.data
}

export async function signupService(data: RegisterDTO): Promise<AuthResponseDTO> {
	const response = await api.post<AuthResponseDTO>("/api/users", data)
	return response.data
}
