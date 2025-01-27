import { initReactI18next } from "react-i18next";
import i18n, { type InitOptions } from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend, { type HttpBackendOptions } from "i18next-http-backend";

import { isProduction } from "./environment";
import { defaultNS, fallbackLng } from "./i18n-shared";

const i18nOptions: InitOptions<HttpBackendOptions> = {
	defaultNS,
	ns: [defaultNS],
	debug: !isProduction,
	fallbackLng: fallbackLng,
	interpolation: {
		escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
	},
	backend: {
		loadPath: isProduction
			? "locales/{{lng}}/translations.json"
			: "src/assets/locales/{{lng}}/translations.json",
	},
};

void i18n
	.use(initReactI18next)
	.use(LanguageDetector)
	.use(Backend)
	.init<HttpBackendOptions>(i18nOptions);

export { default as i18n } from "i18next";
