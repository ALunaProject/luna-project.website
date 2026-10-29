import { notFound } from "next/navigation"
import Sidebar from "@/components/layout/Sidebar/Sidebar"
import s from "./styles.module.scss"
import React from "react"
import { getUserByUsername } from "@/services/userServices"
import { DEFAULT_AVATAR, DEFAULT_BANNER } from "@/utils/contants"
import EditingButton from "@/components/ui/EditinModal/EditingButton"
import EditableField from "@/components/ui/EditinModal/EditableField"
import InlineText from "@/components/ui/EditinModal/InlineText"
import ProfileAvatar from "@/components/ui/EditinModal/ProfileAvatar"
import ProfileBanner from "@/components/ui/EditinModal/ProfileBanner"
import { ProfileEditProvider } from "@/components/ui/EditinModal/ProfileEditContext"
import ListsWrapper from "@/components/layout/ListsWrapper/ListsWrapper";
import CommentSection from "@/components/layout/CommentSection/CommentSection";

export default async function UserPage({params}: UserPageProps) {
	const {username: rawUsername} = await params
	// o Next entrega o param codificado ("Eric%20Moreira"); sem decodificar o usuário não é achado e cai no 404
	let username: string
	try {
		username = decodeURIComponent(rawUsername)
	} catch {
		notFound()
	}
	const user = await getUserByUsername(username)
	// const favGames = lista custom com nome de favoritos

	if (!user) {
		notFound()
	}

	// const comments = await getAllComments()

	return (
		<ProfileEditProvider profileUser={user}>
			<main className={s.container}>
				<Sidebar/>
				<section className={s.content}>
					<ProfileBanner bannerUrl={user.bannerUrl || DEFAULT_BANNER}/>
					<div className={s.userInfo}>
						<aside className={s.userInfoWrapper}>
							<div className={s.userProps}>
								<EditableField field="avatar" label="foto" placement="corner">
									<ProfileAvatar
										className={s.userPP}
										src={user.profilePicUrl || DEFAULT_AVATAR}
										alt={`${user.username}'s profilePic`}
									/>
								</EditableField>
								<InlineText
									field="username"
									as="h5"
									value={user.username}
									maxLength={30}
								/>
								<InlineText
									field="bio"
									as="p"
									multiline
									value={user.bio ?? ""}
									maxLength={255}
									placeholder="sem descrição, ainda"
								/>
								<EditingButton/>
							</div>
							<section className={s.userLists}>
								<h4>Lists</h4>
								<ListsWrapper userId={user.id} username={user.username}/>
							</section>
						</aside>
						<aside className={s.userFavGames}>
							<h5>
								Favoritos de <span>{user.username}</span>
							</h5>
							<div className={s.favGamesWrapper}>

							</div>
						</aside>
					</div>
					<CommentSection/>
				</section>
			</main>
		</ProfileEditProvider>
	)
}
