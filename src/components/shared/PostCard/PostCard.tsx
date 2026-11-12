import Link from "next/link"
import s from "./styles.module.scss"
import UserProfile from "@/components/shared/UserProfile/UserProfile"
import Tags from "@/components/ui/Tags/Tags"
import { PostCardProps } from "@/types/postsDTO"
import { DEFAULT_AVATAR } from "@/utils/contants"

export default function PostCard({ post, isPostPage = false }: PostCardProps) {
	return (
		<article className={s.postContainer}>
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
					{post.tags?.slice(0, 3).map(tag => (
						<Tags key={tag.id} label={tag.name} inCard />
					))}
					{post.tags && post.tags.length > 3 && (
						<span className={s.extraTags} aria-label={`${post.tags.length - 3} tags a mais`}>
							+{post.tags.length - 3}
						</span>
					)}
				</div>
			</div>

			<div className={s.postContent}>
				<p className={s.contentText}>{post.content}</p>
			</div>

			<footer className={s.footer}>
				<Link
					className={s.commentLink}
					href={isPostPage ? `/community/${post.id}#comments` : "#comments"}>
					<svg
						aria-hidden="true"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none">
						<path
							d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H7l-4 2v-9.5A7.5 7.5 0 0 1 10.5 4h2A7.5 7.5 0 0 1 20 11.5Z"
							stroke="currentColor"
							strokeWidth="1.6"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					Comentar
				</Link>
			</footer>
		</article>
	)
}
