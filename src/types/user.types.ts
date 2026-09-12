export type LoginDTO = {
    email: string
    password: string
}

export type RegisterDTO = LoginDTO & {
    username: string
}

export type User = {
    id: string
    username: string
    email: string
    bio: string | null
    profilePicUrl: string | null
    bannerUrl: string | null
    role: "ADMIN" | "USER"
}

export type AuthResponseDTO = {
    token: string
    username: string
}