export interface NewsArticle {
    source: { id: string | null; name: string }
    author: string | null
    title: string
    description: string | null
    url: string
    urlToImage: string | null
    publishedAt: string
    content: string | null
}

export interface NewsApiResponse {
    status: string
    totalResults: number
    articles: NewsArticle[]
}

export interface NewsPageResult {
    articles: NewsArticle[]
    totalPages: number
}

export interface NewsListPageProps {
    searchParams: Promise<{ page?: string }>
}

export interface NewsDetailPageProps {
    params: Promise<{ id: string }>
    searchParams: Promise<{ page?: string }>
}