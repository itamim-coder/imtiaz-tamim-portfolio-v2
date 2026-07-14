"use client";

import { useCallback, useState } from "react";
import { InitialLoader } from "./InitialLoader";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  const handleComplete = useCallback(() => {
    setReady(true);
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
    </>
  );
}
