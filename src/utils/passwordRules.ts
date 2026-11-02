// Regras de senha do cadastro. A mesma regra está no back (UserCreateDto, @Pattern): manter as duas iguais.

export const PASSWORD_MAX_LENGTH = 100

const RULES = [
	{ label: "minimum 8 characters", test: (p: string) => p.length >= 8 },
	{ label: "one special character", test: (p: string) => /[^A-Za-z0-9]/.test(p) },
	{ label: "one number", test: (p: string) => /[0-9]/.test(p) },
	{ label: "one uppercase character", test: (p: string) => /[A-Z]/.test(p) },
	{ label: "one lowercase character", test: (p: string) => /[a-z]/.test(p) },
]

// lista usada no checklist da tela: cada regra com "atendida ou não"
export function getPasswordRules(password: string) {
	return RULES.map(rule => ({ label: rule.label, met: rule.test(password) }))
}

export function isPasswordValid(password: string) {
	return password.length <= PASSWORD_MAX_LENGTH && RULES.every(rule => rule.test(password))
}
