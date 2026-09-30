// All site content lives here. Replace placeholders with real data.

export const profile = {
  name: "Dennis Manullang",
  role: "Full-Stack & Systems Engineer",
  about:
    "I design backends that survive traffic spikes and frontends that feel instant. Currently obsessed with distributed queues, edge runtimes, and deleting code.",
  email: "hello@example.com",
  github: "https://github.com/your-handle",
  linkedin: "https://linkedin.com/in/your-handle",
};

export const stack = ["TypeScript", "Go", "Next.js", "PostgreSQL", "Redis", "Kafka", "Kubernetes", "Cloudflare Workers"];

export type Project = {
  title: string;
  blurb: string;
  stack: string[];
  year: string;
  demo?: string;
  source?: string;
};

export const projects: Project[] = [
  {
    title: "Ledgerline",
    blurb: "Double-entry payments ledger handling 40k tx/s with idempotent writes and zero reconciliation drift.",
    stack: ["Go", "PostgreSQL", "Kafka"],
    year: "2026",
    demo: "https://example.com",
    source: "https://github.com/your-handle/ledgerline",
  },
  {
    title: "Edgecache",
    blurb: "Stale-while-revalidate cache layer on Workers. Cut p95 latency from 380ms to 42ms across 3 regions.",
    stack: ["TypeScript", "Cloudflare", "KV"],
    year: "2025",
    source: "https://github.com/your-handle/edgecache",
  },
  {
    title: "Tracewire",
    blurb: "Drop-in OpenTelemetry pipeline that turns noisy spans into readable incident timelines.",
    stack: ["Rust", "OTel", "ClickHouse"],
    year: "2025",
    demo: "https://example.com",
    source: "https://github.com/your-handle/tracewire",
  },
  {
    title: "Formless",
    blurb: "Schema-driven form engine for internal tools. One JSON file, fully accessible UI, no glue code.",
    stack: ["React", "Zod", "Next.js"],
    year: "2024",
    demo: "https://example.com",
  },
];

export type Role = {
  role: string;
  company: string;
  period: string;
  summary: string;
  highlights: string[];
};

export const experience: Role[] = [
  {
    role: "Senior Software Engineer",
    company: "Company A",
    period: "2024 — now",
    summary: "Own the payments platform end to end.",
    highlights: [
      "Rebuilt settlement pipeline; nightly batch from 4h to 11min.",
      "Led migration of 30 services to Kubernetes with zero downtime.",
      "Mentored 5 engineers; introduced RFC-driven design reviews.",
    ],
  },
  {
    role: "Full-Stack Engineer",
    company: "Company B",
    period: "2021 — 2024",
    summary: "Shipped customer-facing dashboards and the APIs behind them.",
    highlights: [
      "Designed multi-tenant auth used by 200k monthly users.",
      "Cut dashboard bundle size 62% via route-level code splitting.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Company C",
    period: "2019 — 2021",
    summary: "Backend services and internal tooling.",
    highlights: ["Built event ingestion service processing 2M events/day.", "Automated deploys; release time from 1 day to 20 minutes."],
  },
];
