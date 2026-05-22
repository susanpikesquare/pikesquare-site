# Resources Management Guide

## Overview

Your resources are now organized by GTM function with full-text search capability. The system uses two files:

1. **`src/lib/resources-data.ts`** — Metadata file (manage here)
2. **`src/pages/resources/index-new.astro`** — Display page (no edits needed)

## How It Works

### Data Structure

Each resource has this structure:

```typescript
{
  id: 'unique-slug',
  title: 'Display Name',
  description: 'Short description...',
  functions: ['Sales', 'Demand Generation'], // can be multiple
  type: 'template' | 'guide' | 'framework' | 'assessment',
  driveLink: 'https://drive.google.com/file/d/FILE_ID/view',
  externalLink: 'https://...', // optional, for Google Slides, etc.
  tags: ['keyword1', 'keyword2'], // searchable
}
```

### Functions (for grouping)

- **Sales** — Sales pitch decks, processes, qualification, objection handling
- **Customer Success** — Onboarding, health scoring, operating models, retention
- **Revenue Operations** — CRM data, compensation, forecasting, metrics
- **Demand Generation** — Campaign planning, lead scoring, SDR workflows
- **GTM Strategy** — High-level frameworks, strategic planning, scaling
- **Cross-Functional** — Used across multiple functions (messaging, enablement)

## Adding a New Resource

### Step 1: Upload to Google Drive

1. Go to your shared PikeSquare resources folder in Google Drive
2. Upload your PDF or document
3. Right-click → **Share** → Get link (make sure it's viewable)
4. Copy the file ID from the URL:
   ```
   https://drive.google.com/file/d/[FILE_ID_HERE]/view
   ```

### Step 2: Add to resources-data.ts

Open `src/lib/resources-data.ts` and add an entry to the `resources` array:

```typescript
{
  id: 'sales-playbook-2026', // unique, lowercase, hyphenated
  title: 'Enterprise Sales Playbook',
  description: 'A step-by-step playbook for complex B2B sales cycles with multiple stakeholders.',
  functions: ['Sales'],
  type: 'template',
  driveLink: 'https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view',
  tags: ['sales', 'playbook', 'enterprise', 'complex-sales'],
},
```

### Step 3: Push to production

```bash
cd /Users/susanbamberger/Development/pikesquare-site
git add src/lib/resources-data.ts
git commit -m "Add: Enterprise Sales Playbook"
git push origin main
```

Vercel will auto-deploy within 1-2 minutes.

---

## Examples

### Example 1: Cross-functional resource

```typescript
{
  id: 'gtm-messaging',
  title: 'GTM Messaging Framework',
  description: 'A/B side approach: positioning on one side, sales guidance on the other.',
  functions: ['Sales', 'Demand Generation', 'GTM Strategy'], // multiple!
  type: 'template',
  externalLink: 'https://docs.google.com/presentation/d/...', // Google Slides
  tags: ['messaging', 'positioning', 'value-prop', 'sales'],
}
```

### Example 2: Assessment

```typescript
{
  id: 'cs-readiness',
  title: 'CS Operating Model Readiness',
  description: 'Self-assessment: is your CS model ready to scale?',
  functions: ['Customer Success'],
  type: 'assessment',
  driveLink: 'https://drive.google.com/file/d/.../',
  tags: ['cs', 'assessment', 'scaling', 'operating-model'],
}
```

---

## How the Page Works

### For Users

1. **Search bar** — Type any keyword (title, description, or tags)
   - Example: typing "pipeline" finds resources tagged with pipeline

2. **Function filters** — Click buttons to filter by area
   - "All Resources" shows everything
   - "Sales" shows only sales resources
   - "Cross-Functional" shows resources used across multiple areas

3. **Results grouped by function** — When filtered, resources appear under their function headings

4. **Clear filters** — Button appears when search or filters are active

### Behind the Scenes

- **Search is client-side** — fast, no API calls, works offline
- **Tags make search smart** — add keywords users might search for
- **Functions determine grouping** — a resource with multiple functions appears in each section
- **Types are visual** — small badge shows if it's a template, guide, framework, or assessment

---

## Best Practices

### IDs
- Use lowercase
- Use hyphens between words
- Keep them short but descriptive
- Examples: `sales-pitch`, `cs-metrics`, `demand-gen-framework`

### Tags
- Think about how users will search
- Include problem words: "churn", "forecast", "scaling", "hiring"
- Include category words: "sales", "template", "assessment"
- Include function names for cross-functional discovery
- Don't duplicate the title — add complementary keywords
- Minimum 3-4 tags per resource

### Descriptions
- One sentence summary
- Lead with what the user gets: "A step-by-step playbook...", "A framework for...", "Templates for..."
- Mention use case if relevant: "for enterprise SaaS", "at scale", "for SMBs"
- Keep under 150 characters

### Drive Links
- Use the full sharing link format: `https://drive.google.com/file/d/FILE_ID/view`
- Make sure the file is set to "Viewer" access (anyone with link can view)
- If it's a PDF, users can view in-browser and download
- If it's a Slides deck, use `externalLink` instead

---

## Migration Notes

**To replace the old resources page:**

1. When ready, rename `index-new.astro` → `index.astro` (overwrite old)
2. Delete the old page: `git rm src/pages/resources/index.astro`
3. Delete the old news/articles section (you can add it back to the new page if needed)

---

## Questions to Think About

- **Should we archive old resources?** Keep them or remove them? You could move older content to a "Archive" function.
- **Do we need version numbers?** For living docs that change, should users see "v2.0" in the title?
- **Assessment landing page?** Should GTM Readiness and AI Readiness still link to `/assessments` or could they live on the resources page too?
- **File storage:** As your library grows (50+, 100+), would you want to organize Drive folders by function as well?

Let me know if you want to adjust anything!
