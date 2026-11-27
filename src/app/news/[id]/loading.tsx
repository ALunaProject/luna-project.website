import Sidebar from "@/components/layout/Sidebar/Sidebar"
import Skeleton from "@/components/ui/skeleton/Skeleton"
import { CommentsSkeleton } from "@/components/ui/skeleton/Skeletons"
import s from "./styles.module.scss"

export default function Loading() {
	return (
		<main className={s.container} aria-busy="true">
			<Sidebar />
			<section className={s.content}>
				<div className={s.banner}>
					<Skeleton height="100%" style={{ borderRadius: 0 }} />
				</div>
				<Skeleton width="70%" height={44} />
				<Skeleton width={260} height={14} />
				<Skeleton width="60%" height={18} />
				<Skeleton
					height={420}
					style={{ maxWidth: 1000, borderRadius: 8 }}
				/>
				<Skeleton width={280} height={46} style={{ borderRadius: 8 }} />
				<CommentsSkeleton />
			</section>
		</main>
	)
}
