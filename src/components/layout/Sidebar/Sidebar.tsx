"use client"

import { usePathname, useRouter } from "next/navigation"
import { useCallback, useEffect, useId, useRef, useState } from "react"
import LunaLogo from "@/assets/icons/LunaLogo"
import Links from "@/components/shared/Links/Links"
import UserProfile from "@/components/shared/UserProfile/UserProfile"
import Button from "@/components/ui/Button/Button"
import { useAuth } from "@/hooks/useAuth"
import { DEFAULT_AVATAR } from "@/utils/contants"
import s from "./styles.module.scss"
import { LogoutIcon } from "@/assets/icons/LinksIcons";

const CloseIcon = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} fill="none">
		<path
			stroke="#F6F6F9"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M20 36.667c9.167 0 16.667-7.5 16.667-16.667 0-9.167-7.5-16.667-16.667-16.667-9.167 0-16.667 7.5-16.667 16.667 0 9.167 7.5 16.667 16.667 16.667ZM15.283 24.717l9.434-9.434M24.717 24.717l-9.434-9.434"
		/>
	</svg>
)

export default function Sidebar() {
	const {isLoggedIn, user, logout} = useAuth()
	const router = useRouter()
	const pathname = usePathname()
	const drawerId = useId()

	const [open, setOpen] = useState(false)
	const [lastPathname, setLastPathname] = useState(pathname)

	const triggerRef = useRef<HTMLButtonElement>(null)
	const closeRef = useRef<HTMLButtonElement>(null)
	const asideRef = useRef<HTMLElement>(null)

	if (pathname !== lastPathname) {
		setLastPathname(pathname)
		setOpen(false)
	}

	const close = useCallback(() => {
		setOpen(false)
		triggerRef.current?.focus()
	}, [])

	useEffect(() => {
		if (open) closeRef.current?.focus({preventScroll: true})
	}, [open])

	useEffect(() => {
		if (!open) return
		const aside = asideRef.current

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") close()
		}
		const onClick = (e: MouseEvent) => {
			if (e.target instanceof Element && e.target.closest("a"))
				setOpen(false)
		}

		document.addEventListener("keydown", onKeyDown)
		aside?.addEventListener("click", onClick)
		return () => {
			document.removeEventListener("keydown", onKeyDown)
			aside?.removeEventListener("click", onClick)
		}
	}, [open, close])

	const handleLogout = useCallback(() => {
		logout()
		window.location.reload()
	}, [logout])

	return (
		<>
			<button
				type="button"
				ref={triggerRef}
				className={s.trigger}
				onClick={() => setOpen(true)}
				aria-label="Abrir menu"
				aria-expanded={open}
				aria-controls={drawerId}>
				<LogoutIcon/>
			</button>

			<div
				className={s.backdrop}
				data-open={open}
				onClick={close}
				aria-hidden="true"
			/>

			<aside
				id={drawerId}
				ref={asideRef}
				className={s.sidebarContainer}
				data-open={open}
				aria-label="Navegação principal">
				<LunaLogo/>
				<nav className={s.linksWrapper}>
					<Links href="/news" label="Notícias" icon="NewsIcon"/>
					<Links href="/games" label="Jogos" icon="GamesIcon"/>
					<Links
						href="/community"
						label="Comunidade"
						icon="CommunityIcon"
					/>
				</nav>
				{isLoggedIn && user ? (
					<div className={s.loggedUser}>
						<Button
							type="button"
							onClick={handleLogout}
							aria-label="Sair da conta"
							icon="LogoutIcon"
							label="Sair"
						/>
						<UserProfile
							className={s.userProfile}
							username={user.username}
							userPP={user.profilePicUrl || DEFAULT_AVATAR}
						/>
					</div>
				) : (
					<Button onClick={() => router.push("/login")} label="Entrar"/>
				)}

				<button
					type="button"
					ref={closeRef}
					className={s.closeBtn}
					onClick={close}
					aria-label="Fechar menu">
					<CloseIcon/>
				</button>
			</aside>
		</>
	)
}