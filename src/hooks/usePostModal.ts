import {UsePostModalProps} from "@/types/postsDTO";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {STORAGE_KEYS} from "@/utils/contants";
import {getErrorMessage} from "@/utils/getErrorMessage";
import {createCustomList} from "@/services/userListsServices";
import {createPost} from "@/services/postsService";

export default function usePostModal(props: UsePostModalProps) {
    const { open, onClose } = props
    const router = useRouter()



    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (open) {
            setContent("")
            setError(null)
        }
    }, [open])

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
            onClose()
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
            token => createPost({content: trimmed}, token),
            "Não foi possível criar a lista",
        )
    }

    return {
        content,
        setContent,
        loading,
        error,
        handleSubmit
    }
}