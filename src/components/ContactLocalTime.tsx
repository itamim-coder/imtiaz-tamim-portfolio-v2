"use client";

import { useEffect, useState } from "react";

const DHAKA_TZ = "Asia/Dhaka";

function formatDhakaTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: DHAKA_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

export function ContactLocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(formatDhakaTime(new Date()));
    const id = window.setInterval(
      () => setTime(formatDhakaTime(new Date())),
      60_000,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="font-sans text-sm font-medium text-foreground">
      {time ?? "—"} (UTC+6)
    </span>
  );
}
