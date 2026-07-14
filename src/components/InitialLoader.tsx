"use client";

import { useEffect, useState } from "react";
import { GeometricMark } from "./GeometricMark";

const DRAW_MS = 1100;
const FILL_MS = 380;
const HOLD_MS = 320;
const EXIT_MS = 800;

type Phase = "draw" | "fill" | "hold" | "out";

type InitialLoaderProps = {
  onComplete: () => void;
};

export function InitialLoader({ onComplete }: InitialLoaderProps) {
  const [phase, setPhase] = useState<Phase>("draw");

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      setPhase("hold");
      const t = window.setTimeout(() => {
        setPhase("out");
        window.setTimeout(onComplete, 180);
      }, 220);
      return () => window.clearTimeout(t);
    }

    const toFill = window.setTimeout(() => setPhase("fill"), DRAW_MS);
    const toHold = window.setTimeout(
      () => setPhase("hold"),
      DRAW_MS + FILL_MS,
    );
    const toOut = window.setTimeout(
      () => setPhase("out"),
      DRAW_MS + FILL_MS + HOLD_MS,
    );
    const done = window.setTimeout(
      onComplete,
      DRAW_MS + FILL_MS + HOLD_MS + EXIT_MS,
    );

    return () => {
      window.clearTimeout(toFill);
      window.clearTimeout(toHold);
      window.clearTimeout(toOut);
      window.clearTimeout(done);
    };
  }, [onComplete]);

  return (
    <div
      className={`loader-root loader-root--${phase}`}
      aria-busy="true"
      aria-live="polite"
      role="status"
      aria-label="Loading"
    >
      <div className="loader-content">
        <GeometricMark className="loader-mark-svg" />
      </div>
    </div>
  );
}
