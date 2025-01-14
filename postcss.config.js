import cssnanoPlugin from "cssnano";
import postCSSPresetEnvPlugin from "postcss-preset-env";

const config = {
	plugins: [
		postCSSPresetEnvPlugin({
			stage: 2,
		}),
		cssnanoPlugin({
			preset: "default",
		}),
	],
};

export default config;
