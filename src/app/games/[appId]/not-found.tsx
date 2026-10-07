import NotFoundState from "@/components/shared/NotFoundState/NotFoundState";
import notFoundImg from "@/assets/images/not-found-generic.png";

export default function NotFound() {
    return (
        <NotFoundState message="Jogo não encontrado" imageAlt="game404-image" image={ notFoundImg }/>
    )
}
