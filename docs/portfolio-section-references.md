# Portfolio — section reference guide

**Site:** imtiaztamim.com · **Repo:** `D:/imtiaztamim-portfolio`  
**Theme:** Light only (`#f4f6f8` bg · teal `#0f6e56` accent)  
**Canonical:** this file · mirror in `imtiaztamim-portfolio/docs/portfolio-section-references.md`

Use this doc when building — **one section = one reference row**. Do not mix layouts across sections.

---

## Page order (target)

| # | Section | Anchor | Status |
|---|---------|--------|--------|
| 0 | Loader | — | ✅ Built |
| 1 | Navbar + Hero | — | ✅ Built (animation planned) |
| 2 | Selected Work | `#work` | ✅ Built (FlawlessNitin zig-zag · video · icons) |
| 3 | Portfolio grid | `#portfolio` | ❌ Not built |
| 4 | About | `#about` | ✅ Built |
| 5 | Experience | `#experience` | ❌ Not built |
| 6 | Skills | `#skills` | ✅ Built (nskr + icons · no certs) |
| 7 | Commit History | `#commit-history` | ✅ Built |
| 8 | Blog | `#blog` / `/blog` | ❌ Admin only |
| 9 | Contact | `#contact` | ❌ Not built |
| 10 | Case studies | `/work/[slug]` | ❌ Later |

**Current homepage:** Loader → Hero → **Selected Work** → About → Skills → Commit History

---

## 0. Loader / entry mark

| | |
|---|---|
| **Status** | ✅ Built |
| **Component** | `src/components/InitialLoader.tsx` · `GeometricMark.tsx` |
| **Primary reference** | [anish7.me](https://www.anish7.me/) |
| **Secondary reference** | [melvinjonesrepol.com](https://www.melvinjonesrepol.com/) — welcome/intro motion polish only |

### Take from reference
- Geometric monogram **draw → solid fill → exit** (~1–1.5s max)
- Our mark: fragmented **T** (not Anish’s shape 1:1)
- Light loader bg `#f4f6f8` — no dark flash

### Do not copy
- Dark loader screens
- “100% remaining” progress gimmicks
- Long cinematic intros (>1.5s)

### Melvin (later polish)
- Optional welcome text motion after T mark
- Keep total entry under ~1.5s

---

## 1. Navbar + Hero / banner

| | |
|---|---|
| **Status** | ✅ Layout built · ⏳ Banner animation planned |
| **Components** | `Navbar.tsx` · `LocalStatus.tsx` · `Hero.tsx` · `SocialSidebar.tsx` |
| **Primary reference (layout)** | [dhirajbhawsar.in](https://dhirajbhawsar.in/) · [hireme](https://dhirajbhawsar.in/hireme) |
| **Banner ideas (Jul 24)** | [nishmika.me](https://www.nishmika.me/) |
| **Banner animation (planned)** | [min-khant-kyaw-portfolio.vercel.app](https://min-khant-kyaw-portfolio.vercel.app/) |
| **Social in banner (optional)** | [kaushalrajgupta.is-a.dev](https://kaushalrajgupta.is-a.dev/) |

### Take from Dhiraj
- Sticky header · brand left
- **Center nav pill** — Work · About · Contact · Hire Me
- **Right status pill** — rotating slides: temp · Dhaka · time · hello carousel · Available
- Static ⌘K badge (no fake visitor count)
- Hero: centered headline + subline + dual CTAs (Connect + email copy)
- Soft oval gradient washes behind hero

### Take from Min Khant (planned)
- Subtle **hero intro animation** after loader exits
- Text/CTA fade or stagger — light motion only

### Take from Kaushal (optional)
- GitHub · LinkedIn · email icons **in or near hero** (we already have `SocialSidebar` on the right)

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
| **Primary layout (Jul 25)** | [flawlessnitin.com/#projects](https://flawlessnitin.com/#projects) — zig-zag cards · **video** thumbnail · **icon** tech pills · Case study + Live |
| **Also** | [ilans.net](https://ilans.net/) structure · [newtonyuan.com](https://newtonyuan.com/) featured emphasis |
| **Data** | MongoDB `Project` `featured: true` · admin `/admin/projects` (`videoUrl`, `highlight`, `year`, `category`, `statusLabel`) |

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

### Our featured projects (seed)
1. **Jetixia** — multi-supplier booking + payments
2. **Kornest** — team collab + mediasoup VPS
3. **Cutco** — web + mobile energy switching

### Do not copy
- Purple Live dots / heavy 3D motion gimmicks
- Cloning FlawlessNitin copy

---

## 3. Portfolio grid (all projects)

| | |
|---|---|
| **Status** | ❌ Not built |
| **Anchor** | `#portfolio` (or same `#work` block below featured) |
| **Primary reference** | [ilans.net](https://ilans.net/) — section **02 More projects** |
| **Data** | MongoDB `Project` where `published: true` and `featured: false` |

### Take from Ilan
- Smaller grid cards for remaining work
- Title · one-line blurb · stack tags · GitHub / case study links
- Optional grouping: Personal / Client work (later)

### Our projects (full list)
Jetixia · Kornest · Cutco · EchoVoice · Canvasive (+ Moynaa optional)

### Do not duplicate
- Same long blurbs as Selected Work — shorter here

---

## 4. About

| | |
|---|---|
| **Status** | ✅ Built |
| **Anchor** | `#about` |
| **Component** | `src/components/AboutSection.tsx` |
| **Primary reference** | [Hussam Barqawi](https://portfolio-kappa-mauve-pfdsqi3ae7.vercel.app/) |

### Take from Hussam (adapted)
- Section **headline** (one strong line)
- **Paragraph** — who you are + what you ship (production SaaS, not AI buzzwords)
- **3 numbered principle cards** (01 / 02 / 03)
- **Stats bar** — years · products · APIs · clients · tech (honest numbers only)

### Our principles
1. **Production-first**
2. **Integration-heavy**
3. **End-to-end ownership**

### Do not copy
- Dark theme · gold accents
- AI-engineer copy (RAG, agents, frontier models)

---

## 5. Experience

| | |
|---|---|
| **Status** | ❌ Not built (admin CRUD ✅) |
| **Anchor** | `#experience` |
| **Primary reference** | [kamilmazurek.pl](https://kamilmazurek.pl/#top) |
| **Data** | MongoDB `Experience` · admin `/admin/experience` |

### Take from Kamil
- Chronological **job blocks**
- Company · date range · role title
- Short bullet paragraph (ownership, not product feature lists)
- Optional: location · Remote

### Our entries (seed)
- **TrustGuid** — Cutco, EchoVoice, Canvasive
- **Jetixia / Booking Desk** — Jetixia platform, Kornest
- **Moynaa** — optional third row

### Do not duplicate
- Project card content from Selected Work / Portfolio

---

## 6. Skills

| | |
|---|---|
| **Status** | ✅ Built |
| **Anchor** | `#skills` |
| **Component** | `imtiaztamim-portfolio/src/components/SkillsSection.tsx` |
| **CMS** | `/admin/skills` · MongoDB `Skill` · `/api/skills` |
| **Title** | `SectionHeading` → **STACK · STACK** (no serial · agent rule) |
| **Primary layout** | [nskr.dev](https://www.nskr.dev/) — category columns · pills · badge |
| **Our addition** | Icon in each pill |
| **Not on page** | Certifications (resume / LinkedIn only) |

### Take from nskr
- STACK · STACK title · category columns · pill tags · production badge

### Our twist
- Shared section title for every section · teal · icon pills · no serial · no certs · CMS `/admin/skills`

### Do not copy
- Orange branding · kitchen-sink lists · homepage cert block

---

## 7. Commit History

| | |
|---|---|
| **Status** | ✅ Built |
| **Anchor** | `#commit-history` |
| **Component** | `src/components/CommitHistorySection.tsx` |
| **Primary reference** | [baghel.dev](https://www.baghel.dev/) |

### Take from baghel
- `react-github-calendar` inside **neo cards** (rounded border + offset shadow)
- **One card per year** · years **2024–2026**
- Teal heat scale matching site accent
- Reversed week order in card

### Config
- `NEXT_PUBLIC_GITHUB_USERNAME` in `.env.local`

### Do not CMS
- Stays automatic from GitHub — not in admin dashboard

---

## 8. Blog

| | |
|---|---|
| **Status** | ❌ Public routes not built · admin CRUD ✅ |
| **Routes** | `/blog` · `/blog/[slug]` (planned) |
| **Data** | MongoDB `BlogPost` · admin `/admin/blog` |
| **Reference** | No single locked site — general section rhythm from collected list |

### Content direction
- Proof posts for clients + recruiters (Jetixia API unification · Kornest WebRTC · etc.)
- Teaser block on homepage: 2–3 latest published posts

### Secondary inspiration
- [karanchhunchha.in](https://www.karanchhunchha.in/) — general structure only

---

## 9. Contact

| | |
|---|---|
| **Status** | ❌ Not built |
| **Anchor** | `#contact` |
| **Primary reference** | [djayanth.site](https://djayanth.site/) |
| **Tone (secondary)** | [gabrielthecode.com/#contact](https://gabrielthecode.com/#contact) |

### Take from djayanth
- Clean **hire-me block** at page bottom
- Headline + short pitch
- Email CTA · social row (GitHub · LinkedIn)
- Light theme · matches site teal

### Take from Gabriel (tone only)
- Strong headline (*Let's build something…*)
- Copy-email interaction
- Availability line (*Remote · open to contract*)

### CMS
- Email + social URLs from admin **Settings**

---

## 10. Case studies (later)

| | |
|---|---|
| **Status** | ❌ Not built |
| **Routes** | `/work/jetixia` · `/work/kornest` · `/work/cutco` |
| **Reference** | Extend **Ilan** case-study link pattern from Selected Work cards |

### Priority
1. Kornest (LinkedIn proof — mediasoup + workspace)
2. Jetixia or Cutco

---

## Admin dashboard (CMS)

| | |
|---|---|
| **URL** | `/admin/login` |
| **Stack** | MongoDB · Mongoose · shadcn/ui |
| **DB** | `portfolio` on Atlas |

| Admin page | Public section | Model |
|------------|----------------|-------|
| Projects | Selected Work + Portfolio | `Project` · `featured` flag |
| Experience | Experience | `Experience` |
| Blog | Blog | `BlogPost` |
| Settings | Hero · Contact · SEO | `SiteSettings` |

**Seed:** `npm run seed`

---

## Optional / not locked

| Site | Use |
|------|-----|
| [gazimdanas.netlify.app](https://gazimdanas.netlify.app/) | General mood |
| [karanchhunchha.in](https://www.karanchhunchha.in/) | General reference |
| [macos-kuldeeprajput.vercel.app](https://macos-kuldeeprajput.vercel.app/) | macOS UI experiment — **do not** replace light theme |
| [ui.aceternity.com](https://ui.aceternity.com/components) | Max 1–2 motion pieces later |
| [brittanychiang.com](https://brittanychiang.com/) | Recruiter intro pattern (optional) |

---

## Global rules

1. **Light + teal** — never ship dark as primary theme
2. **Brand:** Imtiaz Tamim · imtiaztamim.com
3. **Mix references** — don’t clone one site 1:1
4. **Audience:** clients (Upwork) + recruiters — proof before fluff
5. **Rejected:** portfolio voting section · large certifications homepage block
6. **Loader max** ~1–1.5s

---

## Quick reference matrix

| Section | Primary URL | Built? |
|---------|-------------|--------|
| Loader | anish7.me | ✅ |
| Nav + Hero | dhirajbhawsar.in | ✅ |
| Hero animation | min-khant-kyaw-portfolio.vercel.app · nishmika.me | ⏳ |
| Selected Work | flawlessnitin.com/#projects · video + icons | ✅ |
| Portfolio | ilans.net (02) | ❌ |
| About | Hussam Vercel | ✅ |
| Experience | kamilmazurek.pl | ❌ |
| Skills | nskr.dev · CMS `/admin/skills` | ✅ |
| Commit History | baghel.dev | ✅ |
| Contact | djayanth.site | ❌ |
| Blog | — | ❌ public |

---

*Last updated: Jul 24, 2026*
