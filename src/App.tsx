import type { JSX } from "react";
import { useTranslation } from "react-i18next";

import css from "./App.module.css";

export const App = (): JSX.Element => {
	const { t } = useTranslation();
	return <div className={css["wrapper"]}>{t`home.greeting`}</div>;
};
