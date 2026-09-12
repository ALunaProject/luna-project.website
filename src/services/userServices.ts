import { api } from "@/utils/api"
import {AuthResponseDTO, LoginDTO, RegisterDTO} from "@/types/user.types";

export async function getUserByUsername(
	username: string,
): Promise<UserDTO | null> {
	try {
		const { data } = await api.get<UserDTO[]>("/users.json")
		return data.find(u => u.username === username) ?? null
	} catch (error) {
		console.error("Falha ao buscar usuário:", error)
		return null
	}
}

export async function getUserByID(userId: string): Promise<UserDTO | null> {
    try {
        const { data } = await api.get<UserDTO[]>("/users.json")
        return data.find(u => u.id === userId) ?? null
    } catch (error) {
        console.error(error)
        return null
    }
}
// sinceramente n sei pq to fazendo isso, quando vier o back troca pelas reqs sla


export async function loginService(data: LoginDTO): Promise<AuthResponseDTO> {
    const response = await api.post("/auth/login", data)
    return response.data
}

export async function signupService(data: RegisterDTO): Promise<AuthResponseDTO> {
    const response = await api.post<AuthResponseDTO>("/api/users", data)
    return response.data
}
