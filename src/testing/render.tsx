import { render as rtlRender } from "@testing-library/react";
import type { ComponentType } from "react";

import {
	DefaultWrapper,
	I18nWrapper,
	type WrapperType,
} from "./render-wrappers";

const defaults = {
	withI18n: true,
};

export type RenderType<P> = {
	ui: ComponentType<P>;
	options?: Parameters<typeof rtlRender>[1];
	parameters?: typeof defaults;
	props?: P;
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
		(Accumulator, WrapperComponent): WrapperType => {
			const wrapper: WrapperType = ({ children }) => (
				<WrapperComponent>
					<Accumulator>{children}</Accumulator>
				</WrapperComponent>
			);
			wrapper.displayName = `${WrapperComponent.displayName}(${Accumulator.displayName})`;
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
