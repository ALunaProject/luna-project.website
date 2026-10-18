"use client"

import s from "./styles.module.scss"
import { UserIcon } from "@/assets/icons/LinksIcons"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"

interface RateCardProps {
	overallRate: number
	source: string
}

export default function RateCard({ overallRate, source }: RateCardProps) {
	const user = useAuth()

	return (
		<div className={s.rateCard}>
			<UserIcon />
			<Link
				href={`../${user?.user?.username ?? "/login"}`}
				className={s.rateWrapper}>
				<span className={s.score}>{overallRate}/10</span>
				<span className={s.label}>Aval. {source}</span>
			</Link>
		</div>
	)
}
