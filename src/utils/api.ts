import axios from "axios"
import { API_BASE_URL } from "@/utils/contants"

export const api = axios.create({
	// baseURL: getBaseUrl(),
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
})
