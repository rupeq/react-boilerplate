import en from "@/assets/locales/en/translations.json";
import ru from "@/assets/locales/ru/translations.json";

export const defaultNS = "translations";
export const fallbackLng = "en";
export const resources = {
	en: { [defaultNS]: en },
	ru: { [defaultNS]: ru },
} as const;
