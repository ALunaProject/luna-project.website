import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				pathname: "/**",
			},

			{
				protocol: "https",
				hostname: "encrypted-tbn0.gstatic.com",
				pathname: "/**",
			},

			{
				protocol: "https",
				hostname: "example.com",
				pathname: "/images/**",
			},
			{
				protocol: "https",
				hostname: "**.wikimedia.org",
				pathname: "/**",
			},
			// Domínios da CDN da Steam
			{
				protocol: "https",
				hostname: "**.steamstatic.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "shared.akamai.steamstatic.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "cdn.cloudflare.steamstatic.com",
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
