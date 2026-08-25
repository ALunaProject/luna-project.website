"use client";

import {useMemo, useState} from "react";
import s from "./styles.module.scss";
import user from "../../../assets/icons/user.svg";
import mail from "../../../assets/icons/mail.svg";
import lock from "../../../assets/icons/lock.svg";
import eye from "../../../assets/icons/eye.svg";

export default function SignupCard() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const requirements = useMemo(
        () => [
            { label: "minimum 8 characters", met: password.length >= 8 },
            { label: "one special character", met: /[^A-Za-z0-9]/.test(password) },
            { label: "one number", met: /[0-9]/.test(password) },
            { label: "one uppercase character", met: /[A-Z]/.test(password) },
            { label: "one lowercase character", met: /[a-z]/.test(password) },
        ],
        [password]
    );

    return (
        <form className={s.card}>
            <h2 className={s.title}>Crie sua conta agora!</h2>

            <div className={s.field}>
                <label htmlFor="name">Nome</label>
                <div className={s.input}>
                    <img src={user} className={s.icon} alt="" />
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

            <div className={s.field}>
                <label htmlFor="email">Email</label>
                <div className={s.input}>
                    <img src={mail} className={s.icon} alt="" />
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
                        <img src={eye} className={s.eye} alt="" />
                        <span>{showPassword ? "hide" : "show"}</span>
                    </button>
                </div>
                <div className={s.input}>
                    <img src={lock} className={s.icon} alt="" />
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <ul className={s.requirements}>
                    {requirements.map((req) => (
                        <li key={req.label} data-met={req.met}>
                            {req.label}
                        </li>
                    ))}
                </ul>
            </div>

            <button type="submit" className={s.submit}>
                Entrar
            </button>

            <p className={s.signupLink}>
                Já tem uma conta? <a href="/login">Faça seu Login!</a>
            </p>
        </form>
    );
}