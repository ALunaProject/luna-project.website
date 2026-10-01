import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "encrypted-tbn0.gstatic.com",
				pathname: "/**", // <--- Adicionado para liberar qualquer subcaminho/imagem
			},
			{
				protocol: "https",
				hostname: "**.wikimedia.org",
				pathname: "/**",
			},
			// Domínios da CDN da Steam
			{
				protocol: "https",
				hostname: "shared.akamai.steamstatic.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.akamai.steamstatic.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "shared.cloudflare.steamstatic.com",
				pathname: "/**",
			},
		],
	},
}

export default nextConfig
