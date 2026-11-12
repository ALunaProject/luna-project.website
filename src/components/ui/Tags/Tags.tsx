"use client"

import s from "./styles.module.scss"
import Button from "@/components/ui/Button/Button";
import { useRouter } from "next/navigation";

interface TagsProps {
	label: string
	inCard?: boolean
}

export default function Tags({label, inCard}: TagsProps) {
	const router = useRouter()
	return (!inCard ? <Button className={s.tagContainer}
							  label={inCard
								  ? label.length > 15
									  ? label.slice(0, 15).trimEnd() + "..."
									  : label
								  : label}
							  onClick={() => router.push(`./`)}
	/> : <span className={s.tagContainer}>
			{inCard
				? label.length > 15
					? label.slice(0, 15).trimEnd() + "..."
					: label
				: label}
		</span>)
}
