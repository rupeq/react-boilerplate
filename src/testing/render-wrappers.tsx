import type { ComponentType, ReactNode } from "react";
import { I18nextProvider } from "react-i18next";

import { init as i18nInit } from "./i18n";

export type WrapperType = ComponentType<{ children: ReactNode }>;

export const DefaultWrapper: WrapperType = ({ children }) => {
	return <>{children}</>;
};

export const I18nWrapper: WrapperType = ({ children }) => {
	const i18n = i18nInit();
	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

DefaultWrapper.displayName = "Fragment";
I18nWrapper.displayName = "i18n";
