import s from "./styles.module.scss"
import Links from "@/components/shared/Links/Links"

export default function Pagination({ page }: { page: number }) {
	return (
		<div className={s.pagination}>
			{page > 0 && (
				<Links
					href={`?page=${page - 1}`}
					label={"Anterior"}
					icon={"ArrowIcon"}
				/>
			)}
			<Links
				href={`?page=${page + 1}`}
				label={"Próximo"}
				icon={"ArrowIcon"}
			/>
		</div>
	)
}
