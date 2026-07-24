/** Map project tag labels → simpleicons.org slugs (empty = generic icon). */
const TECH_ICON_MAP: Record<string, string> = {
  javascript: "javascript",
  typescript: "typescript",
  "node.js": "nodedotjs",
  node: "nodedotjs",
  express: "express",
  mongodb: "mongodb",
  react: "react",
  "next.js": "nextdotjs",
  nextjs: "nextdotjs",
  "tailwind css": "tailwindcss",
  tailwind: "tailwindcss",
  redux: "redux",
  "react native": "react",
  expo: "expo",
  prisma: "prisma",
  mongoose: "mongoose",
  postgresql: "postgresql",
  postgres: "postgresql",
  supabase: "supabase",
  docker: "docker",
  nginx: "nginx",
  linux: "linux",
  "socket.io": "socketdotio",
  socketio: "socketdotio",
  twilio: "twilio",
  n8n: "n8n",
  stripe: "stripe",
  git: "git",
  github: "github",
  figma: "figma",
  aws: "amazonaws",
  mediasoup: "",
  webrtc: "",
  vapi: "",
  hotelbeds: "",
  ybs: "",
  fib: "",
  polotno: "",
};

export function techIconSlug(tag: string): string {
  const key = tag.trim().toLowerCase();
  if (key in TECH_ICON_MAP) return TECH_ICON_MAP[key];
  // Heuristic: strip dots/spaces for simpleicons-style slugs
  return key.replace(/\s+/g, "").replace(/\./g, "") || "";
}
