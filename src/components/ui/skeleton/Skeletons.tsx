import s from "./blocks.module.scss"

const range = (n: number) => Array.from({ length: n }, (_, i) => i)

import { GamesCardSkeletonList } from "./GamesCardSK"
import Skeleton from "./Skeleton"

// Cada skeleton ocupa o mesmo espaço do componente real, para a página não "pular" quando o dado chega.

// ---------- Notícias ----------
export function NewsCardSkeletonList({ count = 4 }: { count?: number }) {
	return (
		<>
			{range(count).map(i => (
				<div key={i} className={s.newsCard} aria-hidden="true" />
			))}
		</>
	)
}

// ---------- Posts da comunidade ----------
export function PostCardSkeleton() {
	return (
		<div className={s.postCard} aria-hidden="true">
			<div className={s.postHeader}>
				<Skeleton circle width={42} height={42} />
				<Skeleton width={120} height={18} />
				<div className={s.postTags}>
					<Skeleton
						width={56}
						height={22}
						style={{ borderRadius: 999 }}
					/>
					<Skeleton
						width={56}
						height={22}
						style={{ borderRadius: 999 }}
					/>
					<Skeleton
						width={56}
						height={22}
						style={{ borderRadius: 999 }}
					/>
				</div>
			</div>
			<Skeleton height={14} />
			<Skeleton height={14} width="85%" />
			<Skeleton height={14} width="60%" />
		</div>
	)
}

export function PostCardSkeletonList({ count = 4 }: { count?: number }) {
	return (
		<>
			{range(count).map(i => (
				<PostCardSkeleton key={i} />
			))}
		</>
	)
}

// ---------- Comentários ----------
export function CommentsSkeleton({ count = 3 }: { count?: number }) {
	return (
		<output
			className={s.commentList}
			aria-busy="true"
			aria-label="Carregando comentários">
			{range(count).map(i => (
				<div key={i} className={s.comment} aria-hidden="true">
					<div className={s.commentUser}>
						<Skeleton circle width={45} height={45} />
						<Skeleton width={110} height={16} />
					</div>
					<Skeleton height={14} width="80%" />
				</div>
			))}
		</output>
	)
}

// ---------- Página do jogo: avaliações ----------
export function RatingSectionSkeleton() {
	return (
		<output
			className={s.rating}
			aria-busy="true"
			aria-label="Carregando avaliações">
			<div className={s.ratingTop} aria-hidden="true">
				<div className={s.ratingScore}>
					<Skeleton width={110} height={72} />
					<div className={s.stars}>
						{range(5).map(i => (
							<Skeleton key={i} width={24} height={24} />
						))}
					</div>
					<Skeleton width={140} height={14} />
				</div>
				<Skeleton width={153} height={56} style={{ borderRadius: 8 }} />
			</div>
			<div className={s.buyGrid} aria-hidden="true">
				<Skeleton width={160} height={22} />
				<Skeleton height={56} style={{ borderRadius: 8 }} />
			</div>
		</output>
	)
}

// ---------- Perfil ----------
export function ProfileListsSkeleton({ count = 2 }: { count?: number }) {
	return (
		<output
			className={s.lists}
			aria-busy="true"
			aria-label="Carregando listas">
			{range(count).map(i => (
				<div key={i} className={s.listCard} aria-hidden="true">
					<Skeleton width="55%" height={22} />
					<div className={s.listGames}>
						<Skeleton width={50} height={50} />
						<Skeleton width={50} height={50} />
						<Skeleton width={50} height={50} />
					</div>
				</div>
			))}
		</output>
	)
}

export function FavGamesSkeleton({ count = 2 }: { count?: number }) {
	return (
		<output
			className={s.favGames}
			aria-busy="true"
			aria-label="Carregando favoritos">
			<GamesCardSkeletonList count={count} />
		</output>
	)
}

// ---------- Ações do card de jogo (botão "adicionar em lista") ----------
export function CardActionsSkeleton() {
	return (
		<div className={s.actionsRow} aria-hidden="true">
			<Skeleton height={34} style={{ borderRadius: 5 }} />
		</div>
	)
}
