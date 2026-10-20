# Globe Daily

Five-round daily geography game. Every round: drop a pin on the map.
Stack: Vite + d3-geo + world-atlas (Natural Earth 50m). No backend; streaks live in localStorage.

## Run locally
    npm install
    npm run dev          # http://localhost:5173
    npm run validate     # checks country names and content before you deploy
    npm run build        # outputs dist/

## Content
Edit `src/data.js` (cities, events, sentences). Country names must match world-atlas, so run `npm run validate`.

## Deploy free on Cloudflare Pages
1. Push this folder to a GitHub repo.
2. Cloudflare dashboard > Workers & Pages > Create > Pages > Connect to Git.
3. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
4. Every push to main redeploys. Your site is live at <project>.pages.dev.
