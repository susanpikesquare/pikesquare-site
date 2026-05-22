// Resource management file — update this when adding new content
// All files should be stored in a Google Drive folder and linked below

export type ResourceFunction = 'Sales' | 'Customer Success' | 'Revenue Operations' | 'Demand Generation' | 'GTM Strategy' | 'Cross-Functional';
export type ResourceType = 'template' | 'guide' | 'framework' | 'assessment';

export interface Resource {
  id: string;
  title: string;
  description: string;
  functions: ResourceFunction[]; // can belong to multiple functions
  type: ResourceType;
  driveLink?: string; // Google Drive link to the file
  externalLink?: string; // Alternative external link (like Google Slides)
  tags: string[]; // searchable keywords
}

export const resources: Resource[] = [
  // ===== ASSESSMENTS =====
  {
    id: 'gtm-readiness',
    title: 'GTM Readiness Assessment',
    description: 'Rate yourself on six core GTM dimensions. Five minutes. See where you stand and what gaps are holding you back.',
    functions: ['GTM Strategy'],
    type: 'assessment',
    tags: ['assessment', 'gtm', 'readiness', 'diagnostic', 'self-evaluation'],
  },
  {
    id: 'ai-readiness',
    title: 'AI Readiness Assessment',
    description: 'Understand your AI maturity across data, adoption, strategy, team, revenue, and governance. Find your biggest opportunities.',
    functions: ['GTM Strategy'],
    type: 'assessment',
    tags: ['assessment', 'ai', 'readiness', 'diagnostic', 'adoption'],
  },

  // ===== SALES TEMPLATES & GUIDES =====
  {
    id: 'sales-pitch-deck',
    title: 'Sales Pitch Deck Template',
    description: 'A proven pitch deck structure for enterprise SaaS. Includes positioning, value prop, social proof, and close.',
    functions: ['Sales'],
    type: 'template',
    driveLink: 'https://drive.google.com/file/d/example-pitch-deck-id/view',
    tags: ['sales', 'pitch', 'deck', 'presentation', 'positioning'],
  },
  {
    id: 'enterprise-sales-stages',
    title: 'Enterprise Sales Stages',
    description: 'A baseline definition of sales stages for enterprise B2B — clean inputs for forecasting and conversion analysis.',
    functions: ['Sales'],
    type: 'guide',
    driveLink: 'https://drive.google.com/file/d/example-sales-stages-id/view',
    tags: ['sales', 'stages', 'forecast', 'pipeline', 'enterprise'],
  },
  {
    id: 'sales-kickoff-skd',
    title: 'Sales Kickoff & SKO Program',
    description: 'A framework for running effective sales kickoffs and ongoing sales kickoff programs. Includes agenda templates and measurement.',
    functions: ['Sales'],
    type: 'guide',
    driveLink: 'https://drive.google.com/file/d/example-sko-id/view',
    tags: ['sales', 'kickoff', 'enablement', 'training', 'sko'],
  },

  // ===== CUSTOMER SUCCESS TEMPLATES & GUIDES =====
  {
    id: 'cs-operating-model',
    title: 'CS Operating Model Design',
    description: 'How to design customer success operating models that scale from $5M to $50M+ in ARR. Includes service tiering, staffing models, and automation readiness.',
    functions: ['Customer Success'],
    type: 'guide',
    driveLink: 'https://drive.google.com/file/d/example-cs-model-id/view',
    tags: ['cs', 'customer-success', 'operating-model', 'scaling', 'tiering'],
  },
  {
    id: 'cs-onboarding-playbook',
    title: 'Customer Onboarding Playbook',
    description: 'A step-by-step playbook for designing and running customer onboarding. Includes timeline, key activities, and success metrics.',
    functions: ['Customer Success'],
    type: 'template',
    driveLink: 'https://drive.google.com/file/d/1C1kCHwqwAcOllTL4p3P2YIWeqJoI5X8xvSzcWmvTXK0/view',
    tags: ['cs', 'onboarding', 'playbook', 'customer-success', 'implementation'],
  },
  {
    id: 'cs-metrics-health',
    title: 'CS Metrics & Health Scoring',
    description: 'A comprehensive guide to CS metrics, SLAs, and health scoring. Includes predictive churn models and expansion indicators.',
    functions: ['Customer Success'],
    type: 'guide',
    driveLink: 'https://drive.google.com/file/d/example-cs-metrics-id/view',
    tags: ['cs', 'metrics', 'health-scoring', 'churn', 'expansion'],
  },

  // ===== REVENUE OPERATIONS TEMPLATES & GUIDES =====
  {
    id: 'revenue-operations-model',
    title: 'Revenue Operations Model',
    description: 'A simple graphic that lays out the major functions of revenue operations and how they interconnect.',
    functions: ['Revenue Operations'],
    type: 'framework',
    driveLink: 'https://drive.google.com/file/d/example-revops-model-id/view',
    tags: ['revops', 'revenue-operations', 'operations', 'framework', 'model'],
  },
  {
    id: 'sales-comp-plan',
    title: 'Sales Compensation Plan Design',
    description: 'A framework for designing effective sales compensation plans. Includes quota-setting, accelerators, and tie-outs to business outcomes.',
    functions: ['Revenue Operations', 'Sales'],
    type: 'guide',
    driveLink: 'https://drive.google.com/file/d/example-comp-plan-id/view',
    tags: ['revops', 'compensation', 'comp', 'quota', 'incentives'],
  },
  {
    id: 'crm-data-governance',
    title: 'CRM Data Governance & Hygiene',
    description: 'Best practices for CRM data quality, governance, and maintenance. Includes audit processes and ownership models.',
    functions: ['Revenue Operations'],
    type: 'guide',
    driveLink: 'https://drive.google.com/file/d/example-crm-governance-id/view',
    tags: ['revops', 'crm', 'data', 'salesforce', 'governance', 'hygiene'],
  },

  // ===== DEMAND GENERATION TEMPLATES & GUIDES =====
  {
    id: 'demand-generation-framework',
    title: 'Demand Generation Framework',
    description: 'A sustainable demand-generation framework for SaaS — beyond tactical SDR management or marketing campaigns.',
    functions: ['Demand Generation'],
    type: 'framework',
    driveLink: 'https://drive.google.com/file/d/example-demandgen-id/view',
    tags: ['demand-gen', 'demand-generation', 'marketing', 'pipeline', 'sdr'],
  },
  {
    id: 'campaign-playbook',
    title: 'Campaign Playbook Template',
    description: 'A repeatable playbook for planning, executing, and measuring marketing campaigns. Includes campaign brief, timeline, and success metrics.',
    functions: ['Demand Generation'],
    type: 'template',
    driveLink: 'https://drive.google.com/file/d/example-campaign-id/view',
    tags: ['demand-gen', 'campaign', 'marketing', 'playbook', 'template'],
  },
  {
    id: 'lead-scoring-model',
    title: 'Lead Scoring Model Template',
    description: 'A lead scoring framework that helps sales and marketing prioritize prospects. Includes explicit and implicit scoring.',
    functions: ['Demand Generation', 'Revenue Operations'],
    type: 'template',
    driveLink: 'https://drive.google.com/file/d/example-scoring-id/view',
    tags: ['lead-scoring', 'demand-gen', 'marketing', 'qualification'],
  },

  // ===== GTM STRATEGY & CROSS-FUNCTIONAL =====
  {
    id: 'gtm-conceptual-model',
    title: 'GTM Conceptual Model',
    description: 'How the major go-to-market functions relate — strategy, motion, message, process, talent, and operations.',
    functions: ['GTM Strategy'],
    type: 'framework',
    driveLink: 'https://drive.google.com/file/d/example-gtm-model-id/view',
    tags: ['gtm', 'strategy', 'model', 'framework'],
  },
  {
    id: 'messaging-framework',
    title: 'GTM Messaging Framework',
    description: 'The "A Side" and "B Side" approach to messaging — positioning and value props on one side, sales guidance and objection handling on the other.',
    functions: ['GTM Strategy', 'Sales', 'Demand Generation'],
    type: 'template',
    externalLink: 'https://docs.google.com/presentation/d/1PtDxrjZ4bGn_2P7NwYXj4iz1a5cNPOLg8Gz1gTfTX5U/edit?usp=sharing',
    tags: ['messaging', 'positioning', 'value-prop', 'sales', 'marketing', 'gtm'],
  },
  {
    id: 'healthy-pipeline',
    title: 'The Healthy Pipeline',
    description: 'Revenue leaders obsess over pipeline. Before there\'s revenue — before you can plan, forecast, or diagnose any GTM issue — you must first understand pipeline.',
    functions: ['GTM Strategy', 'Sales'],
    type: 'guide',
    driveLink: 'https://drive.google.com/file/d/example-pipeline-id/view',
    tags: ['pipeline', 'forecast', 'sales', 'gtm', 'revenue'],
  },
  {
    id: 'revenue-enablement-model',
    title: 'Revenue Enablement — Conceptual Model',
    description: 'An overview of the key revenue-enablement functions and how they fit together.',
    functions: ['Cross-Functional'],
    type: 'framework',
    driveLink: 'https://drive.google.com/file/d/example-enablement-id/view',
    tags: ['enablement', 'training', 'sales', 'revenue', 'framework'],
  },
  {
    id: 'saas-value-map',
    title: 'SaaS Enterprise Value Map',
    description: 'A reference model for mapping product capabilities to the business outcomes enterprise buyers care about.',
    functions: ['Sales', 'Demand Generation'],
    type: 'framework',
    driveLink: 'https://drive.google.com/file/d/example-valuemap-id/view',
    tags: ['value-proposition', 'positioning', 'enterprise', 'messaging'],
  },
  {
    id: 'operational-maturity',
    title: 'Operational Maturity: From Heroes to Process to Systems',
    description: 'How operating models evolve as companies scale. Why hero-driven organizations fail. The three stages from people-driven to process-driven to AI-augmented.',
    functions: ['GTM Strategy'],
    type: 'guide',
    driveLink: 'https://drive.google.com/file/d/example-opmaturity-id/view',
    tags: ['scaling', 'operations', 'processes', 'maturity', 'gtm'],
  },
  {
    id: 'cs-scaling-deep-dive',
    title: 'How Customer Success Operating Models Break & Scale',
    description: 'A deep-dive into CS scaling. Why your Stage 1 model breaks at Stage 2. The specific changes, costs, and timing you need to plan for.',
    functions: ['Customer Success', 'GTM Strategy'],
    type: 'guide',
    driveLink: 'https://drive.google.com/file/d/example-cs-scaling-id/view',
    tags: ['cs', 'scaling', 'operating-model', 'growth-stage'],
  },
];

// Helper functions for filtering and searching
export function getResourcesByFunction(func: ResourceFunction): Resource[] {
  return resources.filter(r => r.functions.includes(func));
}

export function getAllFunctions(): ResourceFunction[] {
  const functions = new Set<ResourceFunction>();
  resources.forEach(r => r.functions.forEach(f => functions.add(f)));
  return Array.from(functions).sort();
}

export function searchResources(query: string): Resource[] {
  const q = query.toLowerCase();
  return resources.filter(r =>
    r.title.toLowerCase().includes(q) ||
    r.description.toLowerCase().includes(q) ||
    r.tags.some(tag => tag.toLowerCase().includes(q))
  );
}
