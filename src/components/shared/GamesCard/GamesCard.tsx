import s from "./styles.module.scss"
import Image from "next/image"
import Link from "next/link"
import Tags from "@/components/ui/Tags/Tags"
import { GameData } from "@/types/gamesDTO"
import { STEAM_TAG_NAMES, STORE_ASSETS } from "@/utils/contants"
import CardActions from "@/components/shared/GamesCard/CardActions/GameCardActions"
import GameImage from "@/components/shared/GamesCard/CardActions/GameImage"

export default async function GamesCard(Game: GameData) {
	const tags = Game.tags
		.slice(0, 3)
		.map(t => STEAM_TAG_NAMES[t.tagid])
		.filter(Boolean)

	return (
		<Link href={`/games/${Game.appid}`} className={s.gamesCard}>
			<GameImage
				key={Game.appid}
				src={`${STORE_ASSETS}/steam/apps/${Game.appid}/${Game.assets.header}`}
				fallbackSrc={Game.tiny_image}
				alt={Game.name}
			/>
			<div className={s.gameProps}>
				<p>{Game.name}</p>
				<div className={s.tagsWrapper}>
					{tags.map((t, i) => (
						<Tags inCard key={i} label={t} />
					))}
				</div>
				<CardActions req={Game} />
			</div>
		</Link>
	)
}
