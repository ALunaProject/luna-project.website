import axios from "axios"

export function getErrorMessage(error: unknown, fallback: string): string {
	if (axios.isAxiosError(error)) {
		const data = error.response?.data
		if (typeof data === "string" && data) return data
		if (data?.message) return data.message
	}
	return fallback
}