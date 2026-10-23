import {PostPageResponse} from "@/types/postsDTO";
import {getPostById} from "@/services/postsService";
import {notFound} from "next/navigation";
import s from "./styles.module.scss"
import UserProfile from "@/components/shared/UserProfile/UserProfile";
import Tags from "@/components/ui/Tags/Tags";
import CommentSection from "@/components/layout/CommentSection/CommentSection";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import PostCard from "@/components/shared/PostCard/PostCard";

export default async function PostPage({params}: PostPageResponse) {
    const {postId} = await params
    const post = await getPostById(postId)

    if (!post) return notFound()

    return (
        <main className={s.container}>
            <Sidebar />
            <PostCard {...post}  />
                <CommentSection/>
        </main>
    )

}