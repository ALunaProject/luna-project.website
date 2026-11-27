"use client"

import { ReactNode, useState } from "react"
import { useRouter } from "next/navigation"
import { useProfileEdit } from "@/components/ui/EditinModal/ProfileEditContext"
import { STORAGE_KEYS } from "@/utils/contants"
import s from "./styles.module.scss"
import { removeFavoriteGame } from "@/services/userServices";
import { DeleteCheckIcon } from "@/assets/icons/LinksIcons";

interface FavGameItemProps {
	appId: number | string
	gameName?: string
	children: ReactNode
}

export default function FavGameItem({
										appId,
										gameName,
										children,
									}: FavGameItemProps) {
	const router = useRouter()
	const { canEdit, isEditing } = useProfileEdit()
	const [removing, setRemoving] = useState(false)

	async function handleRemove() {
		const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
		if (!token) return console.error("No token")

		setRemoving(true)
		const updated = await removeFavoriteGame(String(appId), token)
		setRemoving(false)

		if (updated) {
			router.refresh()
		} else {
			alert("Não foi possível remover dos favoritos.")
		}
	}

	return (
		<div className={s.favItem}>
			{children}

			{canEdit && isEditing && (
				<button
					type="button"
					className={s.removeBtn}
					aria-label={`Remover ${gameName ?? "jogo"} dos favoritos`}
					onClick={handleRemove}
					disabled={removing}
					>
					{removing ? "..." : <DeleteCheckIcon />}
				</button>
			)}
		</div>
	)
}