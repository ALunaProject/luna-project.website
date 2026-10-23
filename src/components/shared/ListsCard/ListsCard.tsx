"use client"

import s from "./styles.module.scss"
import Image from "next/image"
import Link from "next/link"
import { ListsDTO } from "@/types/UserLIstsDTO";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button/Button";

interface EditingButtonProps {
	profileUsername: string
	List: ListsDTO,

}

export default function ListsCard({List, profileUsername}: EditingButtonProps) {
	const {isLoggedIn, user} = useAuth()

	return (
		<div className={s.listCard}>
			<h6>{List.name}</h6>
			<div className={s.gamesWrapper}>
				{List.games.map(game => (
					<Link key={game.appid} href={`../../games/${game.appid}`}>
						<Image
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXefoDt5LxS9Vwl-WUv4HdLmhwkKRuyWw6OwmoNEfBNVfJKHTmm8u-8E0&s=10"
							alt={`${game} preview`}
							width={51}
							height={51}
						/>
					{/*	back tem que guardar appId e alguma imagem do jogo, pra colocar nesses cards!!*/}
					</Link>
				))} {!isLoggedIn || !user || user.username !== profileUsername ? null : <Button icon={"AddIcon"}/>}
			</div>
		</div>
	)
}
