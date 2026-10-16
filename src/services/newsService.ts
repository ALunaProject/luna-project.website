import { NewsApiResponse, NewsArticle, NewsPageResult } from "@/types/newsDTO"
import { decodeNewsId } from "@/utils/newsId"

const BASE_URL = "https://newsapi.org/v2/everything"
export const NEWS_PAGE_SIZE = 10
const MAX_RESULTS = 100

const QUERY =
    '"videogame" OR "videojogos" OR "playstation" OR "xbox" OR "nintendo"'

// descarta notícias sem imagem ou deletadas
function isValidArticle(article: NewsArticle): boolean {
    return (
        !!article.urlToImage &&
        article.title !== "[Removed]" &&
        !!article.url
    )
}

export async function getAllNews(page = 1): Promise<NewsPageResult> {
    const apiKey = process.env.NEWS_API_KEY

    if (!apiKey) {
        console.error("NEWS_API_KEY não definida no .env.local")
        return { articles: [], totalPages: 0 }
    }

    const params = new URLSearchParams({
        q: QUERY,
        language: "pt",
        sortBy: "publishedAt",
        pageSize: String(NEWS_PAGE_SIZE),
        page: String(page),
    })

    try {
        const response = await fetch(`${BASE_URL}?${params}`, {
            headers: { "X-Api-Key": apiKey },
            next: { revalidate: 600 }, // cache de 10 min
        })

        if (!response.ok) {
            throw new Error(`NewsAPI respondeu HTTP ${response.status}`)
        }

        const data: NewsApiResponse = await response.json()
        const total = Math.min(data.totalResults, MAX_RESULTS)

        return {
            articles: data.articles.filter(isValidArticle),
            totalPages: Math.ceil(total / NEWS_PAGE_SIZE),
        }
    } catch (error) {
        console.error("Erro ao buscar notícias:", error)
        return { articles: [], totalPages: 0 }
    }
}

export async function getNewsDetails(
    id: string,
    page = 1,
): Promise<NewsArticle | null> {
    const url = decodeNewsId(id)
    if (!url) return null

    const { articles } = await getAllNews(page)
    return articles.find(article => article.url === url) ?? null
}