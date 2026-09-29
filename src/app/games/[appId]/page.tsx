import s from "./styles.module.scss"
import {GamesPageProps} from "@/types/gamesDTO";
import {getAllGames} from "@/services/gamesServices";
import {notFound} from "next/navigation";

export default async function GamePage({params}: GamesPageProps) {
    const {appId} = await params
    // const game = await getAppDetails(appId) - metodo n existe ainda
    // comparar id params (o id de StoreItem) com game.appId - sla pq nessa api o id muda a nomenclatura dependendo do endpoint, vai se lascar valve

    // if (!game) {
    //     notFound()
    // }
    return (
        <div className={s.games}>
            gamepage
        </div>
    )
}