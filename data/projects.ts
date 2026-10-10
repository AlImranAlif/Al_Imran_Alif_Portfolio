export type Project = {
  slug: string;
  number: string;
  name: string;
  subtitle: string;
  category: string;
  overview: string;
  problem: string;
  approach: string;
  result: string;
  stack: string[];
  features: string[];
  learnings: string[];
  live?: string;
  github: string;
  screenshot?: { src: string; alt: string };
  architecture: { label: string; detail: string }[];
  metric: string;
};
const webStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Zod",
  "Vercel",
  "Render",
  "Neon",
];
export const projects: Project[] = [
  {
    slug: "powerplan",
    number: "01",
    name: "PowerPlan",
    category: "Full-stack system",
    subtitle: "Load-Shedding Window Planner",
    overview:
      "A scheduling application that places business jobs around multiple daily power-cut windows while respecting how each job uses electricity.",
    problem:
      "Power cuts make a fixed work schedule unreliable. Some jobs require grid power, while others can use a generator or run without electricity.",
    approach:
      "Model jobs and outage windows explicitly, schedule against three electricity-requirement modes, and validate API requests with Zod.",
    result:
      "A recalculating 24-hour timeline with generator-minute and operating-cost calculations, plus clear visibility into unscheduled jobs.",
    stack: webStack,
    metric: "3 electricity modes",
    features: [
      "Multiple daily power-cut windows and three electricity-requirement modes.",
      "Automatic generator-minute and operating-cost calculations.",
      "Unscheduled-job detection and schedule recalculation.",
      "24-hour visual timeline for reviewing a plan.",
      "Jobs and outage windows persisted in PostgreSQL.",
      "Zod validation across the frontend and backend.",
    ],
    learnings: [
      "Constraint handling: a job that cannot fit should remain explicitly unscheduled.",
      "Consistency: cost summaries and the timeline need to reflect the same recalculated schedule.",
      "Input validation: invalid durations and windows should be rejected before they enter the planning workflow.",
    ],
    architecture: [
      { label: "Planner interface", detail: "Next.js · React · TypeScript" },
      { label: "Scheduling API", detail: "Node.js · Express · Zod" },
      { label: "Persistent records", detail: "PostgreSQL · Neon" },
    ],
    live: "https://load-shedding-planner-client.vercel.app",
    github: "https://github.com/AlImranAlif/load-shedding-planner",
  },
  {
    slug: "recondesk",
    number: "02",
    name: "ReconDesk",
    category: "Data & review workflow",
    subtitle: "Explainable Two-Source Sales Reconciliation Engine",
    overview:
      "A reconciliation engine for two inconsistent transaction datasets, with explainable matching and a human review workflow.",
    problem:
      "Two sales sources contain 90 and 93 transactions, with missing, duplicate, fee-adjusted, and time-shifted records that cannot be reconciled through exact matching alone.",
    approach:
      "Combine weighted reference, amount, and time signals. Apply confidence thresholds and let reviewers accept, reject, or manually pair records.",
    result:
      "An immediately recalculated dashboard with review decisions persisted in PostgreSQL, so accepted and rejected matches survive refresh.",
    stack: webStack,
    metric: "90 + 93 transactions",
    features: [
      "Weighted reference, amount, and time matching signals.",
      "Confidence thresholds with explanations for candidate matches.",
      "Human review and manual pairing.",
      "Immediate dashboard recalculation after review.",
      "Accepted, rejected, and manual decisions persisted in PostgreSQL.",
      "Zod-validated requests and a deployed frontend and backend.",
    ],
    learnings: [
      "Ambiguity: a high score should be explainable and still allow human review.",
      "Persistence: saved decisions must remain separate from newly computed candidates.",
      "Feedback: dashboard summaries should update when a reviewer changes a pairing.",
    ],
    architecture: [
      { label: "Review dashboard", detail: "Next.js · reviewer decisions" },
      {
        label: "Matching & review API",
        detail: "Express · weighted signals · Zod",
      },
      { label: "Decision records", detail: "PostgreSQL · Neon" },
    ],
    live: "https://recondesk-client.vercel.app",
    github: "https://github.com/AlImranAlif/recondesk",
  },
  {
    slug: "swap-owner",
    number: "03",
    name: "Swap Owner",
    category: "Modular marketplace",
    subtitle: "Role-Based Buy and Sell Marketplace",
    overview:
      "A full-stack marketplace connecting customer and manager workflows, from browsing products to managing sellers and orders.",
    problem:
      "Customers and managers need different permissions while sharing product, order, and profile data.",
    approach:
      "Separate customer, manager, and marketplace functions into NestJS modules, with token-authenticated APIs and responsive Next.js routes.",
    result:
      "Connected browsing, cart, order, review, profile, and seller-management workflows with role-aware access.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "TypeORM",
      "JWT",
      "Axios",
      "Tailwind CSS",
    ],
    metric: "Customer + manager roles",
    features: [
      "Customer and manager authentication.",
      "Product browsing, details, carts, and orders.",
      "Reviews, profiles, and seller management.",
      "Token-authenticated routes for user and administrative operations.",
      "Separate backend modules and responsive frontend routes.",
    ],
    learnings: [
      "Authorization: role checks belong at protected API boundaries.",
      "Modularity: separating marketplace responsibilities makes changes easier to isolate.",
      "Data relationships: orders, products, and user profiles need consistent database models.",
    ],
    architecture: [
      { label: "Marketplace UI", detail: "Next.js · React · Axios" },
      { label: "Role-aware API", detail: "NestJS · JWT · modules" },
      { label: "Marketplace data", detail: "PostgreSQL · TypeORM" },
    ],
    github: "https://github.com/AlImranAlif/swap-Owner",
  },
];