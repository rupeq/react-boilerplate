import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Router } from "./router";

import "@assets/styles/normalize.css";
import "@utils/i18n";

const rootElement = document.querySelector("#root");

if (!rootElement) {
	throw new Error("No root element found!");
}

if (!rootElement.innerHTML) {
	const root = createRoot(rootElement);
	root.render(
		<StrictMode>
			<Router />
		</StrictMode>,
	);
}
