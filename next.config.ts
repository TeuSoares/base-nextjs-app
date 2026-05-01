import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	poweredByHeader: false,
	compress: true,

	images: {
		remotePatterns: [],
	},

	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{ key: "X-Content-Type-Options", value: "nosniff" },
					{ key: "X-Frame-Options", value: "DENY" },
					{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
				],
			},
		];
	},

	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
};

if (process.env.NODE_ENV === "development") {
	nextConfig.images?.remotePatterns?.push({
		protocol: "http",
		hostname: "localhost",
	});
}

if (process.env.NODE_ENV === "production") {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;

	if (apiUrl) {
		try {
			const url = new URL(apiUrl);
			nextConfig.images?.remotePatterns?.push({
				protocol: url.protocol.replace(":", "") as "http" | "https",
				hostname: url.hostname,
				port: url.port,
			});
		} catch (e) {
			console.warn(e);
		}
	}

	Object.assign(nextConfig, {
		productionBrowserSourceMaps: false,
	});
}

export default nextConfig;
