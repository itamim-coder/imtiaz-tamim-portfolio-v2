"use client";

import { useEffect, useState } from "react";

const DHAKA_TZ = "Asia/Dhaka";
const DHAKA_LAT = 23.8103;
const DHAKA_LON = 90.4125;

const HELLOS = ["Hello", "Hallo", "Olá", "স্বাগতম", "Bonjour"] as const;
const SLIDE_MS = 4200;
const HELLO_MS = 1600;

function formatDhakaTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: DHAKA_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

function dhakaHour(date: Date) {
  const hour = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: DHAKA_TZ,
      hour: "numeric",
      hour12: false,
    }).format(date),
  );
  return hour;
}

function dayPart(date: Date): { label: string; emoji: string } {
  const h = dhakaHour(date);
  if (h < 5) return { label: "Good Night", emoji: "🌙" };
  if (h < 12) return { label: "Good Morning", emoji: "☀️" };
  if (h < 17) return { label: "Good Afternoon", emoji: "🌤️" };
  if (h < 21) return { label: "Good Evening", emoji: "🌙" };
  return { label: "Good Night", emoji: "🌙" };
}

type Slide = 0 | 1 | 2;

export function LocalStatus() {
  const [now, setNow] = useState(() => new Date());
  const [tempC, setTempC] = useState<number | null>(null);
  const [slide, setSlide] = useState<Slide>(0);
  const [helloIndex, setHelloIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setSlide((s) => ((s + 1) % 3) as Slide);
    }, SLIDE_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion || slide !== 1) return;
    const id = window.setInterval(() => {
      setHelloIndex((i) => (i + 1) % HELLOS.length);
    }, HELLO_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, slide]);

  useEffect(() => {
    let cancelled = false;

    async function loadWeather() {
      try {
        const url = new URL("https://api.open-meteo.com/v1/forecast");
        url.searchParams.set("latitude", String(DHAKA_LAT));
        url.searchParams.set("longitude", String(DHAKA_LON));
        url.searchParams.set("current", "temperature_2m");
        url.searchParams.set("timezone", DHAKA_TZ);

        const res = await fetch(url.toString());
        if (!res.ok) return;
        const data = (await res.json()) as {
          current?: { temperature_2m?: number };
        };
        const t = data.current?.temperature_2m;
        if (!cancelled && typeof t === "number") {
          setTempC(Math.round(t));
        }
      } catch {
        /* optional */
      }
    }

    void loadWeather();
    const id = window.setInterval(loadWeather, 30 * 60_000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  const time = formatDhakaTime(now);
  const part = dayPart(now);
  const tempLabel = tempC !== null ? `${tempC}°C` : "—°C";

  return (
    <div
      className="local-status hidden lg:flex items-center gap-2 rounded-full border border-line bg-background/75 pl-3 pr-1.5 py-1 text-[11px] font-medium text-muted tabular-nums select-none backdrop-blur-sm"
      aria-live="polite"
      aria-label={`Dhaka status: ${tempLabel}, ${time}, ${part.label}`}
    >
      <div className="local-status__viewport relative h-5 min-w-[11.5rem] overflow-hidden">
        <div
          className="local-status__track"
          style={{
            transform: reduceMotion
              ? "translateY(0)"
              : `translateY(-${slide * 1.25}rem)`,
          }}
        >
          {/* 1 — Weather / place / time */}
          <div className="local-status__slide">
            <span className="inline-flex items-center gap-1.5 text-foreground/85">
              <WeatherIcon />
              {tempLabel}
            </span>
            <Sep />
            <span className="text-foreground/85">Dhaka</span>
            <Sep />
            <span className="text-foreground/85">{time}</span>
          </div>

          {/* 2 — Animated hello + day part */}
          <div className="local-status__slide">
            <span className="local-status__hello inline-flex items-center gap-1 text-foreground/85">
              <span className="local-status__hello-viewport">
                <span
                  className="local-status__hello-track"
                  style={{
                    transform: reduceMotion
                      ? "translateY(0)"
                      : `translateY(-${helloIndex * 1.25}rem)`,
                  }}
                >
                  {HELLOS.map((word) => (
                    <span key={word} className="local-status__hello-item">
                      {word}
                    </span>
                  ))}
                </span>
              </span>
              <span aria-hidden>👋</span>
            </span>
            <Sep />
            <span className="text-foreground/85">
              {part.label} <span aria-hidden>{part.emoji}</span>
            </span>
          </div>

          {/* 3 — Availability (honest third slot vs fake visitors) */}
          <div className="local-status__slide">
            <span className="inline-flex items-center gap-1.5 text-foreground/85">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open
            </span>
            <Sep />
            <span className="uppercase tracking-wider text-[10px] text-muted">
              Available
            </span>
          </div>
        </div>
      </div>

      <kbd className="local-status__kbd" title="Command menu (coming soon)">
        <span className="text-[10px] leading-none">⌘</span>K
      </kbd>
    </div>
  );
}

function Sep() {
  return (
    <span className="text-line/90" aria-hidden>
      |
    </span>
  );
}

function WeatherIcon() {
  return (
    <svg
      className="h-3.5 w-3.5 shrink-0 text-muted"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 18a4 4 0 0 1 .2-8 5 5 0 0 1 9.6 1.5A3.5 3.5 0 0 1 17 18H7z" />
    </svg>
  );
}
