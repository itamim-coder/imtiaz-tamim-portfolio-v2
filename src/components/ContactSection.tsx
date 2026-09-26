/**
 * Contact — structure: https://djayanth.site/#contact
 * Narrative form + footer grid · light/teal site theme
 */
import { SectionHeading } from "@/components/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { ContactLocalTime } from "@/components/ContactLocalTime";
import { getSiteSettings } from "@/lib/site-settings";

const exploreLinks = [
  { href: "#work", label: "Work" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "/blog", label: "Blog" },
  { href: "#commit-history", label: "Commits" },
  { href: "#contact", label: "Contact" },
] as const;

export async function ContactSection() {
  const settings = await getSiteSettings();

  const socials = [
    { href: settings.githubUrl, label: "GitHub", icon: "github" },
    { href: settings.linkedinUrl, label: "LinkedIn", icon: "linkedin" },
    { href: settings.twitterUrl, label: "X", icon: "x" },
    { href: `mailto:${settings.email}`, label: "Email", icon: "mail" },
  ] as const;

  return (
    <section id="contact" className="relative w-full" aria-labelledby="contact-heading">
      <div className="mx-auto w-full max-w-6xl px-6 pt-20 sm:pt-24">
        <SectionHeading id="contact-heading" title="Contact" />
        <ContactForm />
      </div>

      <footer className="contact-footer mt-20 sm:mt-24">
        <div className="contact-footer-inner">
        <div className="contact-footer-grid">
          <div className="contact-footer-brand">
            <p className="font-sans text-2xl font-bold uppercase tracking-widest text-foreground sm:text-3xl">
              Imtiaz Tamim
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted sm:text-base">
              Full-stack product engineer — production SaaS, payments, APIs, and
              deploys that stay up under real traffic.
            </p>
          </div>

          <div>
            <h3 className="contact-footer-label">Explore</h3>
            <ul className="mt-4 space-y-2">
              {exploreLinks.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="contact-footer-link">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="contact-footer-label">Get in touch</h3>
            <ul className="mt-4 space-y-4">
              <li className="contact-footer-row">
                <span className="contact-footer-icon" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 21s7-4.5 7-10a7 7 0 1 0-14 0c0 5.5 7 10 7 10Z" />
                    <circle cx="12" cy="11" r="2.5" />
                  </svg>
                </span>
                <span>
                  <span className="contact-footer-meta">Location</span>
                  <span className="block font-sans text-sm font-medium text-foreground">
                    Dhaka, Bangladesh
                  </span>
                </span>
              </li>
              <li className="contact-footer-row">
                <span className="contact-footer-icon" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path strokeLinecap="round" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <span>
                  <span className="contact-footer-meta">Email</span>
                  <a
                    href={`mailto:${settings.email}`}
                    className="block font-sans text-sm font-medium text-foreground transition-colors hover:text-accent"
                  >
                    {settings.email}
                  </a>
                </span>
              </li>
              <li className="contact-footer-row">
                <span className="contact-footer-icon" aria-hidden>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>
                </span>
                <span>
                  <span className="contact-footer-meta">Local time</span>
                  <ContactLocalTime />
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="contact-footer-label">Connect</h3>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Open to remote contract and full-time roles. Reach out on any
              channel below.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {socials.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={icon === "mail" ? undefined : "_blank"}
                  rel={icon === "mail" ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className="contact-social-btn"
                >
                  {icon === "github" && (
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.395-.135-.345-.72-1.395-1.23-1.875-.42-.45-1.02-.765-.42-.78.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A8.203 8.203 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
                    </svg>
                  )}
                  {icon === "linkedin" && (
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )}
                  {icon === "x" && (
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                  {icon === "mail" && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path strokeLinecap="round" d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="contact-footer-bar mt-10 border-t border-line pt-6">
          <p className="font-sans text-xs tracking-wide text-muted">
            © {new Date().getFullYear()} Imtiaz Tamim · Full-Stack Product Engineer
          </p>
        </div>
        </div>
      </footer>
    </section>
  );
}
