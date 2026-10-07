import axios from "axios"
import { API_BASE_URL, STORAGE_KEYS } from "@/utils/contants"

function getBaseUrl() {
	// url relativa (client)
	if (typeof window !== "undefined") {
		return process.env.NEXT_PUBLIC_API_URL ?? "/mocks"
	}

	// node (server) não sabe resolver caminho relativo
	return (
		process.env.NEXT_PUBLIC_API_URL ??
		`http://localhost:${process.env.PORT ?? 3000}/mocks`
	)
}

export const api = axios.create({
	// baseURL: getBaseUrl(),
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
})

// Rotas públicas: não mandam token (um JWT expirado/velho pode fazer o back recusar login/cadastro)
function isPublicRoute(url?: string, method?: string) {
	if (!url) return false
	if (url.startsWith("/auth/")) return true
	return url === "/api/users" && method?.toLowerCase() === "post"
}

// Anexa o JWT em toda requisição feita no browser (PUT/POST de edição de perfil precisam dele)
api.interceptors.request.use(config => {
	if (typeof window === "undefined") return config
	if (isPublicRoute(config.url, config.method)) return config

	const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})
