"use client";

import { useState } from "react";
import s from "./styles.module.scss";
import mail from "../../../assets/icons/mail.svg";
import lock from "../../../assets/icons/lock.svg";
import eye from "../../../assets/icons/eye.svg";

export default function LoginCard() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <form className={s.card}>
            <h2 className={s.title}>Faça seu Login</h2>

            <div className={s.field}>
                <p>Email</p>
                <div className={s.input}>
                    <img src={mail} className={s.icon} alt="" />
                    <input
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className={s.field}>

                <div className={s.pass}>
                <p>Password</p>

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
                        type={showPassword ? "text" : "password"}
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                </div>
            </div>

            <button type="submit" className={s.submit}>
                Entrar
            </button>

            <p className={s.signupLink}>
                Não tem uma conta? <a href="/signup">Cadastre-se!</a>
            </p>
        </form>
    );
}