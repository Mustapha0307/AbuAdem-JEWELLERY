# Luxury jewelry landing
1. `npm i && npm run dev`
2. Fill in every field in `src/config/boutique.ts` (empty links are hidden, name/monogram are placeholders).
3. Gold prices: edit `public/gold-prices.json` (`updatedAt` as ISO date, e.g. "2026-11-22T10:30:00+01:00", `perGram` in DZD; `previousPerGram` enables the up/down arrow). Keep `"source": "manual"` — it is never shown as Live. If you later connect a documented API, point `goldDataUrl` to an endpoint returning the same JSON with `"source": "api"`.
