"use client";

import { useMemo, useState, FormEvent } from "react";
import loginStyles from "./login.module.scss";
import signupStyles from "./signup.module.scss";
import UserIcon from "../../../assets/icons/UserIcon";
import MailIcon from "../../../assets/icons/MailIcon";
import LockIcon from "../../../assets/icons/LockIcon";
import Eye from "../../../assets/icons/EyeIcon";

type AuthCardProps = {
    variant: "login" | "signup";
};

function AuthCard({variant}: AuthCardProps) {
    const isSignup = variant === "signup";
    const s = isSignup ? signupStyles : loginStyles;

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const requirements = useMemo(
        () => [
            {label: "minimum 8 characters", met: password.length >= 8},
            {label: "one special character", met: /[^A-Za-z0-9]/.test(password)},
            {label: "one number", met: /[0-9]/.test(password)},
            {label: "one uppercase character", met: /[A-Z]/.test(password)},
            {label: "one lowercase character", met: /[a-z]/.test(password)},
        ],
        [password]
    );

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(isSignup ? {name, email, password} : {email, password});
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
                        <UserIcon className={s.icon}/>
                        <input
                            id="name"
                            type="text"
                            placeholder="Seu nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </div>
            )}

            <div className={s.field}>
                <label htmlFor="email">Email</label>
                <div className={s.input}>
                    <MailIcon className={s.icon}/>
                    <input
                        id="email"
                        type="email"
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        <Eye className={s.eye}/>
                        <span>{showPassword ? "hide" : "show"}</span>
                    </button>
                </div>
                <div className={s.input}>
                    <LockIcon className={s.icon}/>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {isSignup && (
                    <ul className={signupStyles.requirements}>
                        {requirements.map((req) => (
                            <li key={req.label} data-met={req.met}>
                                {req.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button type="submit" className={s.submit}>
                Entrar
            </button>

            <p className={s.signupLink}>
                {isSignup ? (
                    <>Já tem uma conta? <a href="/login">Faça seu Login!</a></>
                ) : (
                    <>Não tem uma conta? <a href="/signup">Cadastre-se!</a></>
                )}
            </p>
        </form>
    );
}

export default AuthCard;