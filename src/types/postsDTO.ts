import {Tag} from "@/types/tagsDTO";

export interface PostDto {
    id: string;
    content: string;
    creationDate: string;
    tags?: Tag[];
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

export interface CreatePostRequest {
    content: string;
    tagIds?: number[];
}
