"use client"

import Links from "@/components/shared/Links/Links"
import s from "./styles.module.scss"
import LunaLogo from "@/assets/icons/LunaLogo"
import UserProfile from "@/components/shared/UserProfile/UserProfile"
import {useAuth} from "@/hooks/useAuth"
import {DEFAULT_AVATAR} from "@/utils/contants"
import Button from "@/components/ui/Button/Button";
import {useRouter} from "next/navigation";

export default function Sidebar() {
    const {isLoggedIn, user} = useAuth()
    const router = useRouter()

    return (
        <aside className={s.sidebarContainer}>
            <LunaLogo/>
            <nav className={s.linksWrapper}>
                <Links href="/news" label="Notícias" icon="NewsIcon"/>
                <Links href="/games" label="Jogos" icon="GamesIcon"/>
                <Links
                    href="/community"
                    label="Comunidade"
                    icon="CommunityIcon"
                />
            </nav>
            {isLoggedIn && user ? (
                <UserProfile
                    className={s.userProfile}
                    username={user.username}
                    userPP={user.profilePicUrl || DEFAULT_AVATAR}
                />
            ) : (
                <Button onClick={() => {
                    router.push("/login")
                }} label={"Entrar"}/>
            )}
        </aside>
    )
}
