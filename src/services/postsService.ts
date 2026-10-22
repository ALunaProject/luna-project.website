import {api} from "@/utils/api"
import {PostDto} from "@/types/postsDTO";

export async function getPosts(): Promise<PostDto[] | null> {
    try {
        const {data} = await api.get<PostDto[]>("api/post");
        return data;
    }catch(err) {
        console.error("Nenhum post foi encontrado", err);
        // console.log(localStorage.getItem("token"));
        return null;
    }
}

export async function getPostById(id: string): Promise<PostDto | null> {
    try {
        const {data} = await api.get<PostDto[]>("api/post");
        return data.find(p => p.id === id) ?? null;
    }catch(err) {
        console.error("Nenhum post foi encontrado", err);
        return null;
    }
}

export async function updatePostById(
    postId: string,
    content: string
): Promise<PostDto | null> {
    try {
        const response = await api.put(`api/post/${postId}`, {
            content: content
        })
        return response.data;
    }catch(err) {
        console.error("Nenhum post foi encontrado", err);
        return null;
    }
}

export async function deletePostById(postId: string): Promise<PostDto | null> {
    try {
        const response = await api.delete(`api/post/${postId}`);
        return response.data;
    }catch(err) {
        console.error("Nenhum post foi encontrado", err);
        return null;
    }
}