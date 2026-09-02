import Sidebar from "@/components/layout/Sidebar/Sidebar"
import Links from "@/components/shared/Links/Links"
import s from "./styles.module.scss"
import Image from "next/image"
import React from "react"
import ListsCard from "@/components/layout/ListsCard/ListsCard"
import GamesCard from "@/components/layout/GamesCard/GamesCard"
import Comments from "@/components/layout/Comments/Comments"

// interface UserProps {
//     isLogged?: boolean (compara user logado com userPage, se for o mesmo true)
//     username: string;
//     userBio: string;
//     profilePicUrl: string;
//     bannerPicUrl: string;
// }

const User = {
	username: "chimbinha",
	profilePicUrl:
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXefoDt5LxS9Vwl-WUv4HdLmhwkKRuyWw6OwmoNEfBNVfJKHTmm8u-8E0&s=10",
	bannerPicUrl: "https://wow.zamimg.com/uploads/screenshots/small/629956.jpg",
	userBio: "Essa é minha bio , eu gosto de jogos e batata.",
	comments: [
		{
			id: "1",
			content:
				"Looking started he up perhaps against. How remainder all additions get elsewhere resources. One missed shy wishes supply design answer formed. Prevent on present hastily passage an subject in be. Be happiness arranging so newspaper defective affection ye.",
		},
		{
			id: "2",
			content:
				"Looking started he up perhaps against. How remainder all additions get elsewhere resources. One missed shy wishes supply design answer formed. Prevent on present hastily passage an subject in be. Be happiness arranging so newspaper defective affection ye.;",
		},
		{
			id: "3",
			content:
				"Looking started he up perhaps against. How remainder all additions get elsewhere resources. One missed shy wishes supply design answer formed. Prevent on present hastily passage an subject in be. Be happiness arranging so newspaper defective affection ye.,.",
		},
	],
	// lists: [
	//     {
	//         id: '1',
	//         name: 'Quero Jogar',
	//         games: [
	//             {
	//                 id: '1',
	//                 name: 'reded',
	//             }
	//         ]
	//     },
	//     {
	//         id: '2',
	//         name: 'Jogando',
	//     },
	//     {
	//         id: '3',
	//         name: 'Joguei',
	//     },
	// ]
}

export default function UserPage() {
	return (
		<main className={s.container}>
			<Sidebar isLoggedIn />
			<section
				className={s.content}
				style={
					{
						"--banner-image": `url(${User.bannerPicUrl})`,
					} as React.CSSProperties
				}>
				<div className={s.userInfo}>
					<aside className={s.userInfoWrapper}>
						<div className={s.userProps}>
							<Image
								className={s.userPP}
								src={User.profilePicUrl}
								alt={`${User.username}'s profilePic`}
								width={125}
								height={125}
							/>
							<h5>@{User.username}</h5>
							<p>{User.userBio}</p>
							{/* isLogged ? (<Links edit profile>) : null */}
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
							Favoritos de <span>@{User.username}</span>
						</h5>
						<div className={s.favGamesWrapper}>
							<GamesCard
								name="Red Dead Redemption II"
								imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFe_GrvFbrvky2v1tK5xa-IkuQ46vRvH-Y0lwVuNt5lWiYKvRm84Yiz4Q&s=10"
								tags={[
									"Western",
									"Violent",
									"Simulator",
									"Horror",
								]}
							/>
							<GamesCard
								name="Clair Obscur: Expedition 33"
								imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFe_GrvFbrvky2v1tK5xa-IkuQ46vRvH-Y0lwVuNt5lWiYKvRm84Yiz4Q&s=10"
								tags={[
									"Western",
									"Violent",
									"Simulator",
									"Horror",
								]}
							/>
							<GamesCard
								name="Red Dead Redemption II"
								imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFe_GrvFbrvky2v1tK5xa-IkuQ46vRvH-Y0lwVuNt5lWiYKvRm84Yiz4Q&s=10"
								tags={[
									"Western",
									"Violent",
									"Simulator",
									"Horror",
								]}
							/>
							<GamesCard
								name="Red Dead Redemption II"
								imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFe_GrvFbrvky2v1tK5xa-IkuQ46vRvH-Y0lwVuNt5lWiYKvRm84Yiz4Q&s=10"
								tags={[
									"Western",
									"Violent",
									"Simulator",
									"Horror",
								]}
							/>
						</div>
					</aside>
				</div>
				<div className={s.userCommentsWrapper}>
					<h3>Comentários</h3>
					{User.comments.map(comment => (
						<Comments
							key={comment.id}
							user={User.username}
							userPP={User.profilePicUrl}
							content={comment.content}
						/>
					))}
				</div>
			</section>
		</main>
	)
}
