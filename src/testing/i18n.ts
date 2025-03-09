import { initReactI18next } from "react-i18next";
import i18n, { type i18n as i18nType, type InitOptions } from "i18next";

import { defaultNS, fallbackLng, resources } from "@/utils/i18n-shared";

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
