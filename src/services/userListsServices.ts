import { api } from "@/utils/api";
import { ListsDTO } from "@/types/UserLIstsDTO";
import { GameData } from "@/types/gamesDTO";

export async function getUserLists(userId: string): Promise<ListsDTO[] | null> {
	try {
		const {data} = await api.get<ListsDTO[]>(`api/lists/${userId}`, {
			// headers: {
			//     Authorization: `Bearer ${ token }`,
			// },
		});
		return data;
	} catch (error) {
		console.error("Falha ao encontrar listas do usuário: ", error);
		return null;
	}
}

export async function getListByName(name: string): Promise<ListsDTO | null> {
	try {
		const {data} = await api.get<ListsDTO[]>("api/lists");

		return data.find(list => list.name === name) ?? null
	} catch (error) {
		console.log("Falha ao encontrar lista: ", error)
		return null
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

//    @PostMapping("/{listId}/games/{appId}")