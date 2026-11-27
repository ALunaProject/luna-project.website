"use client"

import Banner from "@/components/ui/Banner/Banner"
import EditableField from "./EditableField"
import { useProfileEdit } from "./ProfileEditContext"

interface ProfileBannerProps {
	bannerUrl: string
}

// Banner do perfil: mostra o preview local (ainda não salvo) quando há, e o lápis de editar por cima
export default function ProfileBanner({ bannerUrl }: ProfileBannerProps) {
	const { previews } = useProfileEdit()

	return (
		<Banner src={previews.banner ?? bannerUrl} alt="Banner do perfil">
			<EditableField field="banner" label="banner" placement="floating" />
		</Banner>
	)
}
