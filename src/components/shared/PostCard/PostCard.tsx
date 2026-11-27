import Link from "next/link"
import s from "./styles.module.scss"
import UserProfile from "@/components/shared/UserProfile/UserProfile"
import Tags from "@/components/ui/Tags/Tags"
import { PostCardProps } from "@/types/postsDTO"
import { DEFAULT_AVATAR } from "@/utils/contants"

export default function PostCard({ post, isPostPage = false }: PostCardProps) {
	const visibleTags = isPostPage ? post.tags?.slice(0, 3) : post.tags
	const hiddenTagCount = Math.max((post.tags?.length ?? 0) - 3, 0)

	return (
		<article
			className={`${s.postContainer} ${isPostPage ? "" : s.detailPost}`}>
			{isPostPage && (
				<Link
					className={s.cardLink}
					href={`/community/${post.id}`}
					aria-label={`Abrir publicação de ${post.author?.username ?? "Usuário"}`}
				/>
			)}
			<div className={s.profileContainer}>
				{post.author ? (
					<UserProfile
						className={s.userProfile}
						username={post.author.username}
						userPP={post.author.profilePicUrl || DEFAULT_AVATAR}
					/>
				) : (
					<span className={s.profileName}>Usuário</span>
				)}

				<div className={s.tagsContainer}>
					{visibleTags?.map(tag => (
						<Tags key={tag.id} label={tag.name} inCard />
					))}
					{isPostPage && hiddenTagCount > 0 && (
						<span
							className={s.extraTags}
							aria-label={`${hiddenTagCount} tags a mais`}>
							+{hiddenTagCount}
						</span>
					)}
				</div>
			</div>

			<div className={s.postContent}>
				<p className={s.contentText}>{post.content}</p>
			</div>
		</article>
	)
}
