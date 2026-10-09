"use client"

import Image from "next/image"
import { useProfileEdit } from "./ProfileEditContext"

interface ProfileAvatarProps {
	src: string
	alt: string
	className?: string
}

// Foto de perfil: se há uma imagem escolhida e ainda não salva, mostra o preview local
export default function ProfileAvatar({ src, alt, className }: ProfileAvatarProps) {
	const { previews } = useProfileEdit()

	if (previews.avatar) {
		return (
			<img
				className={className}
				src={previews.avatar}
				alt={alt}
				width={125}
				height={125}
				style={{ objectFit: "cover" }}
			/>
		)
	}

	return (
		<Image
			className={className}
			src={src}
			alt={alt}
			width={125}
			height={125}
			style={{ objectFit: "cover" }}
		/>
	)
}
