import { notFound } from "next/navigation"
import Sidebar from "@/components/layout/Sidebar/Sidebar"
import s from "./styles.module.scss"
import Image from "next/image"
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
import { ProfileEditProvider } from "@/components/ui/EditinModal/ProfileEditContext"

export default async function UserPage({ params }: UserPageProps) {
	const { username: rawUsername } = await params
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
			<section
				className={s.content}
				style={
					{
						"--banner-image": `url(${user.bannerUrl || DEFAULT_BANNER})`,
					} as React.CSSProperties
				}>
				<EditableField field="banner" label="banner" placement="floating" />
				<div className={s.userInfo}>
					<aside className={s.userInfoWrapper}>
						<div className={s.userProps}>
							<EditableField field="avatar" label="foto" placement="corner">
								<Image
									className={s.userPP}
									src={user.profilePicUrl || DEFAULT_AVATAR}
									alt={`${user.username}'s profilePic`}
									width={125}
									height={125}
								/>
							</EditableField>
							<EditableField field="username" label="username">
								<h5>@{user.username}</h5>
							</EditableField>
							<EditableField field="bio" label="descrição">
								<p>{user.bio}</p>
							</EditableField>
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
			</section>
		</main>
		</ProfileEditProvider>
	)
}
