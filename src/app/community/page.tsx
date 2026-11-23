import s from "./styles.module.scss"
import Sidebar from "@/components/layout/Sidebar/Sidebar"
import { PostDto } from "@/types/postsDTO"
import { getPosts } from "@/services/postsService"
import PostCard from "@/components/shared/PostCard/PostCard"
import PostActions from "@/components/layout/PostCreateModal/PostActions"

export default async function CommunityPage() {
	const posts: PostDto[] | null = await getPosts()

	return (
		<main className={s.page}>
			<Sidebar />
			<section className={s.list}>
				<PostActions />
				{posts?.map((post: PostDto) => (
					<PostCard key={post.id} post={post} isPostPage />
				))}
			</section>
		</main>
	)
}
