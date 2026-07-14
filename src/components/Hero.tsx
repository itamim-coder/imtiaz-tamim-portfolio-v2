"use client";

import { useState } from "react";

export function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("hello@imtiaztamim.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-16">
      {/* Centered Content */}
      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        
        {/* Intro Pill Badge */}
        <div className="mb-8 flex items-center gap-2 rounded-full border border-line bg-background/50 px-3.5 py-1 backdrop-blur-sm select-none">
          <span className="text-[9px] font-bold uppercase tracking-widest text-accent bg-accent/10 px-1.5 py-0.5 rounded">
            NEW
          </span>
          <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-muted">
            Introducing Portfolio v2
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-sans text-4xl font-semibold tracking-tight text-foreground sm:text-6xl max-w-2xl leading-[1.1] sm:leading-[1.1]">
          I create digital journeys that spark innovation{" "}
          <span className="font-display italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-accent via-emerald-600 to-indigo-600">
            Digital Realities
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mt-8 font-sans text-sm text-muted sm:text-base tracking-wide select-none">
          Hello I&apos;m Imtiaz | A Full Stack Product Engineer
        </p>

        {/* Button Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary CTA */}
          <a
            href="#contact"
            className="group flex items-center gap-3 rounded-full bg-accent px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-accent/90 transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <span>Let&apos;s Connect</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 group-hover:translate-x-0.5 transition-transform duration-300">
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
          </a>

          {/* Secondary Email CTA */}
          <button
            onClick={handleCopy}
            className="group relative flex items-center gap-2 rounded-full border border-line bg-background/50 hover:bg-background/80 px-6 py-3 font-sans text-xs font-bold uppercase tracking-wider text-foreground hover:text-accent transition-all duration-300 cursor-pointer select-none whitespace-nowrap"
          >
            <svg
              className="h-3.5 w-3.5 text-muted group-hover:text-accent transition-colors duration-200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-1.902-11.25a48.97 48.97 0 00-1.9 0M10.5 2.25H9a2.25 2.25 0 00-2.25 2.25v.75"
              />
            </svg>
            <span>hello@imtiaztamim.com</span>

            {/* Micro Copied Toast */}
            {copied && (
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 rounded bg-foreground text-background text-[9px] font-bold tracking-widest uppercase px-2 py-1 shadow-md animate-[bounce_0.3s_ease-in-out]">
                Copied!
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Giant Bottom Glow Ellipse Area */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[180vw] h-[320px] sm:h-[400px] rounded-[50%] bg-gradient-to-t from-violet-500/15 via-accent/10 to-transparent blur-[40px] border-t border-accent/20 pointer-events-none select-none" />
    </main>
  );
}
