"use client"

import s from "@/components/shared/GamesCard/styles.module.scss"
import Button from "@/components/ui/Button/Button"

export default function GameCardActions() {
	return (
		<div className={s.buttonsWrapper}>
			<Button
				onClick={e => {
					e.preventDefault()
					e.stopPropagation()
					console.log("clicked")
				}}
				icon="PlayAddIcon"
			/>

			<Button
				onClick={e => {
					e.preventDefault()
					e.stopPropagation()
					console.log("clicked")
				}}
				icon="PlayCheckIcon"
			/>

			<Button
				onClick={e => {
					e.preventDefault()
					e.stopPropagation()
					console.log("clicked")
				}}
				icon="PlayWishIcon"
			/>

			<Button
				onClick={e => {
					e.preventDefault()
					e.stopPropagation()
					console.log("clicked")
				}}
				icon="AddIcon"
			/>
		</div>
	)
}
