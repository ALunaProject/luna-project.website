import s from "./styles.module.scss"
import UserProfile from "@/components/layout/UserProfile/UserProfile"

interface CommentsProps {
	user: string
	userPP: string
	content: string
}

export default function Comments({ user, userPP, content }: CommentsProps) {
	return (
		<div className={s.commentsContainer}>
			<UserProfile username={user} userPP={userPP} />
			<p>{content}</p>
		</div>
	)
}
