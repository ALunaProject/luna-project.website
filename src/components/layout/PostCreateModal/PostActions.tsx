"use client"

import { useState } from "react"
import { AddIcon } from "@/assets/icons/LinksIcons"
import PostCreateModal from "@/components/layout/PostCreateModal"
import { useAuth } from "@/hooks/useAuth"
import s from "./PostActions.module.scss"

export default function PostActions() {
	const [modalOpen, setModalOpen] = useState(false)
	const { user } = useAuth()
	if (!user) return null

	return (
		<>
			<button
				className={s.trigger}
				type="button"
				onClick={() => setModalOpen(true)}
				aria-haspopup="dialog"
				aria-expanded={modalOpen}>
				<span className={s.icon} aria-hidden="true">
					<AddIcon />
				</span>
				<span>Fazer um post</span>
			</button>
			<PostCreateModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
			/>
		</>
	)
}
