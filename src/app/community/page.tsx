import Post from "@/components/shared/Post/PostCard";
import s from "./styles.module.scss"

export default function CommunityPage() {
    return (
        <div className={s.container}>
            <Post/>
        </div>
    )
}