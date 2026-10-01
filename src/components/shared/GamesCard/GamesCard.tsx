import s from "./styles.module.scss"
import Image from "next/image"
import Link from "next/link"
import Tags from "@/components/ui/Tags/Tags"
import { DEFAULT_BANNER } from "@/utils/contants"
import { GameData } from "@/types/gamesDTO"
import { getGameDetails } from "@/services/gamesServices"
import Button from "@/components/ui/Button/Button"

export default async function GamesCard(Game: GameData) {
	const game = await getGameDetails(Game.id)

	return (
		<Link href={`games/${Game.id}`} className={s.gamesCard}>
			<Image
				src={game?.header_image || DEFAULT_BANNER}
				alt={`${Game.name}preview-image`}
				width={321}
				height={150}
			/>
			<div className={s.gameProps}>
				<p>{Game.name}</p>
				<div className={s.tagsWrapper}>
					{game?.genres?.slice(0, 2).map(g => (
						<Tags key={g.id} label={g.description} />
					))}
				</div>
				<div className={s.buttonsWrapper}>
					<Button label="Adicionar ao Perfil" />
					<Button icon="AddIcon" />
				</div>
			</div>
		</Link>
	)
}
