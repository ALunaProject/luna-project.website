"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import s from "./styles.module.scss"
import RateCard from "@/components/layout/RatingSection/RateCard"
import { useAuth } from "@/hooks/useAuth"
import { RatingResponse } from "@/types/ratingDTO"
import {
	getMyGameRating,
	removeGameRating,
	saveGameRating,
} from "@/services/ratingServices"
import RatingModal from "@/components/layout/RatingSection/RatingModal"
import Button from "@/components/ui/Button/Button"

interface UserRatingProps {
	appId: string
	gameName?: string
}

export default function UserRating({ appId, gameName }: UserRatingProps) {
	const auth = useAuth()
	const router = useRouter()
	const isLogged = Boolean(auth?.user)

	const [rating, setRating] = useState<RatingResponse | null>(null)
	const [loading, setLoading] = useState(true)
	const [modalOpen, setModalOpen] = useState(false)

	useEffect(() => {
		if (!isLogged) {
			setRating(null)
			setLoading(false)
			return
		}

		let ignore = false
		getMyGameRating(appId)
			.then(data => {
				if (!ignore) setRating(data)
			})
			.catch(() => {})
			.finally(() => {
				if (!ignore) setLoading(false)
			})

		return () => {
			ignore = true
		}
	}, [appId, isLogged])

	function handleAddClick() {
		if (!isLogged) {
			router.push("/login")
			return
		}
		setModalOpen(true)
	}

	async function handleSave(score: number) {
		const saved = await saveGameRating(appId, score)
		setRating(saved)
	}

	async function handleRemove() {
		await removeGameRating(appId)
		setRating(null)
	}

	if (loading) return <div className={s.skeleton} aria-hidden="true" />

	return (
		<>
			{rating ? (
				<div className={s.wrapper}>
					<RateCard overallRate={rating.score} source="Pessoal" />
					<Button
						type="button"
						className={s.editButton}
						onClick={() => setModalOpen(true)}
						label="Editar Nota"
					/>
				</div>
			) : (
				<Button
					type="button"
					className={s.addButton}
					onClick={handleAddClick}
					label="Adicione uma nota"
				/>
			)}

			{modalOpen && (
				<RatingModal
					gameName={gameName}
					initialScore={rating?.score ?? null}
					onClose={() => setModalOpen(false)}
					onSave={handleSave}
					onRemove={rating ? handleRemove : undefined}
				/>
			)}
		</>
	)
}
