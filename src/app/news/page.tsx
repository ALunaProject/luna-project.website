import s from "./styles.module.scss"
import Sidebar from "@/components/layout/Sidebar/Sidebar"
import NewsCard from "@/components/shared/NewsCard/NewsCard"
import Pagination from "@/components/ui/Pagination/Pagination"
import { getAllNews } from "@/services/newsService"
import { NewsListPageProps } from "@/types/newsDTO"
import { Metadata } from "next"

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Notícias de Jogos",
        description:
            "Acompanhe as últimas notícias do mundo dos games: lançamentos, consoles e muito mais.",
        referrer: "no-referrer",
    }
}

export default async function NewsPage({ searchParams }: NewsListPageProps) {
    const { page } = await searchParams
    const currentPage = Math.max(1, Number(page) || 1)

    const { articles, totalPages } = await getAllNews(currentPage)

    return (
        <main className={s.container}>
            <Sidebar />
            <section className={s.content}>
                <div className={s.newsWrapper}>
                    {articles.map(article => (
                        <NewsCard key={article.url} article={article} page={currentPage} />
                    ))}
                    {articles.length === 0 && (
                        <p>Nenhuma notícia encontrada no momento.</p>
                    )}
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    basePath="/news"
                />
            </section>
        </main>
    )
}