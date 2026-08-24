# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev        # Next dev server, http://localhost:3000
npm run build      # production build; also runs lint + typecheck as part of `next build`
npm run start      # serve the production build
npm run lint       # eslint (flat config, next/core-web-vitals)
npm run typecheck  # tsc --noEmit
npm run format     # prettier --write
```

**There is no test runner and no CI.** Don't reference `npm test` — it doesn't exist. The verification gate is `npm run typecheck && npm run lint && npm run build`, plus a manual pass in the browser.

`npm run build` fails with `EPERM .next/trace` if a dev server is holding the lock. Stop the dev server first.

Node is pinned below 20 on the maintainer's machine (18.20.4), which is why Next is held at 15.x — **do not upgrade to Next 16**, it requires Node 20+. The 5 high-severity `npm audit` findings are all transitive through Next's own `postcss` and `sharp`; npm's only offered fix is downgrading to `next@9`. They're build-time-only surfaces on a static site. Leave them.

## State of the repo

This branch (`redesign`) holds a **complete rebuild**. Both apps are currently present:

- **Live/new:** `app/`, `components/`, `content/`, `lib/` — Next.js 15 App Router, React 19, TypeScript strict, Tailwind v4.
- **Dead/old:** `src/`, `index.html`, `vite.config.js`, and most of `public/*.png` — the 2023 Vite SPA. Kept only until the cutover is signed off; **don't edit it, don't port from it.**

The cutover (deleting the Vite app and orphaned images, including a 2.7 MB `about.png` and 2.2 MB `about2.png`) is deliberately not done — it waits on the maintainer verifying a deployed preview. Don't run it unprompted.

## Architecture

### Content is typed data, validated at load

All résumé content lives in `content/*.ts` and is parsed through zod schemas from `lib/schema.ts` at module load:

```ts
export const skills = z.array(skillGroupSchema).parse([...]);
```

**To change résumé facts, edit `content/` — never the JSX.** A malformed entry throws at build time rather than rendering a broken page or silently dropping a field. MDX was considered and rejected for exactly this reason.

`lib/projects.ts` derives the featured/archived split and `projectNeighbours(slug)` for prev/next. `lib/site.ts` holds the canonical URL and the `absolute()` helper used by metadata, OG images and JSON-LD.

### Confidentiality constraint on `content/roles.ts`

The maintainer works at Barclays and asked that only non-confidential detail appear. Internal host names, container/application-server names, and the business function of the systems are deliberately absent. Public framework and runtime versions (Spring, JDK, Kubernetes, SQL Server) are in scope and intentional — they're the keywords a Java SDE screen filters on. **Ask before adding any new specific about that work.**

### Styling: Tailwind v4 CSS-first, no config file

Everything lives in `app/globals.css`. There is no `tailwind.config.*`.

1. **Semantic tokens** — CSS custom properties named by *purpose* (`--label`, `--label-secondary`, `--separator`, `--fill`, `--bg-elevated`, `--accent`), each with a light / dark / increased-contrast value. Never write a hex at point of use.
2. **`@theme inline`** bridges them to Tailwind, so `text-label-secondary` emits a `var()` reference and follows runtime scheme switches instead of baking a value.
3. **Component classes** (`.btn`, `.chip`, `.card`, `.glass`, `.pipeline`, the `.t-*` type scale) sit in `@layer components`; the reset sits in `@layer base`.

**The cascade-layer rule is load-bearing.** Unlayered CSS outranks *every* cascade layer, so an unlayered `p { margin: 0 }` silently beats `mt-8` on that paragraph — this bug once disabled every margin utility on the site. Keep the reset and component classes inside their layers. The custom-property blocks (`:root`, `[data-theme]`, media overrides) stay *unlayered together*, since a layered `:root` would lose to the unlayered defaults.

### Design language: Apple HIG

Rules that were derived from the HIG references and should not be re-litigated:

- **One typeface**, the platform system stack. Zero webfonts — no third-party origin on the critical path.
- **Weights: Regular / Medium / Semibold / Bold only.** No light or hairline display type.
- **Liquid Glass on the sticky nav only.** Glass in the content layer is explicitly called out as creating confusing hierarchy, so cards and sections stay fully opaque.
- **Affordance never by colour alone** — links carry an underline, chips carry shape and weight.

### Accessibility contract

Every text token clears **WCAG AA** on the surfaces it actually sits on. If you change a colour, re-measure — and measure correctly:

- **Composite translucent backgrounds** down to an opaque base before computing luminance. Reading `backgroundColor` off a chip or the glass nav gives a meaningless number otherwise.
- **Disable transitions first.** The 300ms theme transition means a naive `getComputedStyle` read lands mid-swap and returns garbage. Inject `* { transition: none !important }`, force the theme, wait ~90ms, then read.
- `--accent` and `--accent-strong` are separate on purpose: `#0a84ff` is 5.8:1 as link text on black but only 3.65:1 as a *surface* under white text, so the filled control needs its own darker value.
- Filled-control hover **darkens**; any blue light enough to read as "brighter" drops white text below 4.5:1.

### Animation

`components/ui/Reveal.tsx` is the only mechanism — one IntersectionObserver flips `data-shown`, CSS transitions the rest. There is **no animation library** (`framer-motion` was removed; it cost ~40 kB of first-load JS). It fires once, and anything already scrolled past at mount shows immediately.

The hidden state is gated on a `.js` class set by the pre-paint script in `app/layout.tsx`, so with JavaScript unavailable nothing is ever invisible. `prefers-reduced-motion` is handled in CSS so it holds before hydration.

### Sections and anchors

`components/ui/Section.tsx` is the standard wrapper (id, eyebrow, `h2`, optional lede, `tinted` for alternating surface). Anchors are plain `id`s with `scroll-margin-top` — the old `.anchor { top: -100px }` hack is gone.

Heading hierarchy is **exactly one `h1`**, one `h2` per section, `h3` per item. The old site had a dozen competing `h1`s; don't reintroduce one.

**Adding a section** touches: `content/` (if data-driven), `components/home/X.tsx`, `app/page.tsx`, and the `NAV` array in `components/chrome/GlassNav.tsx`.

### Contact form

`components/home/ContactForm.tsx` → `app/actions/contact.ts`, a server action over Resend. zod validates server-side and echoes submitted values back on failure. There's an offscreen `aria-hidden` honeypot rejected server-side.

Needs `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (see `.env.example`). **Without them the form degrades deliberately** — it tells the visitor to email directly rather than pretending to send. The old Vite app hardcoded EmailJS credentials into the client bundle; don't reintroduce any client-side send.

### Assets

No remote origins. Icons are inline paths in `components/ui/Icon.tsx`, replacing the old devicon stylesheet and 17 individual jsDelivr SVG requests. `public/resume.pdf` is linked from the nav and hero.

The featured projects have **no screenshots** — the originals were unusable 375×375 and 500×500 squares. `components/work/Pipeline.tsx` stands in: a token-drawn signal-chain rail, which is also the site's signature element. If real screenshots arrive, route them through `next/image` with explicit dimensions and `sizes`.
