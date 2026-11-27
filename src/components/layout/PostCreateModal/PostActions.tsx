"use client"

import { useState } from "react"
import { AddIcon } from "@/assets/icons/LinksIcons"
import PostCreateModal from "@/components/layout/PostCreateModal"
import { useAuth } from "@/hooks/useAuth"
import Skeleton from "@/components/ui/skeleton/Skeleton"
import s from "./PostActions.module.scss"

export default function PostActions() {
	const [modalOpen, setModalOpen] = useState(false)
	const { user, isLoading } = useAuth()

	// reserva o espaço do botão enquanto descobre se há usuário logado
	if (isLoading) {
		return (
			<Skeleton
				width="47%"
				height={52}
				style={{ maxWidth: 550, alignSelf: "center", borderRadius: 8 }}
			/>
		)
	}

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
