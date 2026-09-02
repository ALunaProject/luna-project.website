import s from "@/app/signup/styles.module.scss"
import AuthCard from "@/components/forms/AuthCard/AuthCard"
import LunaLogo from "@/assets/icons/LunaLogo"

export default function SignupPage() {
	return (
		<div className={s.container}>
			<LunaLogo isLarge />
			<AuthCard variant={"signup"} />
		</div>
	)
}
