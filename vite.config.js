import {defineConfig} from "vite";
// Multi-page site: the game plus two static pages.
export default defineConfig({build:{rollupOptions:{input:{main:"index.html",privacy:"privacy/index.html",contact:"contact/index.html"}}}});
