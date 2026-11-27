import { Suspense } from "react"
import s from "./styles.module.scss"
import Comments from "@/components/shared/Comments/Comments"
import { getAllTargetComments } from "@/services/commentsServices"
import { CommentForm } from "@/components/layout/CommentSection/CommentForm"
import { CommentSectionProps } from "@/types/commentsDTO"
import { CommentsSkeleton } from "@/components/ui/skeleton/Skeletons"

// só a lista busca dados: o título e o formulário aparecem na hora
async function CommentList({ type, targetId }: CommentSectionProps) {
	const comments = await getAllTargetComments(type, targetId)

	return comments ? (
		comments.map(comment => <Comments key={comment.id} {...comment} />)
	) : (
		<h4>Sem comentários no momento</h4>
	)
}

export default function CommentSection(comment: CommentSectionProps) {
	return (
		<section className={s.commentsContainer} id="comments">
			<h3>Comentários</h3>
			<CommentForm {...comment} />
			<Suspense fallback={<CommentsSkeleton />}>
				<CommentList type={comment.type} targetId={comment.targetId} />
			</Suspense>
		</section>
	)
}
