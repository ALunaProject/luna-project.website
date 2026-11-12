// Regras de senha do cadastro. A mesma regra está no back (UserCreateDto, @Pattern): manter as duas iguais.

export const PASSWORD_MAX_LENGTH = 100

const RULES = [
	{ label: "Mínimo 8 caracteres", test: (p: string) => p.length >= 8 },
	{
		label: "Um caractere especial",
		test: (p: string) => /[^A-Za-z0-9]/.test(p),
	},
	{ label: "Um número", test: (p: string) => /[0-9]/.test(p) },
	{ label: "Uma letra maiúscula", test: (p: string) => /[A-Z]/.test(p) },
	{ label: "Uma letra minúscula", test: (p: string) => /[a-z]/.test(p) },
]
export function getPasswordRules(password: string) {
	return RULES.map(rule => ({ label: rule.label, met: rule.test(password) }))
}

export function isPasswordValid(password: string) {
	return (
		password.length <= PASSWORD_MAX_LENGTH &&
		RULES.every(rule => rule.test(password))
	)
}
