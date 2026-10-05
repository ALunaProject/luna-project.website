import NotFoundState from "@/components/shared/NotFoundState/NotFoundState"
import userNotFoundImg from "@/assets/images/not-found-user.png"

export default function UserNotFound() {
	return (
		<NotFoundState
			message="Usuário não encontrado"
			image={userNotFoundImg}
			imageAlt="Telescópio procurando um usuário"
		/>
	)
}
