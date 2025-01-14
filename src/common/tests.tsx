/* eslint-disable react-refresh/only-export-components */
import { render as rtlRender } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";

import { init } from "@/i18n/tests";

import type { RenderType, WrapperType } from "./types";

export const defaults = {
	withI18n: true,
};

const DefaultWrapper: WrapperType = ({ children }) => {
	return <>{children}</>;
};

const I18nWrapper: WrapperType = ({ children }) => {
	const i18n = init();
	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

const render = <P extends object>({
	parameters = {} as typeof defaults,
	options = {},
	ui,
	props = {} as P,
}: RenderType<P>): ReturnType<typeof rtlRender> => {
	const rtlRenderParameters: typeof defaults = { ...defaults, ...parameters };

	const Component = ui;
	const wrappers: Array<WrapperType> = [];

	if (options.wrapper) {
		wrappers.push(options.wrapper);
	}

	if (rtlRenderParameters.withI18n) {
		wrappers.push(I18nWrapper);
	}

	const Wrapper = wrappers.reduce(
		(Accumulator, WrapperComponent, cid): WrapperType => {
			const wrapper: WrapperType = ({ children }) => (
				<WrapperComponent>
					<Accumulator>{children}</Accumulator>
				</WrapperComponent>
			);
			wrapper.displayName = `__Wrapper__${cid}`;
			return wrapper;
		},
		DefaultWrapper,
	);

	return rtlRender(<Component {...props} />, {
		...rtlRenderParameters,
		wrapper: Wrapper,
	});
};

export default render;
