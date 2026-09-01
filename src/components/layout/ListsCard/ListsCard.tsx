import s from './styles.module.scss';
import Image from "next/image";
import Link from "next/link";

interface ListProps {
    label: string;
    games: string[];
}

export default function ListsCard(List: ListProps) {
    return (
        <div className={s.listCard}>
            <h6>{List.label}</h6>
            <div className={s.gamesWrapper}>
                {List.games.map((game) => (
                    <Link key={game} href="./">
                        {/* depois temq transformar game num obj e reutilizar na app tpda, e dps arrumar a url dinamica*/}
                        <Image
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXefoDt5LxS9Vwl-WUv4HdLmhwkKRuyWw6OwmoNEfBNVfJKHTmm8u-8E0&s=10'
                            alt={`${game} preview`}
                            width={51}
                            height={51}
                        /></Link>
                ))}
            </div>
        </div>
    )
}