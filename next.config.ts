import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	outputFileTracingIncludes: {
		"./": ["prisma/**/*"],
	},
	experimental: {
		optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
	},
};

export default nextConfig;
