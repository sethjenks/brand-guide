# Sample Brand — Visual Guide

Next.js App Router app that presents the brand compiled from the repo root.

```bash
npm install
npm run dev
```

`npm run dev` / `npm run build` run `npm run compile` first:

1. `brand.md` (+ examples / rules / templates) → `../brand.json` and public agent source `public/brand.txt`
2. `brand.md` Design system → `src/styles/tokens.generated.css` + color sync in `brand.json` + DTCG `tokens.json`
3. `brand/overrides.css` → `src/styles/brand.overrides.css`
4. `brand/assets/` → `public/brand/`

Open [http://localhost:3000](http://localhost:3000).
The overview links to [http://localhost:3000/brand](http://localhost:3000/brand), which serves the complete brand guide as plain text for agents. The direct file is `/brand.txt`.

- **Theme:** edit root `brand.md` → Design system, then `npm run compile`
- **Copy:** edit root `brand.md` (Strategy / Voice / Visual and related markdown), then compile
- **Setup callout:** `../brand/setup.json`
- **Light CSS tweaks:** `../brand/overrides.css`
- **Do not edit** shell UI for theming — see `../UPSTREAM.md`

## Icons

Default set is [Lucide](https://lucide.dev/) via `lucide-react`. Import from the adapter so the library stays swappable:

```tsx
import { Icons } from "@/components/icons";

<Icons.ChevronDown />
```

To swap providers, edit [`src/components/icons.tsx`](src/components/icons.tsx) only — keep the same `Icons` keys and `IconProps`.
