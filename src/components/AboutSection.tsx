import React from "react";
import { SectionHeading } from "@/components/SectionHeading";

interface Principle {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const principles: Principle[] = [
  {
    number: "01",
    title: "Production-first",
    description:
      "Systems built to ship — live traffic, real payments, monitoring, and deploys that stay up.",
    icon: (
      <svg
        className="h-4.5 w-4.5 text-accent"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Integration-heavy",
    description:
      "Multi-supplier APIs, different JSON shapes, one clean response — plus custom YBS & FIB payment flows.",
    icon: (
      <svg
        className="h-4.5 w-4.5 text-accent"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "End-to-end ownership",
    description:
      "Web, mobile, backend, and VPS — I don't hand off the last mile before production.",
    icon: (
      <svg
        className="h-4.5 w-4.5 text-accent"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
];

const stats = [
  { value: "3+", label: "Years building products" },
  { value: "5+", label: "Production products shipped" },
  { value: "10+", label: "Supplier APIs unified" },
  { value: "4+", label: "International products" },
  { value: "12+", label: "Technologies in production" },
] as const;

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative mx-auto w-full max-w-6xl overflow-hidden px-6 py-20 sm:py-24"
      aria-labelledby="about-heading"
    >
      {/* Background Soft Ambient Spots */}
      <div className="pointer-events-none absolute top-1/4 left-0 z-0 h-[350px] w-[350px] -translate-x-1/2 select-none rounded-full bg-amber-200/5 blur-[90px]" />
      <div className="pointer-events-none absolute right-0 bottom-0 z-0 h-[450px] w-[450px] translate-x-1/3 translate-y-1/3 select-none rounded-full bg-accent/5 blur-[100px]" />

      {/* Main Content (Z-Indexed above Spotlights) */}
      <div className="relative z-10">
        <SectionHeading id="about-heading" title="About" />

        <div className="mt-6 max-w-3xl">
          <p className="text-base leading-relaxed text-muted sm:text-lg sm:leading-relaxed">
            Turning complex systems into products people use. I design and ship
            production-grade software for international clients — B2B booking
            platforms, payment flows, web and mobile apps, and self-hosted infra
            when managed tools aren&apos;t enough. From unifying 10+ hotel
            supplier APIs to team collaboration with real-time video on a VPS, I
            own work from architecture through production.
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted sm:text-sm">
            Based in Dhaka · Remote · Open to contract and full-time roles.
          </p>
        </div>

        {/* Bento-style principles Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {principles.map((item) => (
            <article
              key={item.number}
              className="about-principle-card group"
            >
              {/* Card Header Tag */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full shadow-sm">
                  {item.number}
                </span>
                <span className="opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </span>
              </div>
              <h3 className="mt-6 font-sans text-lg font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        {/* Stats segment */}
        <div className="about-stats-bar mt-12 bg-white/50 backdrop-blur-md">
          <ul className="grid grid-cols-2 gap-y-8 gap-x-6 sm:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat) => (
              <li
                key={stat.label}
                className="text-center sm:text-left group hover:scale-[1.03] transition-transform duration-300 select-none"
              >
                <p className="font-sans text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  {stat.value.replace("+", "")}
                  <span className="text-accent group-hover:opacity-80 transition-opacity duration-200">
                    +
                  </span>
                </p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-muted sm:text-xs">
                  {stat.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
