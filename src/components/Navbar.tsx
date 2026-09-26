"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { GeometricMark } from "./GeometricMark";
import { LocalStatus } from "./LocalStatus";

function sectionHref(hash: string, pathname: string) {
  return pathname === "/" ? hash : `/${hash}`;
}

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-line bg-background/80 backdrop-blur-md transition-colors duration-200">
      {/* Scroll Progress Bar */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-accent via-emerald-500 to-indigo-500 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        {/* Brand Monogram */}
        <a
          href="/"
          className="group flex shrink-0 items-center gap-3 text-foreground transition-colors duration-200"
          aria-label="Imtiaz Tamim - Home"
        >
          <GeometricMark className="w-5 h-auto text-accent transform group-hover:scale-105 transition-transform duration-300" />
          <span className="font-sans font-bold text-sm tracking-widest uppercase text-foreground group-hover:text-accent transition-colors duration-300">
            Imtiaz Tamim
          </span>
        </a>

        {/* Desktop Nav Links — center pill (Dhiraj-style) */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-line bg-background/70 px-2 py-1 backdrop-blur-sm">
          <a
            href={sectionHref("#work", pathname)}
            className="rounded-full px-3 py-1.5 font-sans text-xs font-semibold tracking-wide text-muted hover:text-foreground transition-colors duration-200"
          >
            Work
          </a>
          <a
            href={sectionHref("#about", pathname)}
            className="rounded-full px-3 py-1.5 font-sans text-xs font-semibold tracking-wide text-muted hover:text-foreground transition-colors duration-200"
          >
            About
          </a>
          <a
            href={sectionHref("#experience", pathname)}
            className="rounded-full px-3 py-1.5 font-sans text-xs font-semibold tracking-wide text-muted hover:text-foreground transition-colors duration-200"
          >
            Experience
          </a>
          <a
            href="/blog"
            className="rounded-full px-3 py-1.5 font-sans text-xs font-semibold tracking-wide text-muted hover:text-foreground transition-colors duration-200"
          >
            Blog
          </a>
          <a
            href={sectionHref("#contact", pathname)}
            className="rounded-full px-3 py-1.5 font-sans text-xs font-semibold tracking-wide text-muted hover:text-foreground transition-colors duration-200"
          >
            Contact
          </a>
          <a
            href={sectionHref("#contact", pathname)}
            className="rounded-full border border-line bg-background px-3 py-1.5 font-sans text-xs font-semibold tracking-wide text-foreground hover:border-accent/40 hover:text-accent transition-colors duration-200"
          >
            Hire Me
          </a>
        </nav>

        {/* Right: Dhaka weather / place / time + mobile menu */}
        <div className="flex shrink-0 items-center gap-3">
          <LocalStatus />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted hover:text-foreground hover:bg-background md:hidden transition-colors duration-200"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isOpen && (
        <div className="border-t border-line bg-background/95 backdrop-blur-md md:hidden transition-all duration-300">
          <nav className="flex flex-col px-6 py-4 gap-4">
            <a
              href={sectionHref("#work", pathname)}
              onClick={() => setIsOpen(false)}
              className="font-sans text-sm font-bold uppercase tracking-wider text-muted hover:text-foreground py-2 border-b border-line/50 transition-colors duration-200"
            >
              Work
            </a>
            <a
              href={sectionHref("#about", pathname)}
              onClick={() => setIsOpen(false)}
              className="font-sans text-sm font-bold uppercase tracking-wider text-muted hover:text-foreground py-2 border-b border-line/50 transition-colors duration-200"
            >
              About
            </a>
            <a
              href={sectionHref("#experience", pathname)}
              onClick={() => setIsOpen(false)}
              className="font-sans text-sm font-bold uppercase tracking-wider text-muted hover:text-foreground py-2 border-b border-line/50 transition-colors duration-200"
            >
              Experience
            </a>
            <a
              href="/blog"
              onClick={() => setIsOpen(false)}
              className="font-sans text-sm font-bold uppercase tracking-wider text-muted hover:text-foreground py-2 border-b border-line/50 transition-colors duration-200"
            >
              Blog
            </a>
            <a
              href={sectionHref("#contact", pathname)}
              onClick={() => setIsOpen(false)}
              className="font-sans text-sm font-bold uppercase tracking-wider text-muted hover:text-foreground py-2 transition-colors duration-200"
            >
              Contact
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
