import s from "./styles.module.scss"
import Image from "next/image"
import Link from "next/link"
import Tags from "@/components/ui/Tags/Tags"
import {GamesDTO, StoreItem} from "@/types/gamesDTO";
import {DEFAULT_AVATAR, DEFAULT_BANNER} from "@/utils/contants";

export default function GamesCard(Game: StoreItem) {
	return (
		<Link href={`games/${Game.id}`} className={s.gamesCard}>
			<Image
				// src={Game.previewImg || DEFAULT_BANNER}
				src={DEFAULT_BANNER}
				alt={`${Game.name}preview-image`}
				width={293.25}
				height={150}
			/>
			<div className={s.gameProps}>
				<p>{Game.name}</p>
				<div className={s.tagsWrapper}>
					{/*{Game.tags.map(tag => (*/}
					{/*	<Tags key={tag} label={tag} />*/}
					{/*))}*/}
					<Tags label={"banana"} />
				</div>
			</div>
		</Link>
	);
}
