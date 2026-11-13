import { api } from "@/utils/api"
import { Tag } from "@/types/tagsDTO"

// O catálogo é estático (vem do back, GET /api/tags): busca uma vez e reaproveita a mesma promise
let cache: Promise<Tag[]> | null = null

export function getTags(): Promise<Tag[]> {
	if (!cache) {
		cache = api
			.get<Tag[]>("api/tags")
			.then(({ data }) => data)
			.catch(err => {
				console.error("Erro ao carregar as tags", err)
				cache = null // deixa tentar de novo na próxima chamada
				return []
			})
	}
	return cache
}

export function toTagMap(tags: Tag[]): Map<number, string> {
	return new Map(tags.map(tag => [tag.id, tag.name]))
}
