# promos-video

A data-driven Instagram Reels template built with [Remotion](https://www.remotion.dev/) (React + TypeScript).

Each Reel is **one JSON file + one product clip**. The design never changes; only the data does:

```json
{
  "group": "kate",
  "productName": "Balança Digital de Cozinha para Alimentos",
  "priceFrom": 25.99,
  "priceTo": 19.05,
  "videoSrc": "produto-18s.mp4",
  "openingEmoji": "🔥"
}
```

The template computes the discount, formats prices as `R$ 1.234,56`, and applies the
colors and call-to-action of the chosen group (`src/Reel/theme.ts`).

It is the video companion of [promos-affiliate-extension](https://github.com/iadeveloperr-hue/promos-affiliate-extension),
which extracts the same product data from Amazon BR, Mercado Livre and Shopee.

## Structure
- `src/Reel/Reel.tsx`: the template (layout and animation)
- `src/Reel/theme.ts`: per-group colors and CTA
- `props/*.json`: one file per Reel
- `public/`: product clips (not versioned) and the logo

## Run
```bash
npm install
npx remotion studio                      # preview
npx remotion render Reel out/Reel.mp4 --props=props/balanca-cozinha.json
```

Step-by-step guide in Portuguese: [COMO-USAR.md](COMO-USAR.md).
