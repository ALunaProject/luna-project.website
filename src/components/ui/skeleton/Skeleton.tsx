import type { CSSProperties } from "react"
import s from "./blocks.module.scss"

interface SkeletonProps {
	width?: number | string
	height?: number | string
	circle?: boolean
	className?: string
	style?: CSSProperties
}

// Bloco base do skeleton. Todos os outros skeletons são montados com ele.
export default function Skeleton({
	width = "100%",
	height = 16,
	circle = false,
	className,
	style,
}: SkeletonProps) {
	const classes = [s.block, circle ? s.circle : "", className ?? ""]
		.filter(Boolean)
		.join(" ")

	return (
		<span
			aria-hidden="true"
			className={classes}
			style={{ width, height, ...style }}
		/>
	)
}
