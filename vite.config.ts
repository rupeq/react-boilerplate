import path from "node:path";

import react from "@vitejs/plugin-react-swc";
import { type ConfigEnv, defineConfig, normalizePath } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default (env: ConfigEnv) => {
	const generateScopedName =
		env.mode === "production" ? "[hash:base64:7]" : "[local]_[hash:base64:2]";

	return defineConfig({
		plugins: [
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
				"@": path.resolve(__dirname, "./src"),
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
