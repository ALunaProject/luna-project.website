"use client"

import { useEffect } from "react"
import { initAuth, useAuthStore } from "@/stores/authStore"

export { notifyProfileUpdated, PROFILE_UPDATED_EVENT } from "@/stores/authStore"

export function useAuth() {
	const status = useAuthStore(s => s.status)
	const user = useAuthStore(s => s.user)
	const logout = useAuthStore(s => s.logout)

	useEffect(() => {
		initAuth()
	}, [])

	return {
		isLoggedIn: status === "authenticated",
		// true até o sistema saber se há usuário logado ou não
		isLoading: status === "loading",
		user,
		logout,
	}
}
