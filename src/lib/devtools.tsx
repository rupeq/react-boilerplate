import { lazy } from "react";

import { isProduction } from "@utils/environment";

export const RouterDevtools = isProduction
	? (): null => null
	: lazy(() =>
			import("@tanstack/router-devtools").then((module_) => ({
				default: module_.TanStackRouterDevtools,
			})),
		);
