import axios from "axios"

export const gamesApi = axios.create({
    baseURL: "https://api.steampowered.com",
    headers: {
        "Content-Type": "application/json",
    },
})
