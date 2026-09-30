// All site content lives here. Replace placeholders with real data.

export const profile = {
  name: "Dennis Manullang",
  role: "Fullstack Engineer",
  about:
    "I design backends that survive traffic spikes and frontends that feel instant. Currently obsessed with distributed queues, edge runtimes, and deleting code.",
  email: "dennisyehezkiel.m@gmail.com",
  github: "https://github.com/dennisyehezkiiel",
  linkedin: "https://www.linkedin.com/in/dennis-yehezkiel-93b031232/",
};

export const stack = ["TypeScript", "Go", "Gin", "PHP", "React.js", "Vue.js", "Next.js", "Laravel", "PostgreSQL"];

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
    title: "Bosshire",
    blurb: "AI-powered job portal and professional networking platform featuring intelligent CV parsing, seamless job applications, and real-time chat.",
    stack: ["Go", "PostgreSQL", "Gin", "Typescript", "Next.js", "Laravel"],
    year: "2026",
    demo: "https://bosshire.co.id",
  },
  {
    title: "TOCO",
    blurb: "A unified multi-store e-commerce aggregator that lets users import products from various marketplaces into a single universal cart for seamless multi-store checkout",
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Express.js"],
    year: "2025",
    demo: "https://toco.id",

  },
  {
    title: "Sprout Company Profile",
    blurb: "A modern corporate web experience built to showcase company identity with a fresh, transforms traditional company profile presentations into an engaging brand story for potential clients",
    stack: ["TypeScript", "Next.js"],
    year: "2025",
    demo: "https://sprout.co.id",
  },
  {
    title: "Cokran",
    blurb: "A web application and a custom CMS to empower clients with full control over their digital platforms. Build using modern frameworks and best practices in performance, security, and scalability",
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Supabase"],
    year: "2024",
    demo: "https://cokran.com",
  },
  {
    title: "TITIP",
    blurb: "An end-to-end logistics and shipment tracking platform featuring role-based access, real-time GPS tracking, automated notifications, and performance analytics.",
    stack: ["TypeScript", "Next.js", "PostgreSQL", "Express.js", "Socket.io"],
    year: "2024",
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
    role: "Frontend Engineer",
    company: "PT Prima Bersama Berkat",
    period: "2025 — now",
    summary: "Own the payments platform end to end.",
    highlights: [
      "Developed an automated cache busting mechanism, ensuring users fetch the latest updates eliminating stale content issues in production",
      "Built a seamless real-time chat application using WebSocket, complete with throttling and rate limiting mechanisms to prevent message spam and maintain system stability under high traffic",
      "Implemented Hotjar integrated with Google Analytics to track user behavior, heatmaps, and session recordings providing data-driven insights for continuous UX improvement.",
      "Integrated Unleash as a feature flag management system, enabling controlled and gradual feature rollouts without full",
      "Developed and maintained Looker dashboards to monitor user application funnel activity and conversion/success rates, providing actionable insights that informed product decisions and feature improvements."
    ],
  },
  {
    role: "Full-Stack Engineer",
    company: "PT Tunas Digital",
    period: "2022 — 2025",
    summary: "Shipped customer-facing dashboards and the APIs behind them.",
    highlights: [
      "Integrated REST APIs and handled asynchronous data fetching for dynamic frontend features",
      "Optimized application performance through component reusability, lazy loading, and state management improvements",
      "Implemented multilingual and SEO-friendly features including metadata, canonical URLs, and sitemap optimization"
    ],
  },
];
