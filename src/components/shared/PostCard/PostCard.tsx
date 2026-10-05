import s from "./styles.module.scss"
import Image from "next/image";
import UserProfile from "@/components/shared/UserProfile/UserProfile";
import Tags from "@/components/ui/Tags/Tags";

export default function PostCard() {
    return (
        <div className={s.postContainer}>
            <div className={s.headerPostContainer}>
                <div className={s.profileContainer}>
                    <UserProfile username={"Lyan"}
                                 userPP={"https://thumb.wikimedia.org/wikipedia/pt/thumb/b/b4/Corinthians_simbolo.png/250px-Corinthians_simbolo.png?utm_source=pt.wikipedia.org&utm_campaign=parser&utm_content=thumbnail"}/>
                    <div className={s.tagsContainer}>
                        <Tags label={"RPG"}/>
                    </div>
                </div>
            </div>

                <div className={s.postContent}>
                    <p className={s.contentText}>chibinha</p>
                </div>
                <button className={s.commentButton}>
                    <Image
                        src={"https://thumb.wikimedia.org/wikipedia/pt/thumb/b/b4/Corinthians_simbolo.png/250px-Corinthians_simbolo.png?utm_source=pt.wikipedia.org&utm_campaign=parser&utm_content=thumbnail"}
                        alt={""}
                        width={20}
                        height={20}
                    />
                    Comentar
                </button>

        </div>
    )
}