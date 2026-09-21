interface UserDTO {
	id: string
	username: string
	email: string
	bio: string | null
	profilePicUrl: string | null
	bannerUrl: string | null
	role: "ADMIN" | "USER"
}

interface LoginDTO {
	email: string
	password: string
}

interface RegisterDTO {
	email: string
	password: string
	username: string
}

interface AuthResponseDTO {
	token: string
	username: string
}

interface UserPageProps {
	//    isLogged?: boolean;
	params: Promise<{ username: string }>
}
