import { en, ru } from "@assets/locales";

export const defaultNS = "translations";
export const fallbackLng = "en";
export const resources = {
	en: { [defaultNS]: en },
	ru: { [defaultNS]: ru },
} as const;
