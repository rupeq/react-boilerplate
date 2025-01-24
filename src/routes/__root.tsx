import type { JSX } from "react";
import { createRootRoute } from "@tanstack/react-router";

const RootComponent = (): JSX.Element => {
	return <div>123</div>;
};

export const Route = createRootRoute({
	component: RootComponent,
});
