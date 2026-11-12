'use client'

import s from "./styles.module.scss"
import { UsePostModalProps } from "@/types/postsDTO"
import { useDialog } from "@/hooks/useDialog"
import { useEffect, useId, useState } from "react"
import usePostModal from "@/hooks/usePostModal"
import Button from "@/components/ui/Button/Button"
import TagSelector from "@/components/ui/TagSelector/TagSelector"

export default function PostCreateModal(props: UsePostModalProps) {
    const { open, onClose } = props
    const inputId = useId()
    const titleId = useId()
    const descriptionId = useId()
    const dialogRef = useDialog(open)

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    const {
        content,
        setContent,
        tagIds,
        setTagIds,
        loading,
        error,
        handleSubmit
    } = usePostModal(props)

    if (!mounted) return null


    return (
        <dialog
            ref={dialogRef}
            className={s.dialog}
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            onClose={onClose}
            onClick={e => {
                e.stopPropagation()
                if (e.target === e.currentTarget) onClose()
            }}>
            <div className={s.content}>
                <header className={s.header}>
                    <h2 className={s.title} id={titleId}>Fazer um post</h2>
                    <p id={descriptionId}>Compartilhe uma ideia, dúvida ou recomendação com a comunidade.</p>
                </header>

                <form className={s.section} onSubmit={handleSubmit}>
                    <label htmlFor={inputId}>Sua publicação</label>
                    <input
                        className={s.postInput}
                        id={inputId}
                        type="text"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        maxLength={250}
                        placeholder={"O que você quer compartilhar?"}
                        autoFocus
                        disabled={loading}
                    />
                    <TagSelector
                        value={tagIds}
                        onChange={setTagIds}
                        disabled={loading}
                    />
                    <div className={s.actions}>
                        <Button
                            label="Cancelar"
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                        />
                        <Button
                            label={
                                loading
                                    ? "Publicando..."
                                    : "Publicar post"
                            }
                            type="submit"
                            disabled={loading}
                        />
                    </div>
                </form>
                {error && (
                    <p className={s.error} role="alert">
                        {error}
                    </p>
                )}
            </div>
        </dialog>
    )
}
