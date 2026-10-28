import { api } from "@/utils/api";
import { GameCacheResponse, ListsDTO } from "@/types/UserLIstsDTO";
import { GameData } from "@/types/gamesDTO";

export async function getUserLists(userId: string): Promise<ListsDTO[] | null> {
	try {
		const {data} = await api.get<ListsDTO[]>(`api/lists/${userId}`);
		return data;
	} catch (error) {
		console.error("Falha ao encontrar listas do usuário: ", error);
		return null;
	}
}


export async function addGameToList(
	id: string,
	req: GameData,
	token: string
): Promise<ListsDTO | null> {
	try {
		const {data} = await api.post<ListsDTO>(`api/lists/${id}/games`,
			req,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);
		return data;
	} catch (error) {
		console.error("Falha ao adicionar jogo na lista: ", error);
		return null;
	}
}

export async function renameList(
	id: string,
	token: string
): Promise<ListsDTO | null> {
	try {
		const {data} = await api.put<ListsDTO>(`api/lists/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		return data;
	} catch (error) {
		console.error("Falha ao renomear lista: ", error);
		return null;
	}
}

export async function removeGameOnList(
	id: string,
	req: GameData,
	token: string
) {
	try {
		const {data} = await api.delete(`api/lists/${id}/games`, {
			data: req,
			headers: {
				Authorization: `Bearer ${token}`,
			},},
		);
		alert(`Jogo ${req.appid} deletado da lista`)
		return data;
	} catch (error) {
		return  console.error("Falha ao remover jogo da lista: ", error);
	}
}