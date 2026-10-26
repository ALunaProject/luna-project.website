'use client'

import s from "./styles.module.scss"
import UserProfile from "@/components/shared/UserProfile/UserProfile";
import Tags from "@/components/ui/Tags/Tags";
import {PostDto} from "@/types/postsDTO";
import {useRouter} from "next/navigation";

export default function PostCard(post: PostDto, isPostPage?: boolean) {
    const router = useRouter();

    return isPostPage ?
        <button
        type="button"
        onClick={() => {
            router.push(`/community/${post.id}`)
        }}
        className={s.postContainer}>
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
            <p className={s.contentText}>{post.content}</p>
        </div>
    </button> :
        <div
        className={s.postContainer}>
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
            <p className={s.contentText}>{post.content}</p>
        </div>
    </div>;
}