import { api } from "@/utils/api"
import { CommentDTO, CommentRequestDTO } from "@/types/commentsDTO"

export async function getAllTargetComments(
	type: string,
	targetId: string,
): Promise<CommentDTO[] | null> {
	try {
		const { data } = await api.get<CommentDTO[]>(
			`/api/comments/${type}/${targetId}`,
		)
		return data
	} catch (error) {
		console.error("Falha ao buscar todos os comentários:", error)
		return null
	}
}

export async function createNewComment(
	type: string,
	targetId: string,
	req: CommentRequestDTO,
	token: string,
): Promise<CommentDTO | null> {
	try {
		const { data } = await api.post<CommentDTO>(
			`/api/comments/${type}/${targetId}`,
			req,
			{
				headers: { Authorization: `Bearer ${token}` },
			},
		)
		return data
	} catch (error) {
		console.error("Falha ao criar novo comentário:", error)
		alert("Falha ao criar novo comentário!")
		return null
	}
}
