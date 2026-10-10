# Portfolio — section reference guide

**Site:** imtiaztamim.com · **Repo:** `D:/imtiaztamim-portfolio`  
**Theme:** Light only (`#f4f6f8` bg · teal `#0f6e56` accent)  
**Canonical:** this file · mirror in `agent-context/portfolio/portfolio-section-references.md`

Use this doc when building — **one section = one reference row**. Do not mix layouts across sections.

**Product status (Sep 29, 2026):** ✅ **Core build complete** — public site + admin CMS + Cloudinary + Resend contact + Vercel-ready. Remaining work is **content polish**, **deploy sync**, and **optional** motion/domain extras.

---

## Page order (live)

| # | Section | Anchor | Status |
|---|---------|--------|--------|
| 0 | Loader | — | ✅ Built |
| 1 | Navbar + Hero | — | ✅ Built · ⚪ Hero motion **optional** |
| 2 | Selected Work | `#work` | ✅ Built |
| 3 | Portfolio grid | `#portfolio` | ✅ Built |
| 4 | About | `#about` | ✅ Built |
| 5 | Experience | `#experience` | ✅ Built (Kamil layout · CMS dates/logo/website) |
| 6 | Skills | `#skills` | ✅ Built |
| 7 | Commit History | `#commit-history` | ✅ Built |
| 8 | Blog | `#blog` / `/blog` / `/blog/[slug]` | ✅ Built · Cloudinary covers |
| 9 | Contact | `#contact` | ✅ Built (djayanth · Resend) |
| 10 | Case studies | `/work/[slug]` | ✅ Built · feature media upload |

**Homepage:** Loader → Hero → Work → Portfolio → About → Experience → Skills → Commits → Blog → Contact

---

## Build vs optional (Sep 29)

| Area | Status | Notes |
|------|--------|--------|
| Public sections | ✅ Done | All homepage sections live |
| Admin CMS | ✅ Done | Projects · Experience · Skills · Blog · Settings |
| Cloudinary | ✅ Done | Covers · feature demos · signed video upload |
| Tech tags picker | ✅ Done | Pick/drag from skills + freehand |
| Contact email | ✅ Done | Resend · honeypot |
| Deploy (Vercel) | ✅ Live | Redeploy after local CMS/UI changes |
| Project covers / demos | 🟡 Content | Re-upload any broken Cloudinary URLs · Save |
| Cutco Live link | 🟡 Content | Clear or replace dead demo URL |
| **imtiaztamim.com** domain | ⚪ Optional | Point DNS → Vercel when ready |
| Hero intro motion | ⚪ Optional | Refs below — not blocking hire |
| Resend custom domain | ⚪ Optional | Better deliverability than test-from |
| Hero/loader polish | ⚪ Optional | Melvin welcome text · Aceternity max 1–2 |

---

## What to start next (priority)

1. **Content accuracy (do first)** — Fix covers (re-upload → Save), Cutco Live truth, featured project blurbs/screenshots.
2. **Ship latest code** — Push + Vercel redeploy so tag picker / media upload / cover fixes are live.
3. **Custom domain** — Attach **imtiaztamim.com** in Vercel Domains when DNS is ready.
4. **Only then optional motion** — Hero stagger from Min Khant if you want polish for LinkedIn demos.

---

## 0. Loader / entry mark

| | |
|---|---|
| **Status** | ✅ Built |
| **Component** | `src/components/InitialLoader.tsx` · `GeometricMark.tsx` |
| **Primary reference** | [anish7.me](https://www.anish7.me/) |
| **Secondary reference** | [melvinjonesrepol.com](https://www.melvinjonesrepol.com/) — welcome/intro motion polish only · **optional** |

### Take from reference
- Geometric monogram **draw → solid fill → exit** (~1–1.5s max)
- Our mark: fragmented **T** (not Anish’s shape 1:1)
- Light loader bg `#f4f6f8` — no dark flash

### Do not copy
- Dark loader screens
- “100% remaining” progress gimmicks
- Long cinematic intros (>1.5s)

---

## 1. Navbar + Hero / banner

| | |
|---|---|
| **Status** | ✅ Layout built · ⚪ Banner animation **optional** (not required) |
| **Components** | `Navbar.tsx` · `LocalStatus.tsx` · `Hero.tsx` · `SocialSidebar.tsx` |
| **Primary reference (layout)** | [dhirajbhawsar.in](https://dhirajbhawsar.in/) · [hireme](https://dhirajbhawsar.in/hireme) |
| **Banner ideas** | [nishmika.me](https://www.nishmika.me/) |
| **Banner animation (optional)** | [min-khant-kyaw-portfolio.vercel.app](https://min-khant-kyaw-portfolio.vercel.app/) |
| **Social in banner (optional)** | [kaushalrajgupta.is-a.dev](https://kaushalrajgupta.is-a.dev/) |

### Take from Dhiraj
- Sticky header · brand left
- **Center nav pill** — Work · About · Contact · Hire Me
- **Right status pill** — rotating slides: temp · Dhaka · time · hello carousel · Available
- Static ⌘K badge (no fake visitor count)
- Hero: centered headline + subline + dual CTAs (Connect + email copy)
- Soft oval gradient washes behind hero

### Take from Min Khant (optional later)
- Subtle **hero intro animation** after loader exits
- Text/CTA fade or stagger — light motion only

### Our copy (hero)
- Line 1: *I build products that handle real traffic*
- Line 2 (gradient italic): *and real money.*
- Subline: *Hello I'm Imtiaz \| Full-Stack Product Engineer*

### CMS
- Hero lines editable in admin → **Settings** (`/admin/settings`)

### Do not copy
- Dhiraj’s exact copy or dark variants
- Heavy parallax or template purple glow

---

## 2. Selected Work

| | |
|---|---|
| **Status** | ✅ Built |
| **Anchor** | `#work` |
| **Component** | `SelectedWorkSection.tsx` · case study `/work/[slug]` |
| **Primary layout** | [flawlessnitin.com/#projects](https://flawlessnitin.com/#projects) — zig-zag · video · icon pills · Case study + Live |
| **Also** | [ilans.net](https://ilans.net/) structure · [newtonyuan.com](https://newtonyuan.com/) featured emphasis |
| **Data** | MongoDB `Project` `featured: true` · admin `/admin/projects` |

### Take from FlawlessNitin
- Alternating media / copy columns
- Autoplay muted loop **video** on thumbnail (poster = `imageUrl`)
- Year · category meta · title · blurb · italic highlight callout
- Tech pills with **icons** (+N overflow)
- **Case study** → `/work/[slug]` · **Live** globe → `liveUrl`

### Our twist
- `SectionHeading` → **WORK · WORK**
- Teal/light brand · CMS-managed fields
- Title: Work not “Projects”

### Do not copy
- Purple Live dots / heavy 3D motion gimmicks
- Cloning FlawlessNitin copy

---

## 3. Portfolio grid (all projects)

| | |
|---|---|
| **Status** | ✅ Built |
| **Anchor** | `#portfolio` |
| **Component** | `PortfolioGridSection.tsx` |
| **Primary reference** | [ilans.net](https://ilans.net/) — section **02 More projects** |
| **Data** | MongoDB `Project` where `published: true` and `featured: false` |

### Take from Ilan
- Smaller grid cards for remaining work
- Title · blurb · stack tags · GitHub / live links

---

## 4. About

| | |
|---|---|
| **Status** | ✅ Built |
| **Anchor** | `#about` |
| **Component** | `src/components/AboutSection.tsx` |
| **Primary reference** | [Hussam Barqawi](https://portfolio-kappa-mauve-pfdsqi3ae7.vercel.app/) |

### Take from Hussam (adapted)
- Section **headline** + **paragraph** + **3 numbered principle cards** + **stats bar**

### Do not copy
- Dark theme · gold accents · AI-engineer buzzwords

---

## 5. Experience

| | |
|---|---|
| **Status** | ✅ Built |
| **Anchor** | `#experience` |
| **Component** | `src/components/ExperienceSection.tsx` |
| **Primary reference** | [kamilmazurek.pl](https://kamilmazurek.pl/#top) |
| **Data** | MongoDB `Experience` · admin `/admin/experience` (dates · logo · website) |

---

## 6. Skills

| | |
|---|---|
| **Status** | ✅ Built |
| **Anchor** | `#skills` |
| **Component** | `SkillsSection.tsx` |
| **CMS** | `/admin/skills` · also feeds **project tag picker** |
| **Primary layout** | [nskr.dev](https://www.nskr.dev/) |

---

## 7. Commit History

| | |
|---|---|
| **Status** | ✅ Built |
| **Anchor** | `#commit-history` |
| **Component** | `CommitHistorySection.tsx` |
| **Primary reference** | [baghel.dev](https://www.baghel.dev/) |
| **Config** | `NEXT_PUBLIC_GITHUB_USERNAME` |

---

## 8. Blog

| | |
|---|---|
| **Status** | ✅ Built |
| **Routes** | Homepage teaser · `/blog` · `/blog/[slug]` |
| **Data** | MongoDB `BlogPost` · admin `/admin/blog` · Cloudinary covers |

---

## 9. Contact

| | |
|---|---|
| **Status** | ✅ Built |
| **Anchor** | `#contact` |
| **Components** | `ContactSection.tsx` · `ContactForm.tsx` · `/api/contact` |
| **Primary reference** | [djayanth.site](https://djayanth.site/) |
| **Tone (secondary)** | [gabrielthecode.com/#contact](https://gabrielthecode.com/#contact) |
| **Mail** | Resend (`RESEND_API_KEY` · `CONTACT_TO_EMAIL`) |

---

## 10. Case studies

| | |
|---|---|
| **Status** | ✅ Built |
| **Routes** | `/work/[slug]` |
| **Media** | Cover `imageUrl` · header `videoUrl` · per-feature demo upload (Cloudinary) |
| **CMS** | `/admin/projects` — features · role · problem · outcome · tech tags (skill pick + freehand) |

---

## Admin dashboard (CMS)

| | |
|---|---|
| **URL** | `/admin/login` |
| **Stack** | MongoDB · Mongoose · shadcn/ui · Cloudinary |

| Admin page | Public section | Model |
|------------|----------------|-------|
| Projects | Work + Portfolio + case studies | `Project` |
| Experience | Experience | `Experience` |
| Skills | Stack + project tag picker | `Skill` |
| Blog | Blog | `BlogPost` |
| Settings | Hero · Contact · SEO | `SiteSettings` |

**Seed:** `npm run seed`

---

## Optional / not locked

| Site | Use |
|------|-----|
| [min-khant-kyaw-portfolio.vercel.app](https://min-khant-kyaw-portfolio.vercel.app/) | Optional hero intro motion |
| [nishmika.me](https://www.nishmika.me/) | Optional banner motion ideas |
| [melvinjonesrepol.com](https://www.melvinjonesrepol.com/) | Optional loader welcome text |
| [gazimdanas.netlify.app](https://gazimdanas.netlify.app/) | General mood |
| [ui.aceternity.com](https://ui.aceternity.com/components) | Max 1–2 motion pieces later |
| [brittanychiang.com](https://brittanychiang.com/) | Recruiter intro pattern (optional) |

---

## Global rules

1. **Light + teal** — never ship dark as primary theme
2. **Brand:** Imtiaz Tamim · imtiaztamim.com
3. **Mix references** — don’t clone one site 1:1
4. **Audience:** clients (Upwork) + recruiters — proof before fluff
5. **Rejected:** portfolio voting · large certifications homepage block
6. **Loader max** ~1–1.5s
7. **Optional ≠ backlog debt** — hero motion / domain / Resend domain only when content is solid

---

## Quick reference matrix

| Section | Primary URL | Built? |
|---------|-------------|--------|
| Loader | anish7.me | ✅ |
| Nav + Hero | dhirajbhawsar.in | ✅ |
| Hero animation | min-khant-kyaw · nishmika | ⚪ Optional |
| Selected Work | flawlessnitin.com/#projects | ✅ |
| Portfolio | ilans.net (02) | ✅ |
| About | Hussam Vercel | ✅ |
| Experience | kamilmazurek.pl | ✅ |
| Skills | nskr.dev · CMS | ✅ |
| Commit History | baghel.dev | ✅ |
| Blog | — | ✅ |
| Contact | djayanth.site · Resend | ✅ |
| Case studies | — · Cloudinary media | ✅ |

---

*Last updated: Sep 29, 2026*
