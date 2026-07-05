---
name: nextjs
description: Next.js conventions for this repo — App Router route groups, client/server component boundaries, webpack builds. Use when creating pages, layouts, or components in app/.
---

# Next.js in this repo

Next.js **16.2.4** (App Router), React **19.2.4**, TypeScript. Builds run with the `--webpack` flag (`npm run dev` / `npm run build`), not Turbopack — webpack is required for `@svgr/webpack` SVG imports.

## Project structure

Each showcase/landing page lives in its own **route group** under `app/`:

```
app/(portfolio)/
  portfolio/            → route segment (page.tsx, layout.tsx, nested routes)
  _components/          → private folder: shared components for this group
  _sections/            → page sections (HeroSection.tsx, AboutMeSection.tsx, …)
  _constants/           → static data (index.ts or index.tsx)
  _context/             → React contexts for this group
```

Existing groups: `(portfolio)`, `(awwwards)`, `(stanlybottle)`, `(ninekitchen)`, `(recordlike)`. When adding a new showcase page, follow this same pattern: new route group, underscore-prefixed private folders, sections split into one file per section.

## Conventions

- Components are arrow functions with a default export at the bottom (`const X = () => {...}; export default X;`).
- Anything using GSAP, refs, state, or browser APIs needs `"use client"` at the top — nearly all section components here are client components.
- Group-specific styles go in a `style.css` next to the route segment (see `app/(awwwards)/awwwards/style.css`); global styles in `app/globals.css`.
- Group layouts (`layout.tsx` inside the group) wrap pages with providers like `GsapProvider` — put smooth-scroll/plugin setup there, not in pages.
- Root layout is `app/layout.tsx`; root page `app/page.tsx` links to the showcases.
