export function encodeNewsId(url: string): string {
    return Buffer.from(url, "utf-8").toString("base64url")
}

export function decodeNewsId(id: string): string | null {
    try {
        const url = Buffer.from(id, "base64url").toString("utf-8")
        return url.startsWith("http") ? url : null
    } catch {
        return null
    }
}