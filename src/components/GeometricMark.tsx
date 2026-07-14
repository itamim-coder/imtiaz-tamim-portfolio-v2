/** Fragmented geometric T — disconnected shards (Anish construction language). */
export function GeometricMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Top-left shard */}
      <path
        className="mark-path mark-path--1"
        pathLength={1}
        d="M12 37 L47 25 L47 13 L12 25 Z"
      />
      {/* Top-right shard — gap from left */}
      <path
        className="mark-path mark-path--2"
        pathLength={1}
        d="M88 37 L53 25 L53 13 L88 25 Z"
      />
      {/* Stem — gap below crossbar */}
      <path
        className="mark-path mark-path--3"
        pathLength={1}
        d="M41 105 L50 102 L59 105 L59 38 L50 35 L41 38 Z"
      />
    </svg>
  );
}
