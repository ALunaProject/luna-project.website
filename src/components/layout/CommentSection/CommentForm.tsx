"use client"

import s from "@/components/layout/CommentSection/styles.module.scss"
import React, { useEffect, useId, useState } from "react"
import Button from "@/components/ui/Button/Button"
import { STORAGE_KEYS } from "@/utils/contants"
import { useRouter } from "next/navigation"
import { getErrorMessage } from "@/utils/getErrorMessage"
import { createNewComment } from "@/services/commentsServices"
import { CommentSectionProps } from "@/types/commentsDTO"

export function CommentForm(props: CommentSectionProps) {
	const [content, setContent] = useState("")
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const inputId = useId()
	const router = useRouter()

	useEffect(() => {
		setContent("")
		setError(null)
	}, [])

	async function run(
		action: (token: string) => Promise<unknown>,
		errorMessage: string,
	) {
		const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
		if (!token) return setError("Você precisa estar logado")

		setLoading(true)
		setError(null)
		try {
			await action(token)
			router.refresh()
		} catch (err) {
			setError(getErrorMessage(err, errorMessage))
		} finally {
			setLoading(false)
		}
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const trimmed = content.trim()
		if (!trimmed) return setError("Content cannot be empty")

		return run(
			token =>
				createNewComment(
					props.type,
					props.targetId,
					{ content: trimmed },
					token,
				),
			"Não foi possível criar o comentário",
		)
	}

	return (
		<form className={s.createCommentSec} onSubmit={handleSubmit}>
			<label htmlFor={inputId}>Faça um comentário nessa página:</label>
			<input
				placeholder="Escreva aqui..."
				type="text"
				name="content"
				value={content}
				maxLength={1000}
				autoFocus
				onChange={e => setContent(e.target.value)}
			/>
			<Button
				label="Comentar"
				icon="ArrowIcon"
				type="submit"
				onClick={() => setContent(content)}
				disabled={loading}
			/>
		</form>
	)
}
