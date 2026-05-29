import { config, fields, collection } from '@keystatic/core';

// Local filesystem in dev (no login needed); Keystatic Cloud in production —
// Cloud handles auth and commits to the connected GitHub repo. Editors log in
// at /admin via Keystatic Cloud (invite teammates in the Cloud dashboard).
const storage =
  process.env.NODE_ENV === 'production'
    ? ({ kind: 'cloud' } as const)
    : ({ kind: 'local' } as const);

const functionOptions = [
  { label: 'Sales', value: 'Sales' },
  { label: 'Customer Success', value: 'Customer Success' },
  { label: 'Revenue Operations', value: 'Revenue Operations' },
  { label: 'Demand Generation', value: 'Demand Generation' },
  { label: 'GTM Strategy', value: 'GTM Strategy' },
  { label: 'Cross-Functional', value: 'Cross-Functional' },
];

export default config({
  storage,
  cloud: { project: 'pikesquare/pikesquare-site' },
  ui: {
    brand: { name: 'PikeSquare' },
  },
  collections: {
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'src/content/articles/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'publishedDate'],
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
          slug: { label: 'URL slug', description: 'The /resources/… part of the address.' },
        }),
        description: fields.text({
          label: 'Summary',
          description: 'One or two sentences shown in the library list and previews.',
          multiline: true,
        }),
        publishedDate: fields.date({
          label: 'Published date',
          defaultValue: { kind: 'today' },
        }),
        author: fields.select({
          label: 'Author',
          options: [
            { label: 'Steve', value: 'Steve' },
            { label: 'Susan', value: 'Susan' },
          ],
          defaultValue: 'Steve',
        }),
        functions: fields.multiselect({
          label: 'Topics',
          description: 'Which GTM areas this article relates to.',
          options: functionOptions,
        }),
        linkedinUrl: fields.url({
          label: 'LinkedIn URL',
          description: 'Optional — link back to the original LinkedIn post.',
        }),
        content: fields.markdoc({ label: 'Body' }),
      },
    }),
    resources: collection({
      label: 'Resources (templates & guides)',
      slugField: 'title',
      path: 'src/content/resources/*',
      format: { data: 'yaml' },
      columns: ['title', 'type'],
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({
          label: 'Description',
          description: 'One or two sentences shown on the card.',
          multiline: true,
        }),
        type: fields.select({
          label: 'Type',
          options: [
            { label: 'Template', value: 'template' },
            { label: 'Guide', value: 'guide' },
          ],
          defaultValue: 'template',
        }),
        functions: fields.multiselect({
          label: 'Topics',
          description: 'Which GTM areas this relates to.',
          options: functionOptions,
        }),
        link: fields.url({
          label: 'Link (Google Drive / external)',
          description: 'Paste the share link to the file. Leave blank if this points to an on-site page below.',
        }),
        internalLink: fields.text({
          label: 'On-site page (optional)',
          description: 'For guides hosted on this site, e.g. /resources/pipeline-coverage. Leave blank if using a Drive link.',
        }),
        linkLabel: fields.text({
          label: 'Link label',
          description: 'e.g. "Download PDF", "Open", "Read the guide".',
        }),
      },
    }),
  },
});
