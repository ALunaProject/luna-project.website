import Link from "next/link"
import s from "@/components/layout/RatingSection/styles.module.scss"
import { ExportIcon, SteamIcon } from "@/assets/icons/LinksIcons"

interface BuyLinkProps {
	price: string
	source: string
}

export default function BuyLink({ price, source }: BuyLinkProps) {
	return (
		<a href={source} target="_blank" className={s.buyLink}>
			<div className={s.platformPrice}>
				<SteamIcon />
				<span className={s.price}>{price}</span>
			</div>
			<ExportIcon />
		</a>
	)
}
