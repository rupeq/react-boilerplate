import { defineConfig, mergeConfig, type ConfigEnv } from "vitest/config";

import viteConfig from "./vite.config";

export default (env: ConfigEnv) => {
	return mergeConfig(
		viteConfig(env),
		defineConfig({
			test: {
				environment: "jsdom",
				setupFiles: ["./vitest.setup.ts"],
				css: true,
				globals: true,
				exclude: ["node_modules"],
			},
		}),
	);
};
