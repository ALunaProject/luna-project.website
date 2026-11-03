import Link from "next/link"
import s from "./styles.module.scss"

interface PaginationProps {
    currentPage: number
    totalPages: number
    basePath: string
}

//1 2 3 … 10
function getPages(current: number, total: number): (number | "…")[] {
    const pages = new Set([1, total, current - 1, current, current + 1])
    const sorted = [...pages]
        .filter(p => p >= 1 && p <= total)
        .sort((a, b) => a - b)

    const result: (number | "…")[] = []
    sorted.forEach((p, i) => {
        if (i > 0 && p - sorted[i - 1] > 1) result.push("…")
        result.push(p)
    })
    return result
}

export default function Pagination({
                                       currentPage,
                                       totalPages,
                                       basePath,
                                   }: PaginationProps) {
    if (totalPages <= 1) return null

    const href = (page: number) => `${basePath}?page=${page}`
    const hasPrev = currentPage > 1
    const hasNext = currentPage < totalPages

    return (
        <nav className={s.pagination} aria-label="Paginação">
            {hasPrev ? (
                <>
                    <Link href={href(1)} className={s.item} aria-label="Primeira página">
                        «
                    </Link>
                    <Link
                        href={href(currentPage - 1)}
                        className={s.item}
                        aria-label="Página anterior">
                        ‹
                    </Link>
                </>
            ) : null}

            {getPages(currentPage, totalPages).map((p, i) =>
                    p === "…" ? (
                        <span key={`gap-${i}`} className={s.gap}>
            …
          </span>
                    ) : (
                        <Link
                            key={p}
                            href={href(p)}
                            className={`${s.item} ${p === currentPage ? s.active : ""}`}
                            aria-current={p === currentPage ? "page" : undefined}>
                            {p}
                        </Link>
                    ),
            )}

            {hasNext ? (
                <>
                    <Link
                        href={href(currentPage + 1)}
                        className={s.item}
                        aria-label="Próxima página">
                        ›
                    </Link>
                    <Link
                        href={href(totalPages)}
                        className={s.item}
                        aria-label="Última página">
                        »
                    </Link>
                </>
            ) : null}
        </nav>
    )
}