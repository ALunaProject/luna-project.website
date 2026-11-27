import Image, { type StaticImageData } from "next/image"
import Sidebar from "@/components/layout/Sidebar/Sidebar"
import s from "./styles.module.scss"

interface NotFoundStateProps {
	message: string
	image: StaticImageData
	imageAlt: string
}

export default function NotFoundState({
	message,
	image,
	imageAlt,
}: NotFoundStateProps) {
	return (
		<main className={s.container}>
			<Sidebar />
			<section className={s.content}>
				<h3 className={s.message}>{message}</h3>
				<Image
					className={s.illustration}
					src={image}
					alt={imageAlt}
					priority
				/>
			</section>
		</main>
	)
}
