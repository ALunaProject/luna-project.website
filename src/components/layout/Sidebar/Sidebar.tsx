import Links from "@/components/shared/Links/Links";
import s from "./styles.module.scss"
import LunaLogo from "@/assets/icons/LunaLogo";
import UserProfile from "@/components/shared/UserProfile/UserProfile";

export default function Sidebar() {
    return (
        <div>
            <div>
                <LunaLogo/>
                <span>Luna</span>
            </div>
            <nav className={s.linksWrapper}>
                <Links href="/news" label="Not'icias" icon="NewsIcon"/>
                <Links href="/games" label="Jogos" icon="GamesIcon"/>
                <Links href="/community" label="Comunidade" icon="CommunityIcon"/>
            </nav>
            <UserProfile username="chimbinha"
                         userPP="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXefoDt5LxS9Vwl-WUv4HdLmhwkKRuyWw6OwmoNEfBNVfJKHTmm8u-8E0&s=10"/>
        </div>
    )
}