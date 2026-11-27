import { getPosts } from "@/services/postsService"
import s from "./styles.module.scss"
import Sidebar from "@/components/layout/Sidebar/Sidebar"
import PostActions from "@/components/layout/PostCreateModal/PostActions"
import PostCard from "@/components/shared/PostCard/PostCard"

export const dynamic = "force-dynamic"

export default async function CommunityPage() {
	const posts = await getPosts()

	return (
		<main className={s.container}>
			<Sidebar />
			<section className={s.content}>
				<PostActions />

				{posts === null ? (
					<p role="alert">
						Problema de conexão. Tente novamente em instantes.
					</p>
				) : posts.length === 0 ? (
					<p>Nenhuma postagem no momento.</p>
				) : (
					posts.map(post => (
						<PostCard key={post.id} post={post} isPostPage />
					))
				)}
			</section>
		</main>
	)
}
