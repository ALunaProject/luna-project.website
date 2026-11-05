export interface PostDto {
    id: string;
    content: string;
    creationDate: string;
}

export interface PostPageResponse {
    params: Promise<{postId: string }>
}

export interface UsePostModalProps {
    open: boolean
    onClose: () => void
}