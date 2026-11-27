import Sidebar from "@/components/layout/Sidebar/Sidebar"
import Skeleton from "@/components/ui/skeleton/Skeleton"
import {
	CommentsSkeleton,
	FavGamesSkeleton,
	ProfileListsSkeleton,
} from "@/components/ui/skeleton/Skeletons"
import s from "./styles.module.scss"

export default function Loading() {
	return (
		<main className={s.container} aria-busy="true">
			<Sidebar />
			<section className={s.content}>
				<Skeleton height={400} style={{ borderRadius: 0 }} />
				<div className={s.userInfo}>
					<aside className={s.userInfoWrapper}>
						<div className={s.userProps}>
							<Skeleton circle width={125} height={125} />
							<Skeleton width={180} height={28} />
							<Skeleton width={260} height={14} />
							<Skeleton width={200} height={14} />
						</div>
						<section className={s.userLists}>
							<h4>Lists</h4>
							<ProfileListsSkeleton />
						</section>
					</aside>
					<aside className={s.userFavGames}>
						<h5>Favoritos</h5>
						<div className={s.favGamesWrapper}>
							<FavGamesSkeleton />
						</div>
					</aside>
				</div>
				<CommentsSkeleton />
			</section>
		</main>
	)
}
