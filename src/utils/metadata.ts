// utils/metadata.ts
import { Metadata } from "next"

interface DynamicMetadataProps {
	title: string
	description?: string
	image?: string
}

export function constructMetadata({
	title,
	description,
	image,
}: DynamicMetadataProps): Metadata {
	return {
		title: `Luna | ${title}`, // Shared title template
		description,
		openGraph: {
			title,
			description,
			images: image ? [{ url: image }] : [],
		},
	}
}
