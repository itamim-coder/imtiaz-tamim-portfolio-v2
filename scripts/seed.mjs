/**
 * Seed portfolio content into MongoDB.
 * Run: npm run seed
 */
import mongoose from "mongoose";
import { projectCaseStudies } from "./project-case-studies.mjs";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is required");
}

const projectSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    company: String,
    type: { type: String, enum: ["web", "mobile", "both"], default: "web" },
    featured: Boolean,
    shortDescription: String,
    longDescription: String,
    problem: String,
    outcome: String,
    role: String,
    highlight: String,
    year: String,
    category: String,
    statusLabel: String,
    tags: [String],
    features: [
      {
        title: String,
        summary: String,
        details: String,
        highlights: [String],
        videoUrl: String,
        order: Number,
      },
    ],
    liveUrl: String,
    githubUrl: String,
    imageUrl: String,
    videoUrl: String,
    order: Number,
    published: Boolean,
  },
  { timestamps: true },
);

const experienceSchema = new mongoose.Schema(
  {
    role: String,
    company: String,
    location: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    description: String,
    tags: [String],
    order: Number,
    published: Boolean,
  },
  { timestamps: true },
);

const settingsSchema = new mongoose.Schema(
  {
    singleton: { type: String, unique: true, default: "main" },
    heroLine1: String,
    heroLine2: String,
    heroSubline: String,
    email: String,
    githubUrl: String,
    linkedinUrl: String,
    twitterUrl: String,
    metaTitle: String,
    metaDescription: String,
  },
  { timestamps: true },
);

const skillSchema = new mongoose.Schema(
  {
    name: String,
    icon: String,
    category: String,
    categoryOrder: Number,
    order: Number,
    published: Boolean,
  },
  { timestamps: true },
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
const Experience =
  mongoose.models.Experience || mongoose.model("Experience", experienceSchema);
const SiteSettings =
  mongoose.models.SiteSettings || mongoose.model("SiteSettings", settingsSchema);
const Skill = mongoose.models.Skill || mongoose.model("Skill", skillSchema);

const projects = [
  {
    title: "Jetixia",
    slug: "jetixia",
    company: "Jetixia",
    type: "web",
    featured: true,
    year: "2025 – 2026",
    category: "B2B Travel · Full-Stack",
    statusLabel: "Live",
    shortDescription:
      "Multi-supplier B2B travel booking with unified API responses and custom YBS/FIB payments.",
    highlight:
      "Ten supplier APIs, one clean booking response — payments that actually settle in production.",
    ...projectCaseStudies.jetixia,
    tags: ["Node.js", "Express", "MongoDB", "YBS", "FIB", "HotelBeds"],
    liveUrl: "https://www.bdesktravel.com/",
    videoUrl: "",
    imageUrl: "",
    order: 1,
    published: true,
  },
  {
    title: "Kornest",
    slug: "kornest",
    company: "Jetixia",
    type: "web",
    featured: true,
    year: "2026",
    category: "SaaS · Realtime",
    statusLabel: "Live",
    shortDescription:
      "Team collaboration SaaS with Kanban, chat, docs, and self-hosted mediasoup video on VPS.",
    highlight:
      "Realtime video without handing the last mile to a managed SFU — systemd, nginx, and monitoring included.",
    ...projectCaseStudies.kornest,
    tags: ["React", "Express", "MongoDB", "mediasoup", "Socket.io"],
    liveUrl: "https://www.kornest.com/",
    videoUrl: "",
    imageUrl: "",
    order: 2,
    published: true,
  },
  {
    title: "Cutco",
    slug: "cutco",
    company: "TrustGuid",
    type: "both",
    featured: true,
    year: "2026",
    category: "Energy · Web + Mobile",
    statusLabel: "Live",
    shortDescription:
      "Australian energy comparison and switching — web SaaS plus Expo mobile app.",
    highlight:
      "Same product surface on Next.js and React Native — one backend, two clients.",
    ...projectCaseStudies.cutco,
    tags: ["Next.js", "Prisma", "PostgreSQL", "Expo", "React Native"],
    liveUrl: "https://cutco-web.vercel.app/",
    videoUrl: "",
    imageUrl: "",
    order: 3,
    published: true,
  },
  {
    title: "EchoVoice",
    slug: "echovoice",
    company: "TrustGuid",
    type: "web",
    featured: false,
    year: "2026",
    category: "AI Voice · SaaS",
    statusLabel: "In Production",
    shortDescription: "AI voice agent SaaS with Vapi/Twilio telephony orchestration.",
    highlight: "Telephony orchestration that stays debuggable when calls go wrong.",
    longDescription:
      "EchoVoice is TrustGuid’s AI voice agent SaaS — Vapi/Twilio telephony orchestration for production calling workflows.",
    problem:
      "Voice demos are easy; reliable telephony orchestration in production is not.",
    outcome:
      "A SaaS surface for building and running AI voice agents with Vapi/Twilio in the loop.",
    role: "Full-stack product engineer on the EchoVoice / Sonic stack.",
    features: [
      {
        title: "Voice agent builder",
        summary: "Configure and ship AI voice agents for real calling flows.",
        details:
          "Agent configuration and runtime paths aimed at production calls, not just playground demos.",
        highlights: ["Agent configuration UI/API", "Production-oriented call flows"],
        videoUrl: "",
        order: 1,
      },
      {
        title: "Vapi + Twilio orchestration",
        summary: "Telephony rails wired so agents can dial and respond reliably.",
        details:
          "Vapi and Twilio are integrated as the voice/telephony backbone with debuggable failure states.",
        highlights: ["Vapi agent runtime", "Twilio telephony path"],
        videoUrl: "",
        order: 2,
      },
    ],
    tags: ["React", "Vapi", "Twilio", "Supabase"],
    liveUrl: "",
    videoUrl: "",
    imageUrl: "",
    order: 4,
    published: true,
  },
  {
    title: "Canvasive",
    slug: "canvasive",
    company: "TrustGuid",
    type: "web",
    featured: false,
    year: "2026",
    category: "Marketing · Automation",
    statusLabel: "In Production",
    shortDescription: "AI marketing automation with n8n-orchestrated campaign pipelines.",
    highlight: "Campaign pipelines that operators can actually change without a deploy.",
    longDescription:
      "Canvasive is TrustGuid’s AI marketing automation product — creative tooling plus n8n-orchestrated campaign pipelines operators can adjust.",
    problem:
      "Marketing automation that only engineers can change dies the first time ops needs a tweak.",
    outcome:
      "Campaign pipelines orchestrated in n8n with a React/Supabase product surface operators can use.",
    role: "Full-stack product engineer on Canvasive.",
    features: [
      {
        title: "Campaign pipelines",
        summary: "n8n-orchestrated flows for marketing campaigns.",
        details:
          "Pipelines live where operators can see and adjust them — reducing “wait for a deploy” friction.",
        highlights: ["n8n orchestration", "Operator-editable campaign logic"],
        videoUrl: "",
        order: 1,
      },
      {
        title: "Creative + automation surface",
        summary: "React app with Supabase backend and Polotno creative tooling.",
        details:
          "Product UI for marketing workflows sitting on Supabase, with creative editing via Polotno where needed.",
        highlights: ["React + Supabase", "Polotno creative integration"],
        videoUrl: "",
        order: 2,
      },
    ],
    tags: ["React", "Supabase", "n8n", "Polotno"],
    liveUrl: "",
    videoUrl: "",
    imageUrl: "",
    order: 5,
    published: true,
  },
];

const experiences = [
  {
    role: "Full-Stack Product Engineer",
    company: "TrustGuid",
    location: "Remote",
    startDate: "2024",
    current: true,
    description:
      "Own end-to-end delivery across Cutco, EchoVoice, and Canvasive — architecture through production deploys.",
    tags: ["Next.js", "React Native", "Node.js", "PostgreSQL"],
    order: 1,
    published: true,
  },
  {
    role: "Full-Stack Product Engineer",
    company: "Jetixia / Booking Desk",
    location: "Remote",
    startDate: "2024",
    current: true,
    description:
      "B2B travel booking infrastructure, multi-supplier integrations, payments, and Kornest team tooling.",
    tags: ["Node.js", "Express", "MongoDB", "mediasoup"],
    order: 2,
    published: true,
  },
];

/** Flatten STACK categories → skill docs (categoryOrder = column index) */
const skillCategories = [
  {
    category: "Languages",
    categoryOrder: 1,
    skills: [
      { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" },
      { name: "SQL", icon: "postgresql" },
    ],
  },
  {
    category: "Frontend",
    categoryOrder: 2,
    skills: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Redux", icon: "redux" },
    ],
  },
  {
    category: "Mobile",
    categoryOrder: 3,
    skills: [
      { name: "React Native", icon: "react" },
      { name: "Expo", icon: "expo" },
    ],
  },
  {
    category: "Backend",
    categoryOrder: 4,
    skills: [
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Express", icon: "express" },
      { name: "Prisma", icon: "prisma" },
      { name: "Mongoose", icon: "mongoose" },
    ],
  },
  {
    category: "Databases",
    categoryOrder: 5,
    skills: [
      { name: "MongoDB", icon: "mongodb" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Supabase", icon: "supabase" },
    ],
  },
  {
    category: "DevOps / VPS",
    categoryOrder: 6,
    skills: [
      { name: "Linux", icon: "linux" },
      { name: "nginx", icon: "nginx" },
      { name: "Docker", icon: "docker" },
      { name: "systemd", icon: "" },
      { name: "Prometheus", icon: "prometheus" },
      { name: "Grafana", icon: "grafana" },
    ],
  },
  {
    category: "Realtime / AI",
    categoryOrder: 7,
    skills: [
      { name: "WebRTC", icon: "" },
      { name: "mediasoup", icon: "" },
      { name: "Socket.io", icon: "socketdotio" },
      { name: "Vapi", icon: "" },
      { name: "Twilio", icon: "twilio" },
      { name: "n8n", icon: "n8n" },
    ],
  },
  {
    category: "Payments / Tools",
    categoryOrder: 8,
    skills: [
      { name: "Stripe", icon: "stripe" },
      { name: "NextAuth", icon: "" },
      { name: "Git", icon: "git" },
      { name: "Figma", icon: "figma" },
    ],
  },
];

const skills = skillCategories.flatMap(({ category, categoryOrder, skills: list }) =>
  list.map((skill, index) => ({
    name: skill.name,
    icon: skill.icon,
    category,
    categoryOrder,
    order: index + 1,
    published: true,
  })),
);

async function seed() {
  await mongoose.connect(MONGODB_URI);

  await Project.deleteMany({});
  await Project.insertMany(projects);

  await Experience.deleteMany({});
  await Experience.insertMany(experiences);

  await Skill.deleteMany({});
  await Skill.insertMany(skills);

  await SiteSettings.findOneAndUpdate(
    { singleton: "main" },
    {
      singleton: "main",
      heroLine1: "I build products that handle real traffic",
      heroLine2: "and real money.",
      heroSubline: "Hello I'm Imtiaz | Full-Stack Product Engineer",
      email: "hello@imtiaztamim.com",
      githubUrl: "https://github.com/imtiaztamim",
      linkedinUrl: "https://linkedin.com/in/imtiaztamim",
      twitterUrl: "https://x.com/imtiaztamim",
    },
    { upsert: true, new: true },
  );

  console.log("Seed complete:", {
    projects: projects.length,
    experiences: experiences.length,
    skills: skills.length,
  });

  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
