import s from "./styles.module.scss"
import RateCard from "@/components/layout/RatingSection/RateCard"
import { getAppReviews } from "@/services/gamesServices"
import StarIcon from "@/assets/icons/StarIcon"
import BuyLink from "@/components/layout/RatingSection/BuyLink"
import { GameDetailsData } from "@/types/gamesDTO"
import { useAuth } from "@/hooks/useAuth"

export interface RatingSectionProps {
	appId: string
	game: GameDetailsData
}

export default async function RatingSection({
	appId,
	game,
}: RatingSectionProps) {
	const app = game

	const gameReviews = await getAppReviews(appId)

	function calcSteamRating() {
		if (gameReviews?.query_summary.total_reviews === 0) return null
		const res =
			((gameReviews?.query_summary.total_positive || 0) * 10) /
			(gameReviews?.query_summary.total_reviews || 0)
		return Number(res.toFixed(1))
	}

	const starCount = ((calcSteamRating() ?? 0) / 10) * 5

	return (
		<section className={s.ratingSection}>
			<div className={s.ratingContent}>
				<div className={s.overallRate}>
					<h2>{calcSteamRating()}</h2>
					<div className={s.stars}>
						{Array.from({ length: 5 }).map((_, index) => {
							let fillPercentage = 0

							if (starCount - index >= 1) {
								fillPercentage = 100
							} else if (starCount - index > 0) {
								fillPercentage = (starCount - index) * 100
							}

							return (
								<StarIcon
									key={index}
									fillPercentage={fillPercentage}
								/>
							)
						})}
					</div>
					<span>AVALIAÇÕES GERAL</span>
				</div>

				<div className={s.otherRatings}>
					<span>Outros:</span>
					<div className={s.rateList}>
						<RateCard overallRate={6.7} source="Pessoal" />
						{/*  Quando criarem o Rating na API da luna, trocar isso aqui por um ternario:
                           notRated? "Avaliar Jogo" : <RateCard overallRate={notaDoUser} source="Pessoal"> */}
					</div>
				</div>
			</div>
			<div className={s.buySection}>
				<h3>Onde Comprar?</h3>
				<div className={s.buyGrid}>
					<BuyLink
						price={app.price_overview.final_formatted}
						source={`https://store.steampowered.com/app/${appId}`}
					/>
				</div>
			</div>
		</section>
	)
}
