import Sidebar from "@/components/layout/Sidebar/Sidebar"
import Skeleton from "@/components/ui/skeleton/Skeleton"
import {
	CommentsSkeleton,
	PostCardSkeleton,
} from "@/components/ui/skeleton/Skeletons"
import s from "./styles.module.scss"

export default function Loading() {
	return (
		<main className={s.container} aria-busy="true">
			<Sidebar />
			<div className={s.content}>
				<Skeleton height={420} style={{ borderRadius: 0 }} />
				<PostCardSkeleton />
				<CommentsSkeleton />
			</div>
		</main>
	)
}
