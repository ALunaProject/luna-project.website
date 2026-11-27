"use client"

import { ComponentProps, useState } from "react"
import { ListsDTO } from "@/types/UserLIstsDTO"
import Button from "@/components/ui/Button/Button"
import UserListsModal, { FavoritesOption } from "@/components/layout/ListsWrapper/Modals/UserListsModal"

interface UserListsButtonProps {
	lists: ListsDTO[]
	loading?: boolean
	label?: string
	icon?: ComponentProps<typeof Button>["icon"]
	ariaLabel?: string
	className?: string
	onListsChange?: () => void
	canCreate?: boolean
	onAddToList?: (list: ListsDTO) => void | Promise<void>
	isGameInList?: (list: ListsDTO) => boolean
	favorites?: FavoritesOption
}

export default function UserListsButton({
											lists,
											loading,
											label,
											icon,
											ariaLabel,
											onListsChange,
											canCreate,
											onAddToList,
											isGameInList,
											favorites
										}: UserListsButtonProps) {
	const [modalOpen, setModalOpen] = useState(false)

	return (
		<>
			<Button
				type="button"
				label={label ?? (icon ? undefined : "Ver listas")}
				icon={icon}
				aria-label={ariaLabel}
				onClick={e => {
					// may live inside a <Link> (GamesCard)
					e.preventDefault()
					e.stopPropagation()
					setModalOpen(true)
				}}
			/>
			<UserListsModal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				lists={lists}
				loading={loading}
				onListsChange={onListsChange}
				canCreate={canCreate}
				onAddToList={onAddToList}
				isGameInList={isGameInList}
				favorites={favorites}
			/>
		</>
	)
}