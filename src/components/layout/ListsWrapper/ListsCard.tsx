"use client"

import s from "./styles.module.scss"
import Image from "next/image"
import Link from "next/link"
import { ListsDTO } from "@/types/UserLIstsDTO";
import { STORAGE_KEYS, STORE_ASSETS } from "@/utils/contants";
import { useProfileEdit } from "@/components/ui/EditinModal/ProfileEditContext";
import Button from "@/components/ui/Button/Button";
import { removeGameOnList } from "@/services/userListsServices";
import { useRouter } from "next/navigation";

function RemoveGame({id, appId}: {id: string, appId: string}) {
	const router = useRouter()
	const {canEdit, isEditing} = useProfileEdit()
	if (!canEdit || !isEditing) return null

	async function handleRemoveFromList() {
		const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
		if (!token) return console.error("No token")

		await removeGameOnList(id, appId, token)
		router.refresh()
	}

	return <Button
		className={s.removeListBtn}
		type="button"
		aria-label={`Remover jogo`}
		title={`Remover jogo`}
		icon="DeleteCheckIcon"
		onClick={(e) => {
			e.preventDefault()
			e.stopPropagation()
			handleRemoveFromList()
		}}/>
}

export default function ListsCard(List: ListsDTO) {
	return (
		<div className={s.listCard}>
			<h6>{List.name}</h6>
			<div className={s.gamesWrapper}>
				{List.games.map(game => (
					<Link key={game.appid} href={`../../games/${game.appid}`}>
						<RemoveGame id={List.id} appId={game.appid} />
						<Image
							src={`${STORE_ASSETS}/steam/apps/${game.appid}/${game.assets.library_capsule}?t=1789251637)`}
							alt={`Ícone de ${game.appid}`}
							width={50}
							height={50}
							style={{objectFit: "cover", objectPosition: "top"}}
						/>
					</Link>
				))}
			</div>
		</div>
	)
}
