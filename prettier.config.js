// @ts-check
import { builtinModules as builtins } from "module";

import packageJson from "./package.json" with { type: "json" };

const staticFileExtensions = [
	"png",
	"jpg",
	"mp4",
	"jpeg",
	"json",
	"svg",
	".gif",
	".webp",
	".woff",
	".woff2",
	".ttf",
	".pdf",
	".eot",
	".svg",
];

/** @type {import('prettier').Config} */
const prettierConfig = {
	printWidth: 80,
	tabWidth: 2,
	useTabs: true,
	semi: true,
	singleQuote: false,
	quoteProps: "consistent",
	jsxSingleQuote: false,
	trailingComma: "all",
	bracketSpacing: true,
	bracketSameLine: false,
	arrowParens: "always",
	requirePragma: false,
	insertPragma: false,
	proseWrap: "preserve",
	htmlWhitespaceSensitivity: "css",
	endOfLine: "lf",
	embeddedLanguageFormatting: "auto",
	singleAttributePerLine: true,
	importOrder: [
		`^(node:|${builtins
			.filter(
				(name) => !name.startsWith("util") && !name.startsWith("constants"),
			)
			.reduce((final, name) => `${final}|${name}`, "")
			.slice(1)})(.*)$`,
		`^(${[
			...Object.keys(packageJson.dependencies),
			...Object.keys(packageJson.devDependencies),
		]
			.reduce((final, depName) => `${final}|${depName}`, "")
			.slice(1)})(.*)$`,
		"^@(.*)/(.*)$",
		`^(?:[../]|[./])(?!.*.(${staticFileExtensions.reduce((final, name) => `${final}|${name}`, "scss|css")})$).*$`,
		`.(${staticFileExtensions.reduce((final, name) => `${final}|${name}`, "").slice(1)})$`,
		".(scss|css)$",
	],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	plugins: ["@trivago/prettier-plugin-sort-imports"],
};

export default prettierConfig;
