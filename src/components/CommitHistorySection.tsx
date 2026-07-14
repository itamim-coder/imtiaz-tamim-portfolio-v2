"use client";

import { GitHubCalendar } from "react-github-calendar";
import { COMMIT_HISTORY_YEARS } from "@/lib/contributions";

/** Light teal scale — matches site accent (baghel.dev uses default green). */
const heatTheme = {
  light: ["#e8edf1", "#b7d4c9", "#6fa890", "#3d8a6e", "#0f6e56"],
  dark: ["#e8edf1", "#b7d4c9", "#6fa890", "#3d8a6e", "#0f6e56"],
};

/**
 * Commit History — layout/behavior reference: https://www.baghel.dev/
 * (react-github-calendar · one card per year · reversed week order · neo border cards)
 * Years: 2024–2026 for Imtiaz.
 */
export function CommitHistorySection() {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME?.trim();

  return (
    <section
      id="commit-history"
      className="mx-auto w-full max-w-3xl px-6 py-20"
      aria-labelledby="commit-history-heading"
    >
      <h2
        id="commit-history-heading"
        className="mb-8 font-[family-name:var(--font-display)] text-3xl tracking-tight text-foreground sm:text-4xl"
      >
        Commit History
      </h2>

      {!username ? (
        <div className="commit-card">
          <div className="commit-card-inner space-y-2 text-sm text-muted">
            <p className="font-medium text-foreground">GitHub username needed</p>
            <p>
              Set{" "}
              <code className="rounded bg-[var(--heat-0)] px-1.5 py-0.5 text-foreground">
                NEXT_PUBLIC_GITHUB_USERNAME
              </code>{" "}
              in <code className="text-foreground">.env.local</code> (same pattern as{" "}
              <a
                href="https://www.baghel.dev/"
                className="text-accent underline-offset-2 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                baghel.dev
              </a>
              ).
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {COMMIT_HISTORY_YEARS.map((year) => (
            <article key={year} className="commit-card">
              <div className="commit-card-inner overflow-x-auto">
                <GitHubCalendar
                  username={username}
                  year={year}
                  colorScheme="light"
                  theme={heatTheme}
                  blockSize={11}
                  blockMargin={3}
                  fontSize={12}
                  transformData={(contributions) =>
                    [...contributions].reverse()
                  }
                />
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
