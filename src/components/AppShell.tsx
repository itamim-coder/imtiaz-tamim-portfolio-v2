"use client";

import { useCallback, useState, useEffect } from "react";
import { InitialLoader } from "./InitialLoader";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleComplete = useCallback(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {!ready && <InitialLoader onComplete={handleComplete} />}
      <div
        className={`app-stage${ready ? " app-stage--visible" : ""}`}
        aria-hidden={!ready}
      >
        {children}
      </div>
      {ready && showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed right-8 bottom-8 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-background/60 text-muted hover:text-accent hover:border-accent/30 hover:bg-accent/5 shadow-md backdrop-blur-md transition-all duration-300 transform hover:scale-105 cursor-pointer animate-fade-in"
          aria-label="Scroll to top"
        >
          <svg
            className="h-4.5 w-4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      )}
    </>
  );
}
