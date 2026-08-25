import SignupCard from "../../components/forms/SignUpCard/SignUpCard";
import s from "@/app/signup/styles.module.scss";
import logo from "../../assets/images/LogoLuna.svg";

export default function SignupPage() {
    return (
        <div className={s.container}>
            <div className={s.logo}>
                <img src={logo} className={s.logoImg} alt="Luna" />
                <h1 className={s.logoTitle}>LUNA</h1>
            </div>
            <SignupCard />
        </div>
    );
}