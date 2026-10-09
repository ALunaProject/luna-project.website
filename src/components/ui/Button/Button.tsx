import { ButtonHTMLAttributes } from "react"
import * as I from "@/assets/icons/LinksIcons"
import s from "./styles.module.scss"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: string
	icon?: keyof typeof I
	variant?: "primary" | "danger"
}

export default function Button({ label, icon, variant = "primary", ...rest }: ButtonProps) {
	const Icon = icon ? I[icon] : null

	return (
		<button
			className={`${s.buttonContainer} ${variant === "danger" ? s.danger : ""}`}
			{...rest}>
			{Icon ? <Icon /> : null}
			<span>{label}</span>
		</button>
	)
}
