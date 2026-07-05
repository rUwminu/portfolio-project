---
name: gsap
description: GSAP animation conventions for this repo — useGSAP hook, ScrollTrigger/ScrollSmoother setup, plugin registration. Use when writing or debugging animations.
---

# GSAP in this repo

GSAP **3.15** + `@gsap/react` (`useGSAP`). All Club plugins are included in gsap 3.15+ (ScrollSmoother, ScrambleText, SplitText, MorphSVG — no paid registration needed).

## Core pattern

Always animate inside `useGSAP` in a `"use client"` component — it auto-cleans up on unmount (replaces `useEffect` + `gsap.context`):

```tsx
"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger); // module scope, before component

const Section = () => {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      gsap.to(".item", { scrollTrigger: { trigger: ref.current, scrub: true }, y: 100 });
    },
    { scope: ref } // scopes selector strings to this subtree
  );
  return <div ref={ref}>…</div>;
};
```

- Pass `{ scope: ref }` so class selectors don't leak across sections.
- Pass `{ dependencies: [state] }` (optionally `revertOnUpdate: true`) when the animation depends on state.

## ScrollSmoother

Set up once per route group in a provider (see `app/(portfolio)/_components/GsapProvider.tsx`): wrapper + content refs, `ScrollSmoother.create({ wrapper, content, smooth, effects: true })`, placed in the group `layout.tsx`. Never create a second ScrollSmoother inside a page that already has the provider.

## Gotchas learned in this repo

- ScrollTrigger positions break when images/fonts load late — call `ScrollTrigger.refresh()` after layout-shifting loads, or give media explicit dimensions.
- With ScrollSmoother active, `position: fixed` elements must sit **outside** the smooth-content wrapper.
- Route changes: animations must be created in `useGSAP` (not raw `gsap.to` in render) so they're reverted on navigation; stale ScrollTriggers cause the scroll-top/redirect-overlay class of bugs fixed in recent commits.
- SSR: never touch `window`/GSAP outside `useGSAP`/effects — the component renders on the server first.
- `motion` (Framer Motion v12) is also installed; small UI micro-interactions may use it, but scroll-driven and timeline work stays in GSAP. Don't drive the same element with both.
