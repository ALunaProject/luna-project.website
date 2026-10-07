import s from "./styles.module.scss"

export default function RatingSection() {
    const OBJ: string = "aaaa"

    return (
        <section className={ s.ratingSection }>
            <div>
                <div className={ s.overallRate }>
                    <h3>9.5</h3>
                    {/*% em estrelas*/ }
                    <span>AVALIAÇÃO GERAL</span>
                </div>
                <div className={ s.otherRatings }>
                    <div className={ s.steamRating }>
                        <span>Outros:</span>
                        <div className={ s.rateList }>

                            <div className="rateInfo">
                                <span>9.2/10</span>
                                <span>Aval. Steam</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}