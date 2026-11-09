import s from "./styles.module.scss"
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import {PostDto} from "@/types/postsDTO";
import {getPosts} from "@/services/postsService";
import PostCard from "@/components/shared/PostCard/PostCard";
import Button from "@/components/ui/Button/Button";
import PostActions from "@/components/layout/PostCreateModal/PostActions";

export default async function CommunityPage() {
    const posts: PostDto[] | null = await getPosts()

    return (
        <main className={s.container}>
            <Sidebar />
            <section
                className={s.content}
            >
                <PostActions/>
                {posts?.map((post: PostDto) => (
                    <PostCard key={post.id} post={post} isPostPage />
                ))}
            </section>
        </main>


    )
}