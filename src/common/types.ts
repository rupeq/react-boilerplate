import type { render } from "@testing-library/react";
import type { ComponentType, ReactNode } from "react";

import type { defaults } from "./tests";

export type WrapperType = ComponentType<{ children: ReactNode }>;

export type RenderType<P> = {
	ui: ComponentType<P>;
	options?: Parameters<typeof render>[1];
	parameters?: typeof defaults;
	props?: P;
};
