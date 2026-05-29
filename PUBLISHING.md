# Publishing & promoting an article

How Susan and Steve get a new article onto the PikeSquare site and use LinkedIn
to drive traffic to it. The goal is **clicks to pikesquare.co**, not just reach,
so LinkedIn is the funnel and the site is the destination.

## 1. Publish on the site (the source of truth)

1. Go to **pikesquare.co/keystatic** and log in (Keystatic Cloud / GitHub).
2. **Articles → Create**. Fill in:
   - **Title** — also sets the URL slug (the `/resources/…` part).
   - **Summary** — 1–2 sentences. Required. Shown on the library card and link previews.
   - **Published date**, **Author** (Steve or Susan).
   - **Topics** — pick the GTM areas (or *Perspectives* for non-GTM editorial pieces).
   - **LinkedIn URL** — paste the post link once it's live so the site cross-links back.
   - **Body** — the full article (markdown). Add a hero image at the top.
3. **Save**. It commits to GitHub, Vercel redeploys, and it appears at
   `pikesquare.co/resources/<slug>` within ~1–2 minutes.

## 2. Promote on LinkedIn (tease, don't dump)

Don't paste the whole article into LinkedIn — if people can read it all in-feed,
they have no reason to click through.

1. Post a **native hook**: the strongest 2–3 paragraphs, a provocative claim, or
   the setup of a story. End with a call to action ("full piece on our site →").
2. **Put the link in the first comment, not the post body**, and write
   "link in comments" in the post. LinkedIn suppresses reach on posts whose main
   payload is an outbound link; the first-comment trick keeps reach *and* gets the click.
3. Use the **UTM-tagged link** (see below) so the visit shows up in analytics.

## 3. Link format (so traffic is trackable)

Append UTM parameters to the article URL. Keep the campaign equal to the slug:

```
https://pikesquare.co/resources/<slug>?utm_source=linkedin&utm_medium=social&utm_campaign=<slug>
```

Example:

```
https://pikesquare.co/resources/in-defense-of-cac-ltv?utm_source=linkedin&utm_medium=social&utm_campaign=in-defense-of-cac-ltv
```

- `utm_source` — where the click came from (`linkedin`, `newsletter`, `x`, …).
- `utm_medium` — the channel type (`social`, `email`, …).
- `utm_campaign` — the article slug, so each piece is tracked separately.

## 4. See what's working

Web Analytics is enabled on the site (Vercel). In the Vercel dashboard →
project → **Analytics**, you can see:

- which articles get the most visits,
- how much traffic LinkedIn refers (by source / UTM),
- which pages people land on and where they go next.

Use this to learn which topics and hooks actually drive clicks, and double down.

## Quick checklist

- [ ] Article created in Keystatic with summary, topic, author, hero image
- [ ] Live at `pikesquare.co/resources/<slug>`
- [ ] LinkedIn URL pasted back into the article (cross-link)
- [ ] LinkedIn post: native hook + "link in comments"
- [ ] UTM-tagged link in the first comment
- [ ] Check Analytics after a few days
