import Sidebar from "@/components/layout/Sidebar/Sidebar"
import Skeleton from "@/components/ui/skeleton/Skeleton"
import {
	CommentsSkeleton,
	RatingSectionSkeleton,
} from "@/components/ui/skeleton/Skeletons"
import s from "./styles.module.scss"

export default function Loading() {
	return (
		<main className={s.container} aria-busy="true">
			<Sidebar />
			<section className={s.content}>
				<Skeleton
					className={s.banner}
					width="calc(100% + 60px)"
					height={300}
					style={{ borderRadius: 0 }}
				/>
				<div className={s.gameContent}>
					<Skeleton width="60%" height={44} />
					<Skeleton width="50%" height={26} />
					<Skeleton height={14} />
					<Skeleton height={14} width="90%" />
					<Skeleton height={14} width="75%" />
				</div>
				<RatingSectionSkeleton />
				<CommentsSkeleton />
			</section>
		</main>
	)
}
