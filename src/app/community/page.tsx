import Post from "@/components/shared/PostCard/PostCard";
import s from "./styles.module.scss"
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import React from "react";
import {makeGetServerInsertedHTML} from "next/dist/server/app-render/make-get-server-inserted-html";
import {DEFAULT_BANNER} from "@/utils/contants";

export default function CommunityPage() {
    return (
        <main className={s.container}>
            <Sidebar />
            <section
                className={s.content}
            >

            </section>
        </main>


    )
}