import { api } from "@/utils/api";
import { ListsDTO } from "@/types/UserLIstsDTO";
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

export async function removeGameOnList(
	id: string,
	appId: string,
	token: string
): Promise<ListsDTO | null> {
	try {
		const {data} = await api.delete<ListsDTO>(`api/lists/${id}/games/${appId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			},
		);
		alert(`Jogo deletado da lista`)
		return data;
	} catch (error) {
		console.error("Falha ao remover jogo da lista: ", error);
		return null;
	}
}

export async function createCustomList(
	token: string,
	req: {
		name: string
	}): Promise<ListsDTO | null> {
	try {
		const {data} = await api.post<ListsDTO>(`api/lists`,
			req, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
		alert(`Nova lista criada!`)
		return data;
	} catch (error) {
		console.error("Falha ao criar nova lista: ", error);
		return null;
	}
}

export async function deleteList(id: string, token: string): Promise<void> {
	await api.delete(`api/lists/${id}`, {
		headers: { Authorization: `Bearer ${token}` },
	})
}

export async function renameList(
	id: string,
	req: { name: string },
	token: string
): Promise<ListsDTO> {
	const { data } = await api.patch<ListsDTO>(`api/lists/${id}`, req, {
		headers: { Authorization: `Bearer ${token}` },
	})
	return data
}
