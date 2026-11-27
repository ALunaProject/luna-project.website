import s from "./styles.module.scss"

export default function GamesCardSkeleton() {
	return (
		<div className={s.card} aria-hidden="true">
			<div className={s.image} />
			<div className={s.props}>
				<div className={`${s.line} ${s.title}`} />
				<div className={s.tags}>
					<div className={`${s.line} ${s.tag}`} />
					<div className={`${s.line} ${s.tag}`} />
					<div className={`${s.line} ${s.tag}`} />
				</div>
			</div>
		</div>
	)
}

export function GamesCardSkeletonList({ count = 25 }: { count?: number }) {
	return (
		<>
			{Array.from({ length: count }, (_, i) => (
				<GamesCardSkeleton key={i} />
			))}
		</>
	)
}
