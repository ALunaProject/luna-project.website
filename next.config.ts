import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		remotePatterns: [
			{ // UPLOAD DAS IMAGENS DOS USUARIOS!
				protocol: "https",
				hostname: "res.cloudinary.com",
				pathname: "/**",
			},

			{
				protocol: "https",
				hostname: "encrypted-tbn0.gstatic.com",
			},
			{
				protocol: "https",
				hostname: "**.wikimedia.org",
				pathname: "/**",
			},

			//teste para imagens externas, remover depois!!
		],
	},
}

export default nextConfig
