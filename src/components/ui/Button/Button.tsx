import { ButtonHTMLAttributes } from "react"
import * as I from "@/assets/icons/LinksIcons"
import s from "./styles.module.scss"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label: string
	icon?: keyof typeof I
}

export default function Button({ label, icon, ...rest }: ButtonProps) {
	const Icon = icon ? I[icon] : null

	return (
		<button className={s.buttonContainer} {...rest}>
			{Icon ? <Icon /> : null}
			<span>{label}</span>
		</button>
	)
}
