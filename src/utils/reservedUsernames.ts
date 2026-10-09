// Nomes que NÃO podem ser username: a rota /[username] disputa a URL com eles
// (ex: um usuário "games" tornaria o perfil inacessível, porque /games abre a página de jogos).
// ⚠️ Manter em sincronia com ReservedUsernames.java no back e atualizar quando criar rota nova.
export const RESERVED_USERNAMES: string[] = [
	// rotas atuais do app
	"home",
	"login",
	"signin",
	"signup",
	"register",
	"logout",
	"auth",
	"api",
	"games",
	"game",
	"game-purpose",
	"news",
	"discovery",
	"lfg-posts",
	"community",
	// rotas prováveis no futuro
	"profile",
	"settings",
	"search",
	"explore",
	"posts",
	"post",
	"comments",
	"lists",
	"notifications",
	"messages",
	"users",
	"user",
	"me",
	"admin",
	"about",
	"terms",
	"privacy",
	"help",
	"support",
	// nomes técnicos do Next/projeto
	"_next",
	"static",
	"public",
	"assets",
	"mocks",
	"favicon.ico",
	"null",
	"undefined",
]

const RESERVED_SET = new Set(RESERVED_USERNAMES)

// compara sem diferenciar maiúscula/minúscula ("Login" também é bloqueado)
export function isReservedUsername(username: string) {
	return RESERVED_SET.has(username.trim().toLowerCase())
}
