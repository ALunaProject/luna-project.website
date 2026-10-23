import NotFoundState from "@/components/shared/NotFoundState/NotFoundState"
import notFoundImg from "@/assets/images/not-found-generic.png"

export default function NotFound() {
	return (
		<NotFoundState
			message="Página não encontrada"
			image={notFoundImg}
			imageAlt="Personagem pensativa com pontos de interrogação"
		/>
	)
}
