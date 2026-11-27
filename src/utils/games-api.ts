import axios from "axios"

export const gamesApi = axios.create({
	baseURL: "https://api.steampowered.com",
	headers: {
		"Content-Type": "application/json",
	},
})
export const gamesStoreApi = axios.create({
	baseURL: "https://store.steampowered.com",
	headers: { "Content-Type": "application/json" },
})
