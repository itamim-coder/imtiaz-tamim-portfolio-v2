"use client";

import { useState, MouseEvent } from "react";

const EMAIL = "itamim12202@gmail.com";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) / 40;
    const y = (clientY - window.innerHeight / 2) / 40;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden px-6 py-16 sm:py-20"
    >
      {/* Soft corner / oval washes — keep current design */}
      <div
        className="pointer-events-none absolute top-0 left-0 z-0 h-[400px] w-[400px] select-none rounded-full bg-gradient-to-br from-amber-200/10 via-orange-100/5 to-transparent blur-[80px] sm:h-[600px] sm:w-[600px] sm:blur-[120px] transition-transform duration-300 ease-out"
        style={{
          transform: `translate(calc(-25% + ${mouseOffset.x}px), calc(-25% + ${mouseOffset.y}px))`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-0 right-0 z-0 h-[400px] w-[400px] select-none rounded-full bg-gradient-to-bl from-amber-200/10 via-orange-100/5 to-transparent blur-[80px] sm:h-[600px] sm:w-[600px] sm:blur-[120px] transition-transform duration-300 ease-out"
        style={{
          transform: `translate(calc(25% + ${mouseOffset.x}px), calc(-25% + ${mouseOffset.y}px))`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-[45%] left-1/2 z-0 h-[280px] w-[90%] max-w-[650px] select-none rounded-full bg-gradient-to-r from-violet-500/12 via-fuchsia-500/8 to-indigo-500/12 blur-[80px] sm:h-[380px] sm:w-[70%] sm:blur-[110px] transition-transform duration-300 ease-out"
        style={{
          transform: `translate(calc(-50% + ${mouseOffset.x * 1.5}px), calc(-50% + ${mouseOffset.y * 1.5}px))`,
        }}
        aria-hidden
      />

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        {/* Headline — no “Portfolio v2” badge */}
        <h1 className="max-w-3xl font-sans text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl leading-[1.08]">
          I build products that handle real traffic
          <span className="mt-2 block font-display text-5xl italic font-normal tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-600 to-indigo-600 sm:mt-3 sm:text-6xl md:text-7xl">
            and real money.
          </span>
        </h1>

        <p className="mt-8 max-w-2xl font-sans text-base tracking-wide text-muted sm:mt-10 sm:text-lg md:text-xl">
          Hello I&apos;m Imtiaz | Full-Stack Product Engineer
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:mt-12 sm:flex-row">
          <a
            href="#contact"
            className="group flex items-center gap-3 whitespace-nowrap rounded-full bg-accent px-7 py-3.5 font-sans text-sm font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/90"
          >
            <span>Let&apos;s Connect</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0.5">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="group relative flex cursor-pointer items-center gap-2.5 whitespace-nowrap rounded-full border border-line bg-background/50 px-7 py-3.5 font-sans text-sm font-bold uppercase tracking-wider text-foreground transition-all duration-300 hover:bg-background/80 hover:text-accent select-none"
          >
            <svg
              className="h-4 w-4 text-muted transition-colors duration-200 group-hover:text-accent"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-1.902-11.25a48.97 48.97 0 00-1.9 0M10.5 2.25H9a2.25 2.25 0 00-2.25 2.25v.75"
              />
            </svg>
            <span>{EMAIL}</span>
            {copied && (
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 rounded bg-foreground px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-background shadow-md">
                Copied!
              </span>
            )}
          </button>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[90px] w-full select-none sm:h-[130px]"
        aria-hidden
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120C180 40 540 0 720 0C900 0 1260 40 1440 120"
            stroke="url(#oval-glow-grad)"
            strokeWidth="3.5"
          />
          <path
            d="M0 120C180 40 540 0 720 0C900 0 1260 40 1440 120"
            fill="url(#oval-fill-grad)"
            opacity="0.10"
          />
          <defs>
            <linearGradient
              id="oval-glow-grad"
              x1="0"
              y1="0"
              x2="1440"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.1" />
              <stop offset="25%" stopColor="#ec4899" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#3b82f6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0f6e56" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient
              id="oval-fill-grad"
              x1="720"
              y1="0"
              x2="720"
              y2="120"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#f4f6f8" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
