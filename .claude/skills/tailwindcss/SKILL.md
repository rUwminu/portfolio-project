---
name: tailwindcss
description: Tailwind CSS v4 conventions for this repo — CSS-first config, no tailwind.config file, shadcn + tw-animate-css. Use when styling components or editing CSS.
---

# Tailwind CSS v4 in this repo

Tailwind **v4** via `@tailwindcss/postcss` (see `postcss.config.mjs`). There is **no `tailwind.config.js`** — v4 is configured in CSS. Do not create a config file or suggest v3 syntax.

## Setup (`app/globals.css`)

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));
```

## v4 rules (differ from v3)

- Theme customization: use `@theme { --color-brand: …; --font-display: …; }` in CSS, not a JS config.
- Custom utilities: `@utility name { … }`; custom variants: `@custom-variant`.
- Arbitrary values still work: `w-[32rem]`, `bg-[#0a0a0a]`.
- Opacity modifiers: `bg-black/50`. `@apply` inside plain CSS files works but prefer utility classes in JSX.
- Dark mode is class-based via the `@custom-variant dark` above — toggled by a `.dark` ancestor.

## Repo conventions

- Class merging helpers available: `clsx`, `tailwind-merge`, `class-variance-authority` (cva) — shadcn stack. Use `cn()`-style merging when composing conditional classes.
- Animations: `tw-animate-css` classes are available, but complex/scroll animations use GSAP (see the `gsap` skill), not CSS.
- Per-showcase custom CSS lives in the route group's `style.css`; keep global additions in `globals.css` minimal.
- Mobile-first responsive: base styles then `md:` / `lg:` overrides (e.g. `px-2 md:px-4`). Past bugs here involved mobile-browser element squeezing — test responsive layouts at real device widths, not just DevTools.
