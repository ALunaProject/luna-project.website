import Image from "next/image";
import s from "./styles.module.scss"
import Link from "next/link";

interface ProfileProps {
    username: string;
    userPP: string;
}

export default function UserProfile({username, userPP}: ProfileProps) {
    return (
        <Link href={`/${username}`} className={s.userProfileContainer}>
            <Image width={45} height={45} src={userPP} alt={username} />
            <span>{username}</span>
        </Link>
    )
}