import s from "./styles.module.scss"
import Image from "next/image"
import Link from "next/link"
import Tags from "@/components/ui/Tags/Tags"
import { GameData } from "@/types/gamesDTO"
import Button from "@/components/ui/Button/Button"
import { STEAM_TAG_NAMES } from "@/utils/contants"
import CardActions from "@/components/shared/GamesCard/CardActions/GameCardActions"

export default async function GamesCard(Game: GameData) {
	const tags = Game.tags
		.slice(0, 3)
		.map(t => STEAM_TAG_NAMES[t.tagid])
		.filter(Boolean)

	return (
		<Link href={`games/${Game.appid}`} className={s.gamesCard}>
			<Image
				src={`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${Game.appid}/${Game.assets.header}?t=1789251637)`}
				alt={`${Game.name}preview-image`}
				width={321}
				height={150}
				loading="eager"
			/>
			<div className={s.gameProps}>
				<p>{Game.name}</p>
				<div className={s.tagsWrapper}>
					{tags.map((t, i) => (
						<Tags inCard key={i} label={t} />
					))}
				</div>
				<CardActions />
			</div>
		</Link>
	)
}
