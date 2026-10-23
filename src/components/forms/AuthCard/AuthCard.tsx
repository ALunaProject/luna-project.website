"use client"

import { useMemo, useState, FormEvent } from "react"
import loginStyles from "./login.module.scss"
import signupStyles from "./signup.module.scss"
import UserIcon from "../../../assets/icons/UserIcon"
import MailIcon from "../../../assets/icons/MailIcon"
import LockIcon from "../../../assets/icons/LockIcon"
import Eye from "../../../assets/icons/EyeIcon"
import { loginService, signupService } from "@/services/userServices"
import { STORAGE_KEYS } from "@/utils/contants"
import axios from "axios"
import { useRouter } from "next/navigation"
import Button from "@/components/ui/Button/Button"
import { isReservedUsername } from "@/utils/reservedUsernames"
import { getPasswordRules, isPasswordValid } from "@/utils/passwordRules"

type AuthCardProps = {
	variant: "login" | "signup"
}

// transforma o erro da requisição numa mensagem pra mostrar na tela
function getAuthErrorMessage(err: unknown, isSignup: boolean) {
	if (axios.isAxiosError(err)) {
		if (!err.response) return "Erro de conexão. Tente novamente."

		// mensagem enviada pelo back (ex: regra da senha)
		const message = err.response.data?.message
		if (typeof message === "string" && message) return message

		const status = err.response.status
		if (status === 400) return "Dados inválidos. Confira os campos e tente de novo."
		if (!isSignup && (status === 401 || status === 403)) {
			return "Email ou senha incorretos."
		}
		if (isSignup && (status === 409 || status === 500)) {
			return "Não foi possível criar a conta. O email ou o nome já pode estar em uso."
		}
	}
	return "Algo deu errado. Tente novamente."
}

function AuthCard({ variant }: AuthCardProps) {
	const isSignup = variant === "signup"
	const s = isSignup ? signupStyles : loginStyles

	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [username, setUserName] = useState<string>("")
	const [email, setEmail] = useState<string>("")
	const [password, setPassword] = useState<string>("")

	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>("")
	// vira true quando tenta enviar com senha fraca: aí as regras não atendidas ficam vermelhas
	const [showPasswordErrors, setShowPasswordErrors] = useState<boolean>(false)

	const router = useRouter()

	const requirements = useMemo(() => getPasswordRules(password), [password])

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		// nomes iguais a rotas do site (login, games, news...) quebrariam o perfil
		if (isSignup && isReservedUsername(username)) {
			setError("Esse nome é reservado pelo site. Escolha outro.")
			return
		}

		// o checklist era só visual: agora a senha precisa cumprir todas as regras pra enviar
		if (isSignup && !isPasswordValid(password)) {
			setShowPasswordErrors(true)
			setError("A senha não atende aos requisitos abaixo.")
			return
		}

		setLoading(true)
		setError("")

		try {
			const response = isSignup
				? await signupService({ username, email, password })
				: await loginService({ email, password })

			// o cadastro não devolve token: só guarda token/usuário no login
			if (isSignup) {
				router.push("/login")
				return
			}

			localStorage.setItem(STORAGE_KEYS.TOKEN, response.token)
			localStorage.setItem(STORAGE_KEYS.USER, response.username)
			router.push(`/${response.username}`)
		} catch (err) {
			setError(getAuthErrorMessage(err, isSignup))
		} finally {
			setLoading(false)
		}
	}

	return (
		<form className={s.card} onSubmit={handleSubmit}>
			<h2 className={s.title}>
				{isSignup ? "Crie sua conta agora!" : "Faça seu Login"}
			</h2>

			{isSignup && (
				<div className={s.field}>
					<label htmlFor="name">Nome</label>
					<div className={s.input}>
						<UserIcon className={s.icon} />
						<input
							id="name"
							type="text"
							placeholder="Seu nome"
							value={username}
							onChange={e => setUserName(e.target.value)}
							required
						/>
					</div>
				</div>
			)}

			<div className={s.field}>
				<label htmlFor="email">Email</label>
				<div className={s.input}>
					<MailIcon className={s.icon} />
					<input
						id="email"
						type="email"
						placeholder="Your Email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						required
					/>
				</div>
			</div>

			<div className={s.field}>
				<div className={s.pass}>
					<label htmlFor="password">Password</label>
					<button
						type="button"
						className={s.toggle}
						onClick={() => setShowPassword(prev => !prev)}>
						<Eye className={s.eye} />
						<span>{showPassword ? "hide" : "show"}</span>
					</button>
				</div>
				<div className={s.input}>
					<LockIcon className={s.icon} />
					<input
						id="password"
						type={showPassword ? "text" : "password"}
						placeholder="Your password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</div>

				{isSignup && (
					<ul className={signupStyles.requirements}>
						{requirements.map(req => (
							<li
								key={req.label}
								data-met={req.met}
								data-error={showPasswordErrors && !req.met}>
								{req.label}
							</li>
						))}
					</ul>
				)}
			</div>

			{error ? (
				<p className={s.error} role="alert">
					{error}
				</p>
			) : null}

			<Button label={"Entrar"} type="submit" />

			<p className={s.signupLink}>
				{isSignup ? (
					<>
						Já tem uma conta? <a href="/login">Faça seu Login!</a>
					</>
				) : (
					<>
						Não tem uma conta? <a href="/signup">Cadastre-se!</a>
					</>
				)}
			</p>
		</form>
	)
}

export default AuthCard
