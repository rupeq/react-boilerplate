import type { JSX } from "react";
import { useTranslation } from "react-i18next";
import { createRootRoute } from "@tanstack/react-router";

const RootComponent = (): JSX.Element => {
	const { t } = useTranslation();

	return (
		<div className="flex h-dvh items-center justify-center">{t`home.greeting`}</div>
	);
};

export const Route = createRootRoute({
	component: RootComponent,
});
