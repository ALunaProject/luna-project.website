import s from "./styles.module.scss"
import Comments from "@/components/shared/Comments/Comments";
import React from "react";

export default function CommentSection() {
    const comments = [ {
        id: "1",
        content: "carai de asa",
        userId: "f60b489d-2a03-4248-a204-d7603bc5ea5a"
    }, {
        id: "2",
        content: "ismiliguido",
        userId: "f60b489d-2a03-4248-a204-d7603bc5ea5a"
    }, {
        id: "3",
        content: "orea seca",
        userId: "f60b489d-2a03-4248-a204-d7603bc5ea5a"
    }, {
        id: "4",
        content: "lalabu",
        userId: "f60b489d-2a03-4248-a204-d7603bc5ea5a"
    }, {
        id: "5",
        content: "zeppelin(tra)",
        userId: "f60b489d-2a03-4248-a204-d7603bc5ea5a"
    }, {
        id: "6",
        content: "zeca urubu",
        userId: "f60b489d-2a03-4248-a204-d7603bc5ea5a"
    }, {
        id: "7",
        content: "passoca",
        userId: "f60b489d-2a03-4248-a204-d7603bc5ea5a"
    } ]

    return (
        <section className={s.commentsContainer}>
            <h3>Comentários</h3>
            <div className={s.createCommentSec}>
                <h5>Faça um comentário nessa página:</h5>
                <input placeholder="Escreva aqui..." type="text" name="comment" />
            </div>
            { comments.map( comment => (
                <Comments
                    key={ comment.id }
                    content={ comment.content }
                    id={ comment.id }
                    userId={ comment.userId }
                />
            ) ) }
        </section>
    )
}