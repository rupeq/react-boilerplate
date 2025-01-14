// @ts-check

/** @type {import('stylelint').Config} */
const config = {
	extends: ["stylelint-prettier/recommended"],
	customSyntax: "postcss-scss",
	plugins: ["stylelint-order", "stylelint-scss"],
	rules: {
		"order/order": [
			{
				type: "at-rule",
				name: "mixins-without-media",
				parameter: "^((?!media\\-).)*$",
			},
			"declarations",
		],
		"order/properties-alphabetical-order": true,
		"max-nesting-depth": 8,
		"no-duplicate-selectors": true,
		"color-hex-length": "long",
		"color-named": "never",
		"selector-attribute-quotes": "always",
		"font-family-name-quotes": "always-where-recommended",
		"comment-whitespace-inside": "always",
		"comment-empty-line-before": "always",
		"rule-empty-line-before": "always",
		"selector-pseudo-element-colon-notation": "double",
	},
};

export default config;
