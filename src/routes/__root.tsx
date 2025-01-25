import type { JSX } from "react";
import { createRootRoute } from "@tanstack/react-router";

const RootComponent = (): JSX.Element => {
	return (
		<div className="flex h-dvh items-center justify-center">Hello world</div>
	);
};

export const Route = createRootRoute({
	component: RootComponent,
});
