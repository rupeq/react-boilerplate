/* eslint-disable react-refresh/only-export-components */
import { I18nextProvider } from "react-i18next";
import { render as rtlRender } from "@testing-library/react";
import type { ReactElement, PropsWithChildren, FC } from "react";

import { init } from "@/i18n/tests";

import type { RenderType } from "./types";

export const defaults = {
	withI18n: true,
};

const I18nWrapper = ({ children }: PropsWithChildren): ReactElement => {
	const i18n = init();
	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

const render = <P extends object>({
	parameters = defaults,
	options = {},
	ui,
	props = {} as P,
}: RenderType<P>): ReturnType<typeof rtlRender> => {
	const Component = ui;
	const wrappers: Array<FC<PropsWithChildren>> = [];

	if (options.wrapper) {
		wrappers.push(options.wrapper as never);
	}

	if (parameters.withI18n) {
		wrappers.push(I18nWrapper);
	}

	const Wrapper = wrappers.reduce(
		(accumulator, WrapperComponent) =>
			({ children }: PropsWithChildren): ReactElement => (
				<WrapperComponent>{accumulator({ children })}</WrapperComponent>
			),
		({ children }: PropsWithChildren) => <>{children}</>
	);

	return rtlRender(<Component {...props} />, { ...options, wrapper: Wrapper });
};

export default render;
