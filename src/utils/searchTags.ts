export function parseTagIds(raw?: string | null): number[] {
	if (!raw) return []
	const ids = raw
		.split(",")
		.map(Number)
		.filter((n) => Number.isInteger(n) && n > 0)
	return [...new Set(ids)].sort((a, b) => a - b).slice(0, 5)
}