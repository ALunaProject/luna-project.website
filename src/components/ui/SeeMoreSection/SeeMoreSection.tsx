"use client"

import { useState } from "react"
import s from "./styles.module.scss"
import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible"

interface SeeMoreSectionProps {
	html: string
	className?: string
}

export default function SeeMoreSection({
	html,
	className,
}: SeeMoreSectionProps) {
	const [open, setOpen] = useState(false)

	return (
		<Collapsible open={open} onOpenChange={setOpen}>
			<div className={s.clamp} data-open={open}>
				<div
					className={className}
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</div>
			<CollapsibleTrigger className={s.trigger}>
				{open ? "Ver menos" : "Ver mais"}
			</CollapsibleTrigger>
		</Collapsible>
	)
}
