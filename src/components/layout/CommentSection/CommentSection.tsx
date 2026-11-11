import s from "./styles.module.scss"
import Comments from "@/components/shared/Comments/Comments"
import { getAllTargetComments } from "@/services/commentsServices"
import { CommentForm } from "@/components/layout/CommentSection/CommentForm"
import { CommentSectionProps } from "@/types/commentsDTO"

export default async function CommentSection(comment: CommentSectionProps) {
	const comments = await getAllTargetComments(comment.type, comment.targetId)

	return (
		<section className={s.commentsContainer}>
			<h3>Comentários</h3>
			<CommentForm {...comment} />
			{comments ? (
				comments.map(comment => (
					<Comments key={comment.id} {...comment} />
				))
			) : (
				<h4>Sem comentários no momento</h4>
			)}
		</section>
	)
}
