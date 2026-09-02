import s from "@/app/login/styles.module.scss"

import AuthCard from "@/components/forms/AuthCard/AuthCard"
import LunaLogo from "@/assets/icons/LunaLogo"

export default function LoginPage() {
	return (
		<div className={s.container}>
			<LunaLogo isLarge />
			<AuthCard variant={"login"} />
		</div>
	)
}
