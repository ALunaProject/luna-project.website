export interface CommentDTO {
	id: string
	content: string
	userId: string
	targetType: string
	targetId: string
	creationDate: string
}

export interface CommentRequestDTO {
	content: string
}

export type CommentSectionProps = {
	type: string
	targetId: string
}
