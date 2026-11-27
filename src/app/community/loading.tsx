import Sidebar from "@/components/layout/Sidebar/Sidebar"
import { PostCardSkeletonList } from "@/components/ui/skeleton/Skeletons"
import s from "./styles.module.scss"

export default function Loading() {
	return (
		<main className={s.container} aria-busy="true">
			<Sidebar />
			<section className={s.content}>
				<PostCardSkeletonList />
			</section>
		</main>
	)
}
