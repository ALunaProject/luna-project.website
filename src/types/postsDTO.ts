export interface PostDto {
    id: string;
    content: string;
    creationDate: string;
}

export interface PostPageResponse {
    params: Promise<{postId: string }>
}

export interface PostCardProps {
    post: PostDto;
    isPostPage?: boolean;
}

export interface UsePostModalProps {
    open: boolean
    onClose: () => void
}