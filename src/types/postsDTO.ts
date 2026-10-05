export interface PostDto {
    id: string;
    title: string;
    content: string;
    creationDate: string;
}

export interface PostPageResponse {
    params: Promise<{postId: string }>
}