import s from "./styles.module.scss"
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import {getAllGames} from "@/services/gamesServices";
import {StoreItem} from "@/types/gamesDTO";
import GamesCard from "@/components/shared/GamesCard/GamesCard";

export default async function GamesPage() {
    const games: StoreItem[] = await getAllGames();
    return (
        <main className={s.container}>
            <Sidebar/>
            {games.map((game: StoreItem) => (
                <GamesCard key={game.id} {...game} />
            ))}
            {games.length === 0 && (
                <p>Nenhum jogo encontrado no momento.</p>
            )}
        </main>
    )
}