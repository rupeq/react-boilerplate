import { screen } from "@testing-library/react";

import { render } from "@/common";

import { App as ui } from "./App";

describe("App", () => {
	it("should render hello world", () => {
		render({ ui });
		expect(screen.getByText("Hello, World!")).toBeInTheDocument();
		screen.debug();
	});
});
