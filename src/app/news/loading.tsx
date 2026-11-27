import Sidebar from "@/components/layout/Sidebar/Sidebar"
import { NewsCardSkeletonList } from "@/components/ui/skeleton/Skeletons"
import s from "./styles.module.scss"

export default function Loading() {
	return (
		<main className={s.container} aria-busy="true">
			<Sidebar />
			<section className={s.content}>
				<div className={s.newsWrapper}>
					<NewsCardSkeletonList />
				</div>
			</section>
		</main>
	)
}
