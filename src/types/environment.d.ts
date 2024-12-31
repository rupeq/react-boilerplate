// https://vitejs.dev/guide/env-and-mode.html
/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
