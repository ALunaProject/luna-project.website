"use client"

import { useCallback, useEffect, useState } from "react"
import { STORAGE_KEYS } from "@/utils/contants"
import { getUserByUsername } from "@/services/userServices"

export const PROFILE_UPDATED_EVENT = "luna:profile-updated"

export function notifyProfileUpdated() {
	window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT))
}

export function useAuth() {
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
	const [user, setUser] = useState<UserDTO | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const loadUser = useCallback(() => {
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

	useEffect(() => {
		loadUser()

		window.addEventListener(PROFILE_UPDATED_EVENT, loadUser)
		return () => window.removeEventListener(PROFILE_UPDATED_EVENT, loadUser)
	}, [loadUser])

	return { isLoggedIn, isLoading, user }
}
