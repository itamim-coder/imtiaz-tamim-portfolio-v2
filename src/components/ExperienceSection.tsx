/**
 * Experience — layout: https://kamilmazurek.pl/
 * Logo · company · website · role · dates · year rail
 */
import { SectionHeading } from "@/components/SectionHeading";
import { connectDB } from "@/lib/mongodb";
import { Experience } from "@/models/Experience";
import {
  formatExperienceDate,
  parseExperienceDate,
} from "@/lib/experience-dates";

type ExperienceItem = {
  role: string;
  company: string;
  location?: string | null;
  websiteUrl?: string | null;
  logoUrl?: string | null;
  startDate: string;
  endDate?: string | null;
  current: boolean;
  description: string;
  tags?: string[] | null;
};

function yearFromItem(item: ExperienceItem, now: Date) {
  if (item.current) return now.getFullYear();
  const start = parseExperienceDate(item.startDate);
  if (start) return start.getFullYear();
  const end = item.endDate ? parseExperienceDate(item.endDate, true) : null;
  return end?.getFullYear() ?? now.getFullYear();
}

function dateRange(item: ExperienceItem) {
  const start = formatExperienceDate(item.startDate);
  if (item.current) return `${start} – currently`;
  if (item.endDate?.trim()) {
    return `${start} – ${formatExperienceDate(item.endDate)}`;
  }
  return start;
}

function tenureLabel(item: ExperienceItem, now: Date) {
  if (item.current) return "ongoing";

  const start = parseExperienceDate(item.startDate);
  const end = item.endDate ? parseExperienceDate(item.endDate, true) : now;
  if (!start || !end) return "";

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (months < 1) return "1 month";
  if (months < 12) return `${months} months`;

  const years = Math.floor(months / 12);
  const leftover = months % 12;
  const yearPart = years === 1 ? "1 year" : `${years} years`;
  if (leftover === 0) return yearPart;
  const monthPart = leftover === 1 ? "1 month" : `${leftover} months`;
  return `${yearPart} ${monthPart}`;
}

function websiteLabel(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }
}

export async function ExperienceSection() {
  await connectDB();
  const items = (await Experience.find({ published: true })
    .sort({ order: 1 })
    .lean()) as ExperienceItem[];

  if (items.length === 0) {
    return null;
  }

  const now = new Date();

  return (
    <section
      id="experience"
      className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:py-24"
      aria-labelledby="experience-heading"
    >
      <SectionHeading id="experience-heading" title="Experience" />

      <ol className="experience-list mt-12">
        {items.map((item) => {
          const tenure = tenureLabel(item, now);
          const year = yearFromItem(item, now);
          const website = item.websiteUrl?.trim() ?? "";
          const logo = item.logoUrl?.trim() ?? "";

          return (
            <li
              key={`${item.company}-${item.startDate}`}
              className="experience-row"
            >
              <div className="experience-main">
                <div className="experience-split">
                  <div className="flex items-start gap-3">
                    {logo ? (
                      <img
                        src={logo}
                        alt=""
                        className="experience-logo"
                      />
                    ) : null}
                    <div>
                      <h3 className="experience-company">{item.company}</h3>
                      {item.location ? (
                        <p className="experience-location">{item.location}</p>
                      ) : null}
                    </div>
                  </div>
                  {tenure ? <p className="experience-tenure">{tenure}</p> : null}
                </div>

                <div className="experience-split experience-role-row">
                  <h4 className="experience-role">{item.role}</h4>
                  <p className="experience-dates">{dateRange(item)}</p>
                </div>

                <p className="experience-copy">{item.description}</p>

                {website ? (
                  <p className="experience-site">
                    Company website:{" "}
                    <a
                      href={website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {websiteLabel(website)}
                    </a>
                  </p>
                ) : null}

                {item.tags && item.tags.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <li key={tag} className="experience-tag">
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <p className="experience-year" aria-hidden>
                {year}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
