const MONTHS: Record<string, number> = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
};

export function parseExperienceDate(
  value: string,
  endOfPeriod = false,
): Date | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const date = new Date(`${trimmed}T00:00:00`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  if (/^\d{4}-\d{2}$/.test(trimmed)) {
    const [year, month] = trimmed.split("-").map(Number);
    return new Date(year, month - 1, endOfPeriod ? 28 : 1);
  }

  if (/^\d{4}$/.test(trimmed)) {
    return new Date(Number(trimmed), endOfPeriod ? 11 : 0, endOfPeriod ? 31 : 1);
  }

  const match = trimmed.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (match) {
    const month = MONTHS[match[1].toLowerCase()];
    if (month === undefined) return null;
    return new Date(Number(match[2]), month, 1);
  }

  return null;
}

export function toMonthInput(value: string) {
  const date = parseExperienceDate(value);
  if (!date) return "";
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${date.getFullYear()}-${month}`;
}

export function formatExperienceDate(value: string) {
  const date = parseExperienceDate(value);
  if (!date) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(date);
}