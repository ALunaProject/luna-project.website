import axios from "axios"
import {API_BASE_URL} from "@/utils/contants";

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
    }
})
