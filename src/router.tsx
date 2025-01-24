import { Suspense, type JSX } from "react";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import { RouterDevtools } from "@lib/devtools";

import { routeTree } from "./routeTree.gen";

const router = createRouter({
	routeTree,
	defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export const Router = (): JSX.Element => {
	return (
		<Suspense>
			<RouterProvider router={router} />
			<RouterDevtools router={router} />
		</Suspense>
	);
};
