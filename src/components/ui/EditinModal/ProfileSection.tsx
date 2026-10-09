"use client"

import { CSSProperties, ReactNode } from "react"
import { useProfileEdit } from "./ProfileEditContext"

interface ProfileSectionProps {
	className?: string
	bannerUrl: string
	children: ReactNode
}

// A <section> do perfil: define a variável CSS do banner, usando o preview local quando houver
export default function ProfileSection({
	className,
	bannerUrl,
	children,
}: ProfileSectionProps) {
	const { previews } = useProfileEdit()
	const url = previews.banner ?? bannerUrl

	return (
		<section
			className={className}
			style={{ "--banner-image": `url("${url}")` } as CSSProperties}>
			{children}
		</section>
	)
}
