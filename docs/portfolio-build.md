# Portfolio build notes

**Repo / folder:** `D:/imtiaztamim-portfolio` (this file lives in `docs/`)  
**Domain target:** imtiaztamim.com  
**Theme:** Light site; loader matches light palette  
**Jul 13:** Context docs kept in-repo under `docs/` · site still placeholder after loader

## Done (Jul 11)

- Next.js + TS + Tailwind scaffold
- Initial loader: geometric T outline **draw → solid black fill →** fade to page
- Fonts: Fraunces (display) + Outfit (body)
- Site accent: deep teal `#0f6e56`

## Done (Jul 13)

- Commit History (2024–2026) — pattern from **baghel.dev** via `react-github-calendar`; set `NEXT_PUBLIC_GITHUB_USERNAME`

## Done (Jul 22)

- **Hero copy** — “real traffic & real money”
- **About section** — Hussam layout → `AboutSection.tsx` · `#about`
- **MongoDB + admin dashboard** — shadcn UI at `/admin` · Projects / Blog / Experience / Settings
- **Seed script** — `npm run seed` → `portfolio` database
- **Reference locks** — Ilan (work) · Hussam (about) · djayanth.site (contact)

See **`agent-context/portfolio/scan-2026-07-22.md`** for session wrap-up.  
**Section references:** **`docs/portfolio-section-references.md`** — one doc per homepage section.

## Done (Jul 24–25)

- **Skills STACK** — nskr layout · icon pills · `SectionHeading` · CMS `/admin/skills` · seed 32 skills
- **Selected Work** — FlawlessNitin zig-zag · video slots · Live links (Jetixia / Kornest / Cutco)
- **Case studies** — `/work/[slug]` with Role · Problem · Outcome · feature deep-dives (+ per-feature video slots)
- **Refs locked** — nskr · FlawlessNitin · Nishmika · NewtonYuan
- **Title alignment** — all sections `max-w-6xl` · WORK / ABOUT / STACK / COMMITS

## Next

1. **Contact** — [djayanth.site](https://djayanth.site/) · `#contact`
2. Feature / hero **videos** + screenshots when ready
3. Portfolio grid (non-featured) · Experience public section
4. **Deploy** when Contact is ready
5. Public **`/blog`** routes + wire hero/about to CMS (optional)

## Run locally

```bash
cd D:/imtiaztamim-portfolio
npm run dev
```

Open http://localhost:3000

