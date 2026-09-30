import s from "./styles.module.scss"
import Link from "next/link"

export default function NotFound() {
	return (
		<>
			<h1>Jogo não encontrado</h1>
			<Link href="/games">Voltar</Link>
		</>
	)
}
