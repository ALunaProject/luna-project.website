import { create } from "zustand"
import { getUserByUsername } from "@/services/userServices"
import { STORAGE_KEYS } from "@/utils/contants"

export const PROFILE_UPDATED_EVENT = "luna:profile-updated"

export function notifyProfileUpdated() {
	window.dispatchEvent(new Event(PROFILE_UPDATED_EVENT))
}

// loading -> ainda não sabemos (primeira render / buscando o usuário)
// authenticated -> token válido e usuário carregado
// unauthenticated -> sem token, ou o back não devolveu o usuário
export type AuthStatus = "loading" | "authenticated" | "unauthenticated"

interface LoadOptions {
	force?: boolean
}

interface AuthState {
	status: AuthStatus
	user: UserDTO | null
	load: (options?: LoadOptions) => Promise<void>
	logout: () => void
}

// Uma única requisição em andamento, compartilhada por todos os componentes
let inflight: Promise<void> | null = null
// Sobe a cada logout: descarta respostas de requisições iniciadas antes dele
let session = 0

export const useAuthStore = create<AuthState>((set, get) => ({
	status: "loading",
	user: null,

	load: async ({ force = false } = {}) => {
		if (typeof window === "undefined") return

		const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
		const username = localStorage.getItem(STORAGE_KEYS.USER)

		if (!token || !username) {
			set({ status: "unauthenticated", user: null })
			return
		}

		const { status, user } = get()
		if (!force && status === "authenticated" && user?.username === username)
			return

		if (inflight) return inflight

		// vindo de "deslogado" (ex: acabou de logar): volta pro loading em vez de piscar "Entrar"
		if (status === "unauthenticated") set({ status: "loading" })

		const currentSession = session
		inflight = getUserByUsername(username)
			.then(found => {
				if (currentSession !== session) return
				set({
					user: found,
					status: found ? "authenticated" : "unauthenticated",
				})
			})
			.catch(() => {
				if (currentSession !== session) return
				set({ user: null, status: "unauthenticated" })
			})
			.finally(() => {
				inflight = null
			})

		return inflight
	},

	logout: () => {
		session += 1
		inflight = null
		localStorage.removeItem(STORAGE_KEYS.TOKEN)
		localStorage.removeItem(STORAGE_KEYS.USER)
		set({ user: null, status: "unauthenticated" })
	},
}))

// Listener global registrado uma vez só (antes, cada useAuth registrava o seu)
let listening = false

export function initAuth() {
	if (typeof window === "undefined") return

	if (!listening) {
		listening = true
		window.addEventListener(PROFILE_UPDATED_EVENT, () => {
			void useAuthStore.getState().load({ force: true })
		})
	}

	void useAuthStore.getState().load()
}
