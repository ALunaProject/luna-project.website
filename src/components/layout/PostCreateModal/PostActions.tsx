"use client"

import {useState} from "react";
import Button from "@/components/ui/Button/Button";
import PostCreateModal from "@/components/layout/PostCreateModal/index";
import {useAuth} from "@/hooks/useAuth";

export default function PostActions() {
    const [modalOpen, setModalOpen] = useState(false)
    const {user} = useAuth()
    if (!user) return null
    return (
        <>
            <Button
                onClick={() => setModalOpen(true)}
                label="Nova lista"
                icon="AddIcon"
            />
            <PostCreateModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </>
    )
}