import type { JSX } from "react";
import { useTranslation } from "react-i18next";

export const App = (): JSX.Element => {
	const { t } = useTranslation();
	return <div>{t`home.greeting`}</div>;
};
