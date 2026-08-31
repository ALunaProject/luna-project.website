import s from "./styles.module.scss"
import Image from "next/image";
import Link from "next/link";

interface GamesCardProps {
    name: string;
    imageUrl: string;
}

export default function GamesCard(Game: GamesCardProps) {
    return (
        <Link href={Game.name} className={s.gamesCard}>
            <Image src={Game.imageUrl} alt={`${Game.name} preview`} width={293.25} height={196.85}/>
            <p>{Game.name}</p>
        </Link>
    )
}