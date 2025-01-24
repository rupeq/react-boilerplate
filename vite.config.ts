import path from "node:path";

import { TanStackRouterVite as router } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, normalizePath, type ConfigEnv } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default (env: ConfigEnv) => {
	const generateScopedName =
		env.mode === "production" ? "[hash:base64:7]" : "[local]_[hash:base64:2]";

	return defineConfig({
		plugins: [
			process.env["NODE_ENV"] !== "test" && router(),
			react(),
			viteStaticCopy({
				targets: [
					{
						src: normalizePath(path.resolve(__dirname, "./src/assets/locales")),
						dest: normalizePath(path.resolve(__dirname, "./dist")),
					},
				],
			}),
		],
		server: {
			host: "0.0.0.0",
			port: 3000,
			strictPort: true,
			watch: {
				usePolling: true,
			},
		},
		resolve: {
			alias: {
				"@assets": path.resolve(__dirname, "./src/assets"),
				"@components": path.resolve(__dirname, "./src/components"),
				"@features": path.resolve(__dirname, "./src/features"),
				"@hooks": path.resolve(__dirname, "./src/hooks"),
				"@lib": path.resolve(__dirname, "./src/lib"),
				"@routes": path.resolve(__dirname, "./src/routes"),
				"@stores": path.resolve(__dirname, "./src/stores"),
				"@testing": path.resolve(__dirname, "./src/testing"),
				"@types": path.resolve(__dirname, "./src/types"),
				"@utils": path.resolve(__dirname, "./src/utils"),
			},
		},
		css: {
			postcss: path.resolve(__dirname, "./postcss.config.js"),
			modules: {
				localsConvention: "camelCase",
				generateScopedName,
			},
		},
		build: {
			minify: true,
			cssCodeSplit: true,
		},
	});
};
