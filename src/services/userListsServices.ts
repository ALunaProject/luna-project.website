import { api } from "@/utils/api";
import { ListsDTO } from "@/types/UserLIstsDTO";

export async function getUserLists( userId: string ): Promise<ListsDTO[] | null> {
    try {
        const { data } = await api.get<ListsDTO[]>( `api/lists/${userId}`, {
            // headers: {
            //     Authorization: `Bearer ${ token }`,
            // },
        } );
        return data;
    } catch (error) {
        console.error( "Falha ao encontrar listas do usuário: ", error );
        return null;
    }
}

export async function getListByName( name: string ): Promise<ListsDTO | null> {
    try {
        const { data } = await api.get<ListsDTO[]>( "api/lists" );
        return data.find( list => list.name === name ) ?? null
    } catch (error) {
        console.log( "Falha ao encontrar lista: ", error )
        return null
    }
}

export async function addGameToList(appId: string, id: string, token: string): Promise<ListsDTO | null> {
    try {
        const { data } = await api.post<ListsDTO>( `api/lists/${id}/games/${appId}`, {
            headers: {
                Authorization: `Bearer ${ token }`,
            },
        } );
        // adicionar no back validação para quando user já adicionou jogo na lista tal
        return data;
    }
    catch(error) {
        console.error( "Falha ao encontrar lista: ", error );
        return null;
    }
}

//    @PostMapping("/{listId}/games/{appId}")