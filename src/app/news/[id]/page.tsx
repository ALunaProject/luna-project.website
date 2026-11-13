import s from "./styles.module.scss"
import { getNewsDetails } from "@/services/newsService"
import { notFound } from "next/navigation"
import { NewsDetailPageProps } from "@/types/newsDTO"
import { Metadata } from "next"
import Sidebar from "@/components/layout/Sidebar/Sidebar"
import CommentSection from "@/components/layout/CommentSection/CommentSection"

export async function generateMetadata({
	params,
	searchParams,
}: NewsDetailPageProps): Promise<Metadata> {
	const { id } = await params
	const { page } = await searchParams
	const article = await getNewsDetails(id, Number(page) || 1)

	if (!article) {
		return { title: "Notícia não encontrada" }
	}

	return {
		title: article.title,
		description: article.description ?? undefined,
		referrer: "no-referrer", //libera bloqueiro
		openGraph: article.urlToImage
			? { images: [{ url: article.urlToImage }] }
			: undefined,
	}
}

export default async function NewsDetailPage({
	params,
	searchParams,
}: NewsDetailPageProps) {
	const { id } = await params
	const { page } = await searchParams
	const article = await getNewsDetails(id, Number(page) || 1)

	if (!article) {
		notFound()
	}

	const date = new Date(article.publishedAt).toLocaleDateString("pt-BR", {
		day: "2-digit",
		month: "long",
		year: "numeric",
	})

	return (
		<main className={s.container}>
			<Sidebar />
			<section className={s.content}>
				<div className={s.banner}>
					<img
						src={article.urlToImage ?? ""}
						alt=""
						referrerPolicy="no-referrer"
					/>
				</div>
				<h1>{article.title}</h1>
				<p className={s.meta}>
					{[article.author, article.source.name, date]
						.filter(Boolean)
						.join(" | ")}
				</p>
				{article.description && (
					<p className={s.description}>{article.description}</p>
				)}
				<img
					src={article.urlToImage ?? ""}
					alt=""
					className={s.image}
					referrerPolicy="no-referrer"
				/>
				<a
					href={article.url}
					target="_blank"
					rel="noopener noreferrer"
					className={s.readMore}>
					Ler matéria completa em {article.source.name}
				</a>
				{/*<CommentSection targetId={id} type="news"/>
					TODO: precisa ter newsCache no back, ainda não tem!
				*/}
			</section>
		</main>
	)
}
