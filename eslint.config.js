import fs from "node:fs";
import path from "node:path";

import eslintJS from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import eslintPluginImport from "eslint-plugin-import-x";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginReactRefresh from "eslint-plugin-react-refresh";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import globals from "globals";
import typescriptEslint from "typescript-eslint";

const featuresDir = path.join("src", "features");

let features = [];

try {
	features = fs.readdirSync(featuresDir).filter((file) => {
		const featurePath = path.join(featuresDir, file);
		return fs.statSync(featurePath).isDirectory();
	});
} catch (error) {
	console.error(`Error reading features directory at ${featuresDir}:`, error);
	process.exit(1);
}

export const restrictedPaths = features.map((currentFeature) => {
	const target = path.join(featuresDir, currentFeature, "**");

	const restrictedFrom = features
		.filter((feature) => feature !== currentFeature)
		.map((feature) => path.join(featuresDir, feature, "**"));

	return {
		target: path.join("src", "features", currentFeature, "**"),
		from: restrictedFrom,
		message:
			"Cross-feature imports are not allowed. Please import only within the same feature or from shared modules.",
	};
});

const prettierConfig = {
	...eslintConfigPrettier,
	name: "prettier",
};

const javascriptConfig = {
	name: "eslint",
	extends: [eslintJS.configs.recommended],
	rules: {
		"no-await-in-loop": "error",
		"no-constant-binary-expression": "error",
		"no-duplicate-imports": "error",
		"no-new-native-nonconstructor": "error",
		"no-promise-executor-return": "error",
		"no-self-compare": "error",
		"no-template-curly-in-string": "error",
		"no-unmodified-loop-condition": "error",
		"no-unreachable-loop": "error",
		"no-unused-private-class-members": "error",
		"no-use-before-define": "error",
		"require-atomic-updates": "error",
		"no-console": "warn",
		"camelcase": "error",
	},
};

const typescriptConfig = {
	name: "typescript",
	extends: [...typescriptEslint.configs.recommendedTypeChecked],
	languageOptions: {
		parser: tsParser,
		parserOptions: {
			ecmaFeatures: { modules: true },
			ecmaVersion: "latest",
			project: "./tsconfig.json",
		},
		globals: {
			...globals.builtin,
			...globals.browser,
			...globals.es2025,
		},
	},
	linterOptions: {
		reportUnusedDisableDirectives: "error",
	},
	rules: {
		"@typescript-eslint/adjacent-overload-signatures": "error",
		"@typescript-eslint/array-type": ["error", { default: "generic" }],
		"@typescript-eslint/consistent-type-exports": "error",
		"@typescript-eslint/consistent-type-imports": "error",
		"@typescript-eslint/explicit-function-return-type": "error",
		"@typescript-eslint/explicit-member-accessibility": "error",
		"@typescript-eslint/explicit-module-boundary-types": "error",
		"@typescript-eslint/no-confusing-void-expression": "error",
		"@typescript-eslint/no-import-type-side-effects": "error",
		"@typescript-eslint/no-require-imports": "error",
		"@typescript-eslint/no-unused-vars": "error",
		"@typescript-eslint/no-useless-empty-export": "error",
		"@typescript-eslint/prefer-enum-initializers": "error",
		"@typescript-eslint/prefer-readonly": "error",
		"@typescript-eslint/return-await": "error",
		"@typescript-eslint/no-misused-promises": [
			"error",
			{
				checksVoidReturn: {
					attributes: false,
				},
			},
		],
		"no-return-await": "off",
	},
};

const reactConfig = {
	name: "react",
	extends: [eslintPluginReact.configs.flat?.["recommended"]].filter(Boolean),
	plugins: {
		"react-hooks": eslintPluginReactHooks,
		"react-refresh": eslintPluginReactRefresh,
	},
	rules: {
		...eslintPluginReactHooks.configs.recommended.rules,
		...eslintPluginReactRefresh.configs.recommended.rules,
		"react/jsx-boolean-value": "error",
		"react/jsx-filename-extension": [
			2,
			{ extensions: [".js", ".jsx", ".ts", ".tsx"] },
		],
		"react/jsx-no-target-blank": "off",
		"react/jsx-max-props-per-line": "off",
		"react/jsx-sort-props": [
			"error",
			{
				callbacksLast: true,
				shorthandFirst: true,
				reservedFirst: true,
				multiline: "last",
			},
		],
		"react/no-unknown-property": "off",
		"react/prop-types": "off",
		"react/react-in-jsx-scope": "off",
		"react-hooks/exhaustive-deps": "error",
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
	},
	settings: {
		react: {
			version: "detect",
		},
	},
};

const jsxA11yConfig = {
	...jsxA11yPlugin.flatConfigs.recommended,
	name: "jsxA11y",
	plugins: {
		"jsx-a11y": jsxA11yPlugin,
	},
	languageOptions: {
		...jsxA11yPlugin.flatConfigs.recommended.languageOptions,
		globals: {
			...globals.serviceworker,
			...globals.browser,
		},
	},
	rules: {
		...jsxA11yPlugin.flatConfigs.recommended.rules,
		"jsx-a11y/alt-text": ["error", { elements: ["img"], img: ["Image"] }],
		"jsx-a11y/aria-props": "error",
		"jsx-a11y/aria-proptypes": "error",
		"jsx-a11y/aria-unsupported-elements": "error",
		"jsx-a11y/role-has-required-aria-props": "error",
		"jsx-a11y/role-supports-aria-props": "error",
	},
};

const unicornConfig = {
	name: "unicorn",
	plugins: {
		unicorn: eslintPluginUnicorn,
	},
	rules: {
		...eslintPluginUnicorn.configs["flat/recommended"].rules,
		"unicorn/custom-error-definition": "error",
		"unicorn/empty-brace-spaces": "error",
		"unicorn/no-array-for-each": "off",
		"unicorn/no-array-reduce": "off",
		"unicorn/no-console-spaces": "error",
		"unicorn/no-null": "off",
		"unicorn/filename-case": "off",
		"unicorn/prevent-abbreviations": [
			"error",
			{
				replacements: {
					db: false,
					arg: false,
					args: false,
					env: false,
					fn: false,
					func: {
						fn: true,
						function: false,
					},
					prop: false,
					props: false,
					ref: false,
					refs: false,
				},
				ignore: ["semVer", "SemVer"],
			},
		],
	},
};

const importPlugin = {
	name: "import-x",
	plugins: {
		"import-x": eslintPluginImport,
	},
	settings: {
		"import-x/resolver-next": [
			createTypeScriptImportResolver({
				alwaysTryTypes: true,
				project: "./tsconfig.json",
			}),
		],
		"import-x/ignore": [
			".*/node_modules",
			"\\.(scss|css)$",
			"\\.(png|jpe?g|svg)",
		],
		"import-x/extensions": [".js", ".jsx", ".ts", ".tsx"],
	},
	rules: {
		...eslintPluginImport.flatConfigs.recommended.rules,
		"import-x/no-cycle": "error",
		"import-x/no-anonymous-default-export": "error",
		"import-x/no-restricted-paths": [
			"error",
			{
				zones: [
					...restrictedPaths,
					{
						target: "./src/features",
						from: "./src/routes",
						message: "Features cannot be imported outside of routes folder.",
					},
					{
						target: [
							"./src/components",
							"./src/hooks",
							"./src/lib",
							"./src/types",
							"./src/utils",
						],
						from: ["./src/features", "./src/routes"],
						message:
							"Shared modules cannot be imported outside of features or routes folders.",
					},
				],
			},
		],
	},
};

const eslintConfig = typescriptEslint.config(
	javascriptConfig,
	typescriptConfig,
	reactConfig,
	jsxA11yConfig,
	unicornConfig,
	importPlugin,
	prettierConfig,
);

eslintConfig.map((config) => {
	config.files = ["src/**/*.ts", "src/**/*.tsx", "e2e/**/*.ts"];
	config.ignores = [
		"build/**/*",
		"dist/**/*",
		"node_modules/**/*",
		".husky/**/*",
		"test-results/**/*",
		"playwright-report/**/*",
		".vitest-preview/**/*",
	];
});

export default eslintConfig;
