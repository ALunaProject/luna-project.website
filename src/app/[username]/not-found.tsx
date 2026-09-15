import s from "./styles.module.scss"
import Link from "next/link"

export default function NotFound() {
	return (
		<>
			<h1>page not found</h1>
			<Link href="/">go back</Link>
		</>
	)
}
