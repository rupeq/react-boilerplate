import i18n, { type InitOptions, type i18n as i18nType } from "i18next";
import { initReactI18next } from "react-i18next";

import { defaultNS, fallbackLng, resources } from "./shared";

const i18nOptions: InitOptions = {
	defaultNS,
	ns: [defaultNS],
	debug: true,
	fallbackLng: fallbackLng,
	resources,
};

export const init = (): i18nType => {
	void i18n.use(initReactI18next).init(i18nOptions);
	return i18n;
};
