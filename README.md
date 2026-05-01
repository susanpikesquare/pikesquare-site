# PikeSquare website

Astro + Tailwind v4 site for **pikesquare.co**. Replaces the current Squarespace site.

## What's here

- **Home page** (`src/pages/index.astro`) — fully built. Demonstrates every component and section pattern.
- **9 stub pages** — services overview, 4 service pages, How We Work, About, Insights, Contact. Each has its hero in place plus a TODO block telling Claude Code what to build using the rewrite plan.
- **Design system** — colors, fonts, spacing tokens defined as Tailwind v4 theme variables in `src/styles/globals.css`.
- **Components** — `Nav`, `Footer`, `CTAButton`, `ServiceCard`, `FounderMomentCard`, plus `BaseLayout`.

The full positioning, page-by-page copy, and rationale lives at `~/Documents/Claude/Projects/Resume Update/pikesquare-website-rewrite-plan.docx` — Claude Code should reference it when filling in the stubs.

## First-time setup (do this once)

```bash
cd ~/Development/pikesquare-site
git init -b main
git config user.email "susan.m.mcgovern@gmail.com"
git config user.name "Susan McGovern"
```

## Running locally

You need Node 20+ (`node -v` to check).

```bash
npm install        # ~30 seconds, installs Astro + Tailwind + dev deps
npm run dev        # starts dev server at http://localhost:4321
```

Save any file and the page hot-reloads. Verified clean: `npm run build` produces 10 static HTML pages with zero errors and zero warnings.

```bash
npm run build     # production build (also runs astro check)
npm run preview   # preview the production build
```

## Project structure

```
pikesquare-site/
├── astro.config.mjs              # Astro + Tailwind v4 setup
├── package.json
├── tsconfig.json
├── public/
│   ├── favicon.svg               # Three pikes in a navy square
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── CTAButton.astro       # Primary site CTA
│   │   ├── FounderMomentCard.astro
│   │   ├── Footer.astro
│   │   ├── Nav.astro             # Sticky top nav, mobile-friendly
│   │   └── ServiceCard.astro
│   ├── layouts/
│   │   └── BaseLayout.astro      # Page chrome wrapper
│   ├── pages/                    # File-based routing
│   │   ├── about.astro
│   │   ├── contact.astro         # Form, currently pointing at a Formspree placeholder
│   │   ├── how-we-work.astro
│   │   ├── index.astro           # ← Home, fully built
│   │   ├── insights/index.astro
│   │   └── services/
│   │       ├── advisory.astro
│   │       ├── diagnostics.astro
│   │       ├── fractional-leadership.astro
│   │       ├── index.astro       # Services overview with comparison table
│   │       └── revops.astro
│   └── styles/
│       └── globals.css           # Tailwind import + design tokens
└── README.md
```

Pages map directly to URLs: `src/pages/services/advisory.astro` → `/services/advisory`.

## Design system

Defined in `src/styles/globals.css` as Tailwind v4 `@theme` variables. Use them as utility classes:

| Token | Class examples | Hex |
|-------|----------------|-----|
| `--color-ink` | `text-ink`, `bg-ink`, `border-ink` | `#0f1729` |
| `--color-deep` | `text-deep`, `bg-deep` | `#1f3a5f` |
| `--color-accent` | `text-accent`, `bg-accent` | `#0f766e` |
| `--color-bg` | `bg-bg` | `#fafaf7` |
| `--color-muted` | `text-muted` | `#5e6b80` |
| `--font-sans` | `font-sans` | Inter |
| `--font-display` | `font-display` | Inter |

Change a value in `@theme` and every utility updates everywhere.

## Deploying

### 1. Push to GitHub

```bash
cd pikesquare-site
git init
git add .
git commit -m "Initial scaffold"

# If you have the GitHub CLI:
gh repo create pikesquare-site --private --source=. --push

# Or, manually:
# - create an empty repo at github.com/new (name: pikesquare-site)
# - then:
git remote add origin git@github.com:YOUR_GITHUB_USERNAME/pikesquare-site.git
git branch -M main
git push -u origin main
```

### 2. Connect to Vercel

1. Go to <https://vercel.com/new>
2. Import the `pikesquare-site` repo
3. Vercel auto-detects Astro — accept defaults and click **Deploy**

The site goes live at `pikesquare-site.vercel.app` within ~30 seconds. Every push to `main` triggers an auto-deploy. Pull request previews work automatically.

### 3. Point pikesquare.co at Vercel (when ready to cut over)

1. Vercel → Project → **Settings** → **Domains** → add `pikesquare.co` and `www.pikesquare.co`
2. Vercel will show you the DNS records to add
3. Update DNS at your registrar (Squarespace or wherever pikesquare.co is registered)
4. Wait 5–60 minutes for propagation
5. Test the new site at the real domain
6. Cancel Squarespace once you're confident

For any deep links you want to preserve (old blog posts, etc.), add 301 redirects in `astro.config.mjs` under the `redirects` key.

## Forms

The contact page form (`src/pages/contact.astro`) is wired to a Formspree placeholder. To activate:

1. Sign up free at <https://formspree.io>
2. Create a new form, copy the endpoint URL
3. Paste it into `FORMSPREE_ENDPOINT` at the top of `contact.astro`

Submissions arrive in your email. Free tier handles 50 submissions/month.

**Alternative:** swap the entire form for a Calendly inline embed — skip the email round-trip and let people book directly.

## Working with Claude Code

This project is set up to be edited with Claude Code.

```bash
# install once
npm install -g @anthropic-ai/claude-code

# in this folder
cd pikesquare-site
claude
```

Good first asks for Claude Code:

- *"Build out the Fractional GTM Leadership page using the home page as a model and Section 6.3 of `~/Documents/Claude/Projects/Resume Update/pikesquare-website-rewrite-plan.docx`."*
- *"Build out all four service pages — same parallel structure: hero, when founders come to us, what we do, how we engage, FAQ, CTA."*
- *"Add a sticky 'Book a check-in' bar that appears after the user has scrolled past the hero."*
- *"Set up the Insights MDX content collection and seed with the four launch articles named in Section 6.9 of the rewrite plan."*
- *"Write meta descriptions and OG tags for every page."*
- *"Add Plausible analytics."*

## Open decisions (from the rewrite plan)

These are unresolved as of the scaffold; the home page uses the recommended defaults.

- **Tagline** — using Option A: *"Senior GTM firepower for founders building their first repeatable motion."* Section 4.6 of the plan has alternatives.
- **Pricing** — not published on the site. Revisit before launch.
- **Audience narrowing** — site assumes B2B SaaS only. Plan recommends keeping it that tight.
- **Partner names** — About page is stubbed without named partners. Decide whether to launch with names or hold to phase 2.
- **Case stories** — home page proof quotes are anonymized composites. Replace with real (named or anonymized) client stories before launch.

## Contact

Susan McGovern — susan.m.mcgovern@gmail.com
