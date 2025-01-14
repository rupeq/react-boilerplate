import path from "node:path";

import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: path.join(__dirname, "e2e"),
	testIgnore: ["**/matchers/**", "**/test-helpers/**"],
	testMatch: "**/*.test.ts",

	timeout: 15 * 1000,

	outputDir: path.join(__dirname, ".playwright", "results"),
	snapshotDir: path.join(__dirname, ".playwright", "snapshots"),

	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	use: {
		screenshot: "only-on-failure",
		video: "retain-on-failure",
		trace: "retain-on-failure",
		baseURL: process.env.BASE_URL || "http://localhost:3000",
		viewport: {
			width: 1080,
			height: 768,
		},
	},
	expect: {
		toHaveScreenshot: {
			animations: "disabled",
		},
	},
	projects: [
		{
			name: "chromium",
			use: devices["Desktop Chrome"],
		},
		{
			name: "firefox",
			use: devices["Desktop Firefox"],
		},
		{
			name: "webkit",
			use: devices["Desktop Safari"],
		},
		{
			name: "mobile-chromium",
			use: devices["Pixel 5"],
		},
		{
			name: "mobile-webkit",
			use: devices["iPhone 13"],
		},
	],
	webServer: {
		command: "pnpm run dev",
		url: "http://127.0.0.1:3000",
		reuseExistingServer: !process.env.CI,
	},
});
