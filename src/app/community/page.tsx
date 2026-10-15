import s from "./styles.module.scss"
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import {PostDto} from "@/types/postsDTO";
import {getPosts} from "@/services/postsService";
import PostCard from "@/components/shared/PostCard/PostCard";

export default async function CommunityPage() {
    const posts: PostDto[] | null = await getPosts()

    return (
        <main className={s.container}>
            <Sidebar />
            <section
                className={s.content}
            >
                {posts?.map((post: PostDto) => (
                    <PostCard key={post.id} {...post} />
                ))}
            </section>
        </main>


    )
}