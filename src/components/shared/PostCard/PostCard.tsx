import s from "./styles.module.scss"
import Image from "next/image";
import UserProfile from "@/components/shared/UserProfile/UserProfile";
import Tags from "@/components/ui/Tags/Tags";
import Button from "@/components/ui/Button/Button";
import Link from "next/link";
import {PostDto} from "@/types/postsDTO";

export default function PostCard(props: PostDto) {
    return (
        <Link href="../../../app/community/" className={s.postContainer}>
                <div className={s.profileContainer}>
                    <UserProfile className={s.userProfile} username={"Lyan"}
                                 userPP={"https://thumb.wikimedia.org/wikipedia/pt/thumb/b/b4/Corinthians_simbolo.png/250px-Corinthians_simbolo.png?utm_source=pt.wikipedia.org&utm_campaign=parser&utm_content=thumbnail"}/>
                    <div className={s.tagsContainer}>
                        <Tags label={"RPG"}/>
                        <Tags label={"RPG"}/>
                        <Tags label={"RPG"}/>
                        <Tags label={"RPG"}/>
                        <Tags label={"RPG"}/>
                        <Tags label={"RPG"}/>
                        <Tags label={"RPG"}/>
                        <Tags label={"RPG"}/>
                    </div>
                </div>

                <div className={s.postContent}>
                    <p className={s.contentText}>{props.content}</p>
                </div>
          <Button className={s.commentButton} icon={"CommunityIcon"} label={"Comentar"} />

        </Link>
    )
}