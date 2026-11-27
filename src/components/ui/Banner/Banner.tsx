import Image from "next/image"
import { CSSProperties, ReactNode } from "react"
import s from "./styles.module.scss"

interface BannerProps {
	src: string
	alt?: string
	// altura do banner (número = px). Padrão: 400
	height?: number | string
	className?: string
	// espaço pra colocar coisas por cima do banner (ex: o lápis de editar)
	children?: ReactNode
}

// Banner do topo da página: ocupa só o topo, rola junto com o conteúdo e termina num degradê até a cor de fundo.
// Reaproveitar nas páginas de perfil, games, news...
export default function Banner({
	src,
	alt = "",
	height = 400,
	className,
	children,
}: BannerProps) {
	const bannerHeight = typeof height === "number" ? `${height}px` : height

	return (
		<div
			className={`${s.banner} ${className ?? ""}`}
			style={{ "--banner-height": bannerHeight } as CSSProperties}>
			<Image
				className={s.image}
				src={src}
				alt={alt}
				fill
				priority
				sizes="100vw"
			/>
			<div className={s.fade} aria-hidden="true" />
			{children}
		</div>
	)
}
