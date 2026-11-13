import { PostPageResponse } from "@/types/postsDTO"
import { getPostById } from "@/services/postsService"
import { notFound } from "next/navigation"
import s from "./styles.module.scss"
import CommentSection from "@/components/layout/CommentSection/CommentSection"
import Sidebar from "@/components/layout/Sidebar/Sidebar"
import PostCard from "@/components/shared/PostCard/PostCard"
import Banner from "@/components/ui/Banner/Banner"
import { DEFAULT_BANNER } from "@/utils/contants"

export default async function PostPage({ params }: PostPageResponse) {
	const { postId } = await params
	const post = await getPostById(postId)
	if (!post) return notFound()

	return (
		<main className={s.page}>
			<Sidebar />
			<Banner src={DEFAULT_BANNER} height={320} />
			<div className={s.content}>
				<PostCard post={post} />
				<CommentSection targetId={postId} type="post" />
			</div>
		</main>
	)
}
