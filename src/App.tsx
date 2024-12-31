import type { FC } from "react";
import { useTranslation } from "react-i18next";

import css from "./App.module.css";

export const App: FC = () => {
	const { t } = useTranslation();
	return <div className={css["wrapper"]}>{t`home.greeting`}</div>;
};
