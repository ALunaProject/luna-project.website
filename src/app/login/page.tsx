import LoginCard from "@/components/forms/LoginCard/LoginCard";
import s from "@/app/login/styles.module.scss";
import logo from "../../assets/images/LogoLuna.svg"
export default function LoginPage() {
    return (
        <div className={s.container}>
            <div className={s.logo}>
                <img src={logo} className={s.logoImg}/>
                <h1 className={s.logoTitle}>LUNA</h1>
            </div>
            <LoginCard/>
        </div>
    )
}