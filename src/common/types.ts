import type { render } from "@testing-library/react";
import type { FC } from "react";

import type { defaults } from "./tests";

export type RenderType<P> = {
	ui: FC<P>;
	options?: Parameters<typeof render>[1];
	parameters?: typeof defaults;
	props?: P;
};
