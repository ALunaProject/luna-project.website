import Link from "next/link"
import s from "./styles.module.scss"
import { NewsArticle } from "@/types/newsDTO"
import { encodeNewsId } from "@/utils/newsId"

interface NewsCardProps {
    article: NewsArticle
    page: number
}

export default function NewsCard({ article, page }: NewsCardProps) {
    const href = `/news/${encodeNewsId(article.url)}?page=${page}`

    return (
        <Link href={href} className={s.card}>
            <img
                src={article.urlToImage ?? ""}
                alt=""
                className={s.image}
                loading="lazy"
            />
            <div className={s.overlay} />
            <h2 className={s.title}>{article.title}</h2>
        </Link>
    )
}