export interface PostDto {
    id: string;
    content: string;
    creationDate: string;
}

export interface PostPageResponse {
    params: Promise<{postId: string }>
}