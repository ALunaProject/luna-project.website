import { notFound } from "next/navigation"
import Sidebar from "@/components/layout/Sidebar/Sidebar"
import s from "./styles.module.scss"
import React from "react"
import ListsCard from "@/components/shared/ListsCard/ListsCard"
import GamesCard from "@/components/shared/GamesCard/GamesCard"
import Comments from "@/components/shared/Comments/Comments"
import { getUserByUsername } from "@/services/userServices"
import { getAllComments } from "@/services/commentsServices"
import { DEFAULT_AVATAR, DEFAULT_BANNER } from "@/utils/contants"
import { getAllGames } from "@/services/gamesServices"
import EditingButton from "@/components/ui/EditinModal/EditingButton"
import EditableField from "@/components/ui/EditinModal/EditableField"
import InlineText from "@/components/ui/EditinModal/InlineText"
import ProfileAvatar from "@/components/ui/EditinModal/ProfileAvatar"
import ProfileSection from "@/components/ui/EditinModal/ProfileSection"
import { ProfileEditProvider } from "@/components/ui/EditinModal/ProfileEditContext"

export default async function UserPage({ params }: UserPageProps) {
	const { username: rawUsername } = await params
	// o Next entrega o param codificado ("Eric%20Moreira"); sem decodificar o usuário não é achado e cai no 404
	let username = rawUsername
	try {
		username = decodeURIComponent(rawUsername)
	} catch {}
	const user = await getUserByUsername(username)
	const games = await getAllGames()

	if (!user) {
		notFound()
	}

	const comments = await getAllComments()

	return (
		<ProfileEditProvider profileUser={user}>
		<main className={s.container}>
			<Sidebar />
			<ProfileSection
				className={s.content}
				bannerUrl={user.bannerUrl || DEFAULT_BANNER}>
				<EditableField field="banner" label="banner" placement="floating" />
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
								prefix="@"
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
							<EditingButton />
						</div>
						<section className={s.userLists}>
							<h4>Lists</h4>
							<div className={s.listsWrapper}>
								<ListsCard
									label="Lista de Desejos"
									games={[
										"game1",
										"game2",
										"game3",
										"game4",
										"game5",
										"game6",
										"game7",
										"game8",
									]}
								/>
								<ListsCard
									label="Jogando"
									games={[
										"game1",
										"game2",
										"game3",
										"game4",
										"game5",
										"game6",
										"game7",
										"game8",
									]}
								/>
								<ListsCard
									label="Já Joguei"
									games={[
										"game1",
										"game2",
										"game3",
										"game4",
										"game5",
										"game6",
										"game7",
										"game8",
									]}
								/>
								{/*    trocar por um map nas listas do usuário    */}
							</div>
						</section>
					</aside>
					<aside className={s.userFavGames}>
						<h5>
							Favoritos de <span>@{user.username}</span>
						</h5>
						<div className={s.favGamesWrapper}>
							{games.slice(0, 4).map((game, index) => (
								<GamesCard
									key={index}
									name={game.name}
									previewImg={game.previewImg}
									tags={game.tags}
									id={game.id}
								/>
							))}
							{/*logica de 4 jogos favs e listas de cada usuario, implementar só depois da integração do back, quando tiver hospedado com relacionamento e etc*/}
						</div>
					</aside>
				</div>
				<div className={s.userCommentsWrapper}>
					<h3>Comentários</h3>
					{comments.map(comment => (
						<Comments
							key={comment.id}
							content={comment.content}
							id={comment.id}
							userId={comment.userId}
						/>
					))}
				</div>
			</ProfileSection>
		</main>
		</ProfileEditProvider>
	)
}
