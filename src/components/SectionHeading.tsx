import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  /** Display word, e.g. "Stack" → STACK · STACK */
  title: string;
  /** Optional right-side slot (badge, year tabs, etc.) */
  end?: ReactNode;
};

/**
 * Shared homepage section title: WORD · WORD (no serial index).
 * Parent sections must use the same content width (`max-w-6xl px-6`)
 * so titles share one left edge.
 * See `.cursor/rules/section-titles.mdc`.
 */
export function SectionHeading({ id, title, end }: SectionHeadingProps) {
  const label = title.toUpperCase();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <h2
        id={id}
        className="font-sans text-4xl font-bold uppercase tracking-tight text-accent sm:text-5xl md:text-6xl"
      >
        {label}{" "}
        <span className="text-accent/35" aria-hidden>
          · {label}
        </span>
      </h2>
      {end ? <div className="self-start sm:mt-2">{end}</div> : null}
    </div>
  );
}
