'use client'

import s from "@/components/layout/ListsWrapper/styles.module.scss"
import {UsePostModalProps} from "@/types/postsDTO";
import {useDialog} from "@/hooks/useDialog";
import {useEffect, useId, useState} from "react";
import {createPost} from "@/services/postsService";
import usePostModal from "@/hooks/usePostModal";
import {useAuth} from "@/hooks/useAuth";
import Button from "@/components/ui/Button/Button";
import TagSelector from "@/components/ui/TagSelector/TagSelector";

export default function PostCreateModal(props: UsePostModalProps) {
    const { open, onClose } = props
    const inputId = useId()
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
            onClose={onClose}
            onClick={e => {
                e.stopPropagation()
                if (e.target === e.currentTarget) onClose()
            }}>
            <div className={s.content}>
                <h2>{"Crie novo post"}</h2>

                <form className={s.section} onSubmit={handleSubmit}>
                    <label htmlFor={inputId}>Escreva sua publicação</label>
                    <input
                        id={inputId}
                        type="text"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        maxLength={250}
                        placeholder={"Escreva aqui"}
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
                                    ? "Salvando..."
                                    : "Publicar"
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
