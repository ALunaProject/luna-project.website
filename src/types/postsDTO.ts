import { Tag } from "@/types/tagsDTO"

export interface PostAuthor {
	id: string
	username: string
	profilePicUrl: string | null
}

export interface PostDto {
	id: string
	content: string
	creationDate?: string
	creation_date?: string
	createdAt?: string
	tags?: Tag[]
	author?: PostAuthor
}

export interface PostPageResponse {
	params: Promise<{ postId: string }>
}

export interface PostCardProps {
	post: PostDto
	isPostPage?: boolean
}

export interface UsePostModalProps {
	open: boolean
	onClose: () => void
}

export interface CreatePostRequest {
	content: string
	tagIds?: number[]
}
