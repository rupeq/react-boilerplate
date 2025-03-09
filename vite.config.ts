import path from "node:path";

import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite as router } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, normalizePath, type ConfigEnv } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default (env: ConfigEnv) => {
	const generateScopedName =
		env.mode === "production" ? "[hash:base64:7]" : "[local]_[hash:base64:2]";

	return defineConfig({
		plugins: [
			tailwindcss(),
			process.env["NODE_ENV"] !== "test" && router(),
			react(),
			viteStaticCopy({
				targets: [
					{
						src: normalizePath(path.resolve(__dirname, "./src/assets/locales")),
						dest: normalizePath(path.resolve(__dirname, "./dist")),
					},
					{
						src: normalizePath(
							path.resolve(__dirname, "./src/assets/icons/android-*.png"),
						),
						dest: normalizePath(path.resolve(__dirname, "./dist/assets")),
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
				"@": path.resolve(__dirname, "./src"),
			},
		},
		css: {
			modules: {
				localsConvention: "camelCase",
				generateScopedName,
			},
		},
		build: {
			minify: true,
			cssCodeSplit: true,
			outDir: "dist",
			assetsDir: "assets",
		},
	});
};
