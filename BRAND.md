# PikeSquare brand guide

Source of truth for how PikeSquare looks, sounds, and shows up. Use this
when writing for the site, designing a deck, briefing a contractor, or
sending an email signature. A visual version of this page lives at
[pikesquare.co/brand](https://pikesquare.co/brand).

## Who we are

PikeSquare gives early-stage and scale-up SaaS founders **senior GTM
operators** — fractional leaders, advisors, strategists, and ops — sized
to where they are. We've sat in the chairs we now help our clients fill.

Audience: founders and revenue leaders at $1M–$50M ARR SaaS companies who
need experienced help but not full-time hires.

## Voice

We sound like a senior operator who's been there — confident, direct,
plain-spoken. We don't sound like a brochure.

**Do:**
- Lead with a point of view. Take a position.
- Use plain English. "Helps you close more deals," not "drives revenue acceleration."
- Keep sentences short. Lean on the em dash — it's a feature, not a bug.
- Write the way you'd talk to a smart CEO over coffee.
- End headlines with a period when it adds finality.

**Don't:**
- Pile on adjectives. "World-class, best-in-breed, enterprise-grade" — pick one or none.
- Hedge. ("It can sometimes be the case that…")
- Use buzzwords without a concrete claim behind them.
- Write in passive voice when active works.

**Voice samples that hit the mark:**
- *"Senior GTM operators for startups and scale-ups."*
- *"Selling on bettER, fastER, cheapER gets disruptive tech stuck against incumbents."*
- *"Price is your fair share of the value you create."*

## Logo

Files in `public/brand/`:

| File | When to use |
|---|---|
| `logo.png` | Primary wordmark — the "PikeSquare" wordmark with the pike-square mark to the left. Use everywhere by default. |
| `logo-square.png` | Square lockup — for social avatars, app icons, square card placements. |
| `icon.png` / `icon-512.png` | The pike-square symbol alone — favicons, small UI surfaces, watermarks. |

**Clear space.** Give the logo room — at least the height of the "P" on all sides.

**Don't.** Don't recolor the wordmark, stretch it, add drop shadows, or place it on busy photos. If a background is dark or busy, place a solid `bg` panel behind it.

## Color

The brand palette is defined as CSS variables in `src/styles/globals.css`
and used everywhere as Tailwind utility classes (e.g. `text-deep`,
`bg-accent`). Treat the names — not the hex codes — as canonical: the
hex can be tuned, the role shouldn't change.

### Primary

| Name | Hex | Tailwind | Use |
|---|---|---|---|
| **Deep** | `#202971` | `text-deep`, `bg-deep` | Primary navy. Wordmark, headlines, primary buttons. |
| **Accent** | `#FF8001` | `text-accent`, `bg-accent` | Primary orange. The pike-square mark, hover states, callouts, key emphasis. |
| **Ink** | `#210D10` | `text-ink`, `bg-ink` | Near-black for body text. |
| **BG** | `#fafaf7` | `bg-bg` | Warm off-white. Default page background. |

### Supporting

| Name | Hex | Tailwind | Use |
|---|---|---|---|
| Muted | `#594E86` | `text-muted` | Secondary body text, captions. |
| Deep soft | `#A7ABC7` | `bg-deep-soft` | Tinted backgrounds, dividers, soft chips. |
| Accent soft | `#FFBB8A` | `bg-accent-soft` | Soft callouts, illustrative accents. |
| Muted soft | `#938CB1` | `text-muted-soft` | Tertiary text, placeholders. |

### Editorial / illustration

| Name | Hex | Tailwind | Use |
|---|---|---|---|
| Rust | `#802101` | `text-rust` | Editorial / data viz only. |
| Sun | `#FFDB01` | `bg-sun` | Editorial / data viz only. |
| Sea | `#3F94B2` | `bg-sea` | Editorial / data viz only. |

**Rules of thumb.** Deep + Accent is the brand. Everything else is supporting. Don't introduce new colors into UI without a real reason — and never use Rust/Sun/Sea in primary UI elements; they're for charts and editorial illustrations.

## Typography

**Inter** is the only font. Used as both display (for headlines) and body (for text). Weights in active use:

| Weight | Use |
|---|---|
| 400 (regular) | Body |
| 500 (medium) | Small UI labels, captions |
| 600 (semibold) | Buttons, table headers, inline emphasis |
| 700 (bold) | Section headings (`h2`, `h3`) |
| 800 (extrabold) | Page headlines (`h1`), display |

Web font is loaded from Google Fonts in `BaseLayout.astro` with the weights above.

### Type scale (live on the site)

Tailwind utilities, not arbitrary px values:

- **H1 / hero headline** — `text-4xl md:text-6xl font-bold tracking-tight font-display text-deep`
- **H2 / section heading** — `text-3xl font-bold tracking-tight text-deep`
- **H3 / sub-section** — `text-xl md:text-2xl font-bold text-deep`
- **Body lead** — `text-lg md:text-xl text-muted`
- **Body** — `text-base text-ink leading-relaxed`
- **Small / meta** — `text-sm text-muted` or `text-xs uppercase tracking-wider text-accent` for eyebrows

## UI patterns

**Primary CTA button.** Rounded-full, navy fill, white text, hover orange.
```html
<a class="inline-flex items-center rounded-full bg-deep px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent">…</a>
```

**Card.** Rounded-2xl, hairline border, off-white background.
```html
<article class="rounded-2xl border border-ink/10 bg-bg p-8">…</article>
```

**Eyebrow.** Small uppercase orange label above a heading.
```html
<p class="text-sm font-semibold uppercase tracking-wider text-accent">Resources</p>
```

**Container.** `mx-auto max-w-6xl px-6` for content, `max-w-4xl` for narrow text-heavy pages, `max-w-3xl` for prose.

## Imagery

- **Photography.** Real, warm, human. Founders, teams, workspaces. Avoid stock-image cliché (handshakes, lightbulbs, suits-with-charts).
- **Article hero images.** Editorial illustrations or photographs that *mean* something to the piece. Keep them landscape (3:2) and ~1200×800 minimum.
- **Diagrams.** Stick to the brand palette. Two-color where possible (deep + accent). Use Sun/Sea/Rust only in multi-series charts.

## Email signature

Plain, no banner image. Use this format:

```
Susan McGovern Bamberger
Co-founder · PikeSquare
info@pikesquare.co · pikesquare.co
Book a meeting: https://cal.com/pikesquare/30min
```

## Where the brand lives in code

- **Colors + fonts:** `src/styles/globals.css` — change once, propagates everywhere.
- **Logo files:** `public/brand/*`
- **Layout shell:** `src/layouts/BaseLayout.astro`
- **Shared values (scheduling URL, contact email):** `src/lib/site.ts`
- **CTA component:** `src/components/CTAButton.astro`
- **Visual brand page:** `src/pages/brand.astro`

If you change a color, font, or logo, update both `globals.css` (or `public/brand/`) and this document so they stay in sync.
