import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { STORAGE_KEYS } from "@/utils/contants"
import { createCustomList, deleteList, renameList } from "@/services/userListsServices"
import { UseListModalProps } from "@/types/UserLIstsDTO";

export function useListModal(props: UseListModalProps) {
	const { open, onClose } = props
	const router = useRouter()

	const initialName = props.mode === "edit" ? props.listName : ""

	const [name, setName] = useState(initialName)
	const [loading, setLoading] = useState(false)
	const [confirmingDelete, setConfirmingDelete] = useState(false)
	const [error, setError] = useState<string | null>(null)

	// sempre que abrir, volta ao estado inicial
	useEffect(() => {
		if (open) {
			setName(initialName)
			setError(null)
			setConfirmingDelete(false)
		}
	}, [open, initialName])

	// executa uma ação autenticada e cuida de loading, erro e refresh
	async function run(
		action: (token: string) => Promise<unknown>,
		errorMessage: string
	) {
		const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
		if (!token) return setError("Você precisa estar logado")

		setLoading(true)
		setError(null)
		const result = await action(token)
		setLoading(false)

		if (!result) return setError(errorMessage)

		onClose()
		router.refresh()
	}

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const trimmed = name.trim()
		if (!trimmed) return setError("Dê um nome para a lista")

		if (props.mode === "create") {
			return run(
				(token) => createCustomList(token, { name: trimmed }),
				"Não foi possível criar a lista"
			)
		}

		const { listId, listName } = props
		if (trimmed === listName) return onClose() // nada mudou

		return run(
			(token) => renameList(listId, { name: trimmed }, token),
			"Não foi possível renomear a lista"
		)
	}

	async function handleDelete() {
		if (props.mode !== "edit") return
		const { listId } = props

		return run(
			(token) => deleteList(listId, token),
			"Não foi possível apagar a lista"
		)
	}

	return {
		name,
		setName,
		loading,
		error,
		confirmingDelete,
		setConfirmingDelete,
		handleSubmit,
		handleDelete,
	}
}