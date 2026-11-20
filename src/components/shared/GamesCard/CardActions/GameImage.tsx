"use client"

import Image from "next/image"
import { useState } from "react"

type Props = { src: string; fallbackSrc?: string; alt: string }

export default function GameImage({ src, fallbackSrc, alt }: Props) {
	const [failed, setFailed] = useState(false)
	const current = failed && fallbackSrc ? fallbackSrc : src

	return (
		<Image
			src={current}
			alt={alt}
			width={321}
			height={150}
			loading="eager"
			style={{ objectFit: "cover" }}
			onError={() => setFailed(true)}
		/>
	)
}