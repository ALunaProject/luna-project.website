import Link from "next/link"
import { ReactNode } from "react"
import s from "./styles.module.scss"
import {
	LEGAL_CONTACT_EMAIL,
	LEGAL_EFFECTIVE_DATE,
	LEGAL_VERSION,
} from "@/utils/legal"

type LegalDocumentProps = {
	title: string
	backHref: string
	backLabel: string
	children: ReactNode
}

// link do e-mail de contato usado dentro dos textos (o e-mail fica em utils/legal.ts)
export function ContactEmail() {
	return <a href={`mailto:${LEGAL_CONTACT_EMAIL}`}>{LEGAL_CONTACT_EMAIL}</a>
}

export default function LegalDocument({
	title,
	backHref,
	backLabel,
	children,
}: LegalDocumentProps) {
	return (
		<main className={s.page}>
			<article className={s.document}>
				<Link href={backHref} className={s.back}>
					← {backLabel}
				</Link>

				<header className={s.header}>
					<h1 className={s.title}>{title}</h1>
					<p className={s.meta}>
						Grupo LUNA · Versão {LEGAL_VERSION} · Vigência a partir de{" "}
						{LEGAL_EFFECTIVE_DATE}
					</p>
				</header>

				<div className={s.content}>{children}</div>
			</article>
		</main>
	)
}
