# Resources Page Reorganization — Setup & Next Steps

## ✅ What's Been Done

I've created a complete resource management system for you:

### 1. **Data Structure** (`src/lib/resources-data.ts`)
   - Central repository for all resource metadata
   - 20+ example resources pre-populated with your current content
   - TypeScript types for consistency
   - Helper functions for filtering and searching

### 2. **New Resources Page** (`src/pages/resources/index-new.astro`)
   - Modern, clean design with search bar
   - Function-based filtering (Sales, CS, RevOps, Demand Gen, GTM Strategy)
   - Real-time search across titles, descriptions, and tags
   - Results grouped by function
   - "Clear filters" button when filters/search are active

### 3. **Management Guide** (`RESOURCES_GUIDE.md`)
   - How to add new resources
   - How to structure the data
   - Best practices for titles, tags, descriptions
   - Examples and FAQ

---

## 🚀 Next Steps

### Option A: Preview First (Recommended)

1. **Don't delete the old page yet**
2. Access the new page at: `http://localhost:3000/resources-new` (if running locally)
3. Or push to production first: `git push origin main`
   - New page will be at: `https://pikesquare.co/resources-new`
4. **Test it out** — search, filter, verify all links work
5. **Once happy**, rename it:
   ```bash
   # In src/pages/resources/
   mv index-new.astro index.astro
   git add -A
   git commit -m "Replace old resources page with new searchable version"
   git push origin main
   ```

### Option B: Direct Replacement

1. Rename `index-new.astro` to `index.astro` immediately
2. Verify all old resources are in the data file
3. Push: `git add -A && git commit -m "New searchable resources page" && git push origin main`

---

## 📝 What You Need to Do

### Before Going Live:

1. **Update the Google Drive links in `resources-data.ts`**
   - Replace placeholder IDs with your actual Google Drive file IDs
   - Every resource with `driveLink` needs the real link
   - Easy to do: find/replace the placeholder URLs

2. **Verify all resources are included**
   - Check: Are all your current templates/guides in the list?
   - Look at your current resources page for anything I might have missed
   - Add any missing items following the guide

3. **Update/improve tags**
   - The tags I provided are decent, but you know your users better
   - Add more searchable keywords if useful
   - Remove tags that don't make sense in your context

4. **Test the search and filters**
   - Try searching for terms you think users would search
   - Filter by each function
   - Make sure grouping looks right

### Going Forward:

- **Add new resources** by updating `resources-data.ts` only
- **Never edit the page component** — all changes go in the data file
- **Keep Drive links organized** — consider a folder structure in Drive

---

## 📂 File Locations

```
pikesquare-site/
├── src/
│   ├── lib/
│   │   └── resources-data.ts       ← Update here to manage resources
│   └── pages/
│       └── resources/
│           └── index-new.astro    ← Rename to index.astro when ready
│
└── RESOURCES_GUIDE.md             ← Reference guide (you have this)
```

---

## 🎨 Page Features Breakdown

### Search
- Real-time as you type
- Searches: title, description, tags
- Case-insensitive
- No special operators needed (just plain text)

### Function Filters
- Single-select (only one function at a time)
- "All Resources" shows everything
- Shows count implicitly (by number of items)
- Visual feedback (active button is dark)

### Results Display
- Grouped by function header
- Cards show:
  - Title (bold, large)
  - Description
  - Type badge (small colored tag)
  - Link to drive/external link
- Hover effect for interactivity

### Responsive
- Mobile: single column
- Tablet: two columns
- Desktop: two columns
- Search and filters stack nicely

---

## 🔍 Current Resources Included

I've added these categories to the data file as examples:

**Assessments**
- GTM Readiness Assessment
- AI Readiness Assessment

**Sales** (3 resources)
- Sales Pitch Deck Template
- Enterprise Sales Stages
- Sales Kickoff & SKO Program

**Customer Success** (3 resources)
- CS Operating Model Design
- Customer Onboarding Playbook
- CS Metrics & Health Scoring

**Revenue Operations** (3 resources)
- Revenue Operations Model
- Sales Compensation Plan Design
- CRM Data Governance & Hygiene

**Demand Generation** (3 resources)
- Demand Generation Framework
- Campaign Playbook Template
- Lead Scoring Model Template

**GTM Strategy & Cross-Functional** (5 resources)
- GTM Conceptual Model
- GTM Messaging Framework (cross-functional)
- The Healthy Pipeline
- Revenue Enablement Model
- SaaS Enterprise Value Map

---

## ⚙️ How to Update Google Drive Links

### Get a Drive File ID:

1. Open the file in Google Drive
2. Look at the URL:
   ```
   https://drive.google.com/file/d/[THIS_PART]/view?usp=sharing
   ```
3. Copy that ID
4. In `resources-data.ts`, find the resource and update:
   ```typescript
   driveLink: 'https://drive.google.com/file/d/PASTE_ID_HERE/view',
   ```

### Quick Find/Replace (if all placeholder IDs are the same):
```
Find:    https://drive.google.com/file/d/example-
Replace: https://drive.google.com/file/d/YOUR_ACTUAL_ID/view
```

---

## 📊 Search Tag Examples

Good tags help users find content:

```typescript
// Sales example
tags: ['sales', 'pitch', 'deck', 'presentation', 'positioning', 'value-prop']

// CS example
tags: ['cs', 'customer-success', 'operating-model', 'scaling', 'tiering', 'maturity']

// RevOps example
tags: ['revops', 'compensation', 'comp-plan', 'quota', 'salesforce', 'crm']
```

---

## 🚨 Gotchas to Avoid

1. **Placeholder Drive IDs** — Make sure to replace the `example-*-id` placeholders with real IDs
2. **Duplicate content** — If you keep the old resources page, you'll have two pages. Decide which one to use.
3. **Missing links** — If a resource has no `driveLink` or `externalLink`, it won't have a download button
4. **Functions** — If you create a resource with 0 functions, it won't show up anywhere. Always include at least one.
5. **Search expectations** — Search won't find anything if your tags don't match user queries. Test with realistic searches.

---

## 💡 Future Enhancements (Optional)

Once this is live, you could add:

1. **Resource type filtering** — "Show only templates" or "Show only guides"
2. **Sorting options** — by date added, alphabetical, most popular
3. **"Recently added" section** — at the top for new resources
4. **Download counter** — track what's most useful
5. **User ratings** — "Was this helpful?"
6. **Comments/feedback** — users suggest improvements
7. **Video resources** — add video type alongside template/guide/framework
8. **Related resources** — "People who viewed this also viewed..."

---

## ✋ Questions?

Refer to `RESOURCES_GUIDE.md` for detailed instructions on:
- Adding resources
- Structuring data
- Best practices
- ID naming conventions
- Tag strategies

Good to go! 🎉
