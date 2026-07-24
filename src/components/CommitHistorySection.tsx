"use client";

import { useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { SectionHeading } from "@/components/SectionHeading";
import { COMMIT_HISTORY_YEARS } from "@/lib/contributions";

const heatTheme = {
  light: ["#e8edf1", "#b7d4c9", "#6fa890", "#3d8a6e", "#0f6e56"],
  dark: ["#e8edf1", "#b7d4c9", "#6fa890", "#3d8a6e", "#0f6e56"],
};

export function CommitHistorySection() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME?.trim();
  const years = COMMIT_HISTORY_YEARS;
  const [activeYear, setActiveYear] = useState<number>(years[0] || 2026);
  const [monthlyCommits, setMonthlyCommits] = useState<Record<string, number>>({});
  const [lastDataYear, setLastDataYear] = useState<number | null>(null);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const processContributions = (contributions: any[]) => {
    const counts: Record<string, number> = {};
    months.forEach((m) => {
      counts[m] = 0;
    });

    contributions.forEach((day) => {
      const dateObj = new Date(day.date);
      if (!isNaN(dateObj.getTime())) {
        const monthName = months[dateObj.getMonth()];
        counts[monthName] += day.count;
      }
    });

    if (lastDataYear !== activeYear) {
      setTimeout(() => {
        setMonthlyCommits(counts);
        setLastDataYear(activeYear);
      }, 0);
    }

    return contributions;
  };

  const maxCommits = Math.max(...Object.values(monthlyCommits), 0);

  return (
    <section
      id="commit-history"
      className="relative mx-auto w-full max-w-6xl overflow-hidden px-6 py-20"
      aria-labelledby="commit-history-heading"
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 select-none rounded-full bg-accent/4 blur-[80px]" />

      <div className="relative z-10">
        <div className="mb-8">
          <SectionHeading
            id="commit-history-heading"
            title="Commits"
            end={
              username && years.length > 0 ? (
                <div className="inline-flex select-none gap-0.5 rounded-full border border-line/30 bg-line/20 p-0.5 backdrop-blur-md">
                  {years.map((year) => {
                    const isActive = year === activeYear;
                    return (
                      <button
                        key={year}
                        type="button"
                        onClick={() => {
                          setActiveYear(year);
                          setLastDataYear(null);
                        }}
                        className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-300 ${
                          isActive
                            ? "scale-102 bg-accent text-white shadow-sm"
                            : "text-muted hover:bg-line/10 hover:text-foreground"
                        }`}
                      >
                        {year}
                      </button>
                    );
                  })}
                </div>
              ) : null
            }
          />
        </div>

        {!username ? (
          <div className="commit-card">
            <div className="commit-card-inner space-y-2 text-sm text-muted">
              <p className="font-medium text-foreground">GitHub username needed</p>
              <p>
                Set{" "}
                <code className="rounded bg-[var(--heat-0)] px-1.5 py-0.5 text-foreground">
                  NEXT_PUBLIC_GITHUB_USERNAME
                </code>{" "}
                in <code className="text-foreground">.env.local</code>.
              </p>
            </div>
          </div>
        ) : (
          <article
            key={activeYear}
            className="commit-card relative animate-fade-in overflow-hidden"
          >
            <div className="pointer-events-none absolute -top-12 -right-12 z-0 h-48 w-48 select-none rounded-full bg-accent/5 blur-2xl" />

            <div className="commit-card-inner relative z-10 grid grid-cols-1 gap-8 items-center lg:grid-cols-12 lg:gap-6">
              {/* Left Column - Github Calendar */}
              <div className="overflow-x-auto lg:col-span-8">
                <GitHubCalendar
                  username={username}
                  year={activeYear}
                  colorScheme="light"
                  theme={heatTheme}
                  blockSize={12}
                  blockMargin={4}
                  fontSize={12}
                  transformData={processContributions}
                />
              </div>

              {/* Decorative divider inside grid */}
              <div className="hidden lg:block h-32 w-[1px] bg-line/60 lg:col-span-1 justify-self-center animate-fade-in" />

              {/* Right Column - Commit History Chart with Y-Axis */}
              <div className="flex flex-col gap-3 lg:col-span-3 min-h-[160px] justify-center">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted leading-none">
                  Monthly Activity ({activeYear})
                </span>

                <div className="flex items-end gap-3 mt-3 relative select-none">
                  {/* Y-Axis Label Scale Numbers on the Left of the Bars */}
                  <div className="flex flex-col justify-between h-24 text-[10px] font-mono text-muted shrink-0 text-right pb-4 select-none pr-1.5 w-8">
                    <span>{maxCommits}</span>
                    <span>{Math.round(maxCommits / 2)}</span>
                    <span>0</span>
                  </div>

                  {/* 12-Month Bars Chart */}
                  <div className="h-24 flex-grow flex items-end justify-between gap-1.5 relative pt-4 px-1 select-none">
                    {months.map((m) => {
                      const count = monthlyCommits[m] || 0;
                      const pct = maxCommits > 0 ? (count / maxCommits) * 100 : 0;
                      return (
                        <div key={m} className="flex flex-col items-center flex-1 group/bar h-full justify-end relative">
                          {/* Hover Tooltip */}
                          <div className="absolute opacity-0 group-hover/bar:opacity-100 transition-opacity duration-200 pointer-events-none bg-accent text-[9px] text-white px-2 py-0.5 rounded -top-8 z-30 whitespace-nowrap shadow-sm font-mono transform -translate-x-1/2 left-1/2">
                            {m}: {count}
                          </div>
                          
                          {/* Graph Column */}
                          <div
                            className="w-full rounded-t bg-accent/20 group-hover/bar:bg-accent/80 transition-all duration-300 pointer-events-auto"
                            style={{ height: `${Math.max(pct, 5)}%` }}
                          />
                          
                          {/* Label character */}
                          <span className="text-[9px] font-mono font-medium text-muted mt-1 select-none">
                            {m[0]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
