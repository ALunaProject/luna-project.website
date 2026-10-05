import s from "./styles.module.scss"

import { getGameDetails } from "@/services/gamesServices"
import { notFound } from "next/navigation"
import { GamesPageProps } from "@/types/gamesDTO"
import { Metadata } from "next"
import { constructMetadata } from "@/utils/metadata"
import Tags from "@/components/ui/Tags/Tags"
import { DEFAULT_BANNER } from "@/utils/contants"
import React from "react"
import Sidebar from "@/components/layout/Sidebar/Sidebar"

export async function generateMetadata( {
                                            params,
                                        }: GamesPageProps ): Promise<Metadata> {
    const { appId } = await params
    const game = await getGameDetails( appId )

    if (!game) {
        return constructMetadata( { title: "Jogo não encontrado" } )
    }

    return constructMetadata( {
        title: game.name,
        description: `Gêneros: ${ game.genres?.map( g => g.description ).join( ", " ) }`,
        image: game.header_image,
    } )
}

export default async function GamePage( { params }: GamesPageProps ) {
    const { appId } = await params
    const game = await getGameDetails( appId )

    if (!game) {
        notFound()
    }

    return (
        <main className={ s.container }>
            <Sidebar/>
            { game ? (
                <section
                    className={ s.content }
                    style={
                        {
                            "--banner-image": `url(${ game.background_raw || DEFAULT_BANNER })`,
                        } as React.CSSProperties
                    }>
                    {/* se o background for ficar apenas em cima, criar um Banner separado */ }
                    <div className={ s.gameContent }>
                        <h1>{ game.name }</h1>
                        <div className={ s.tagsWrapper }>
                            { game?.genres?.map( gen => (
                                <Tags key={ gen.id } label={ gen.description }/>
                            ) ) }
                            { game?.categories?.map( cat => (
                                <Tags key={ cat.id } label={ cat.description }/>
                            ) ) }
                        </div>
                        <div
                            className={ s.description }
                            dangerouslySetInnerHTML={ {
                                __html: game.about_the_game,
                            } }
                        />
                    </div>
                    <div className={ s.rating }>
                        <p>rating</p>
                    </div>
                </section>
            ) : (
                <p>Não foi possível carregar os detalhes do jogo.</p>
            ) }
        </main>
    )
}
