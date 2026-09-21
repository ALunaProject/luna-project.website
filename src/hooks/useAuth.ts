"use client"

import { useEffect, useState } from "react"
import { STORAGE_KEYS } from "@/utils/contants"
import { getUserByUsername } from "@/services/userServices"

export function useAuth() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
	const [user, setUser] = useState<UserDTO | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
		const username = localStorage.getItem(STORAGE_KEYS.USER)

		if (!token || !username) {
			setIsLoggedIn(false)
			setIsLoading(false)
			return
		}

		setIsLoggedIn(true)

		getUserByUsername(username)
			.then(setUser)
			.finally(() => setIsLoading(false))
	}, [])

	return { isLoggedIn, isLoading, user }
}
