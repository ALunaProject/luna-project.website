import s from "@/app/signup/styles.module.scss";
import AuthCard from "@/components/forms/AuthCard/AuthCard";
import LunaLogoIcon from "@/assets/icons/LogoLunaIcon";

export default function SignupPage() {
    return (
        <div className={s.container}>
            <div className={s.logo}>
                <LunaLogoIcon />
                <h1 className={s.logoTitle}>LUNA</h1>
            </div>
            <AuthCard variant={"signup"}/>
        </div>
    );
}