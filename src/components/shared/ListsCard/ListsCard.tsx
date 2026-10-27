"use client"

import s from "./styles.module.scss"
import Image from "next/image"
import Link from "next/link"
import { ListsDTO } from "@/types/UserLIstsDTO";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button/Button";
import { STORE_ASSETS } from "@/utils/contants";


export default function ListsCard(List: ListsDTO) {
	return (
		<div className={s.listCard}>
			<h6>{List.name}</h6>
			<div className={s.gamesWrapper}>
				{List.games.map(game => (
					<Link key={game.appid} href={`../../games/${game.appid}`}>
						<Image
							src={`${STORE_ASSETS}/steam/apps/${game.appid}/${game.libraryCapsule}?t=1789251637)`}
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
