import * as I from "@/assets/icons/LinksIcons"
import Link from "next/link"
import s from "./styles.module.scss"

interface LinkProps {
	href: string
	label: string
	icon: keyof typeof I
}

export default function Links({ href, label, icon }: LinkProps) {
	const Icon = I[icon]
	return (
		<Link className={s.linkContainer} href={href}>
			<Icon />
			<span>{label}</span>
		</Link>
	)
}
