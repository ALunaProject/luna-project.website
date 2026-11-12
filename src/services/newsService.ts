import { NewsApiResponse, NewsArticle, NewsPageResult } from "@/types/newsDTO"
import { decodeNewsId } from "@/utils/newsId"
import { unstable_cache } from "next/cache"
import { newsApi } from "@/utils/news-api"

export const NEWS_PAGE_SIZE = 10
const MAX_RESULTS = 100
const CACHE_TIME = 60 * 60 * 24 // 24hrs

const QUERY =
	'"videogame" OR "videojogos" OR "playstation" OR "xbox" OR "nintendo" OR "steam"'

// descarta notícias sem imagem ou deletadas
function isValidArticle(article: NewsArticle): boolean {
	return (
		!!article.urlToImage && article.title !== "[Removed]" && !!article.url
	)
}
const fetchNewsPage = unstable_cache(
	async (page: number): Promise<NewsPageResult> => {
		const apiKey = process.env.NEWS_API_KEY

		if (!apiKey) {
			throw new Error("NEWS_API_KEY não definida no .env")
		}

		const { data } = await newsApi.get<NewsApiResponse>("/everything", {
			headers: { "X-Api-Key": apiKey },
			params: {
				q: QUERY,
				searchIn: "title,description",
				language: "pt",
				sortBy: "publishedAt",
				pageSize: NEWS_PAGE_SIZE,
				page,
			},
		})

		const total = Math.min(data.totalResults, MAX_RESULTS)

		return {
			articles: data.articles.filter(isValidArticle),
			totalPages: Math.ceil(total / NEWS_PAGE_SIZE),
		}
	},
	["news-page", QUERY],
	{ revalidate: CACHE_TIME },
)

export async function getAllNews(page = 1): Promise<NewsPageResult> {
	try {
		return await fetchNewsPage(page)
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
