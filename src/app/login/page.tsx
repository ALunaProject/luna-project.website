import s from "@/app/login/styles.module.scss";

import AuthCard from "@/components/forms/AuthCard/AuthCard";
import LunaLogoIcon from "@/assets/icons/LogoLunaIcon";
export default function LoginPage() {
    return (
        <div className={s.container}>
            <div className={s.logo}>
                <LunaLogoIcon />
                <h1 className={s.logoTitle}>LUNA</h1>
            </div>
            <AuthCard variant={"login"}/>
        </div>
    )
}