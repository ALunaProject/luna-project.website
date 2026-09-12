export const DEFAULT_AVATAR =
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwIoKBtBMERe4gtT1eueK4-5flQr0m6jH85-RXRDVHQQ&s"
export const DEFAULT_BANNER =
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTBGDdRCjkglWm9ueAyne1mhAiDPNMfqKVKATvnHK-lA&s"

export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

export const STORAGE_KEYS = {
    TOKEN: "@Luna:token",
    USER: "@Luna:user",
} as const
