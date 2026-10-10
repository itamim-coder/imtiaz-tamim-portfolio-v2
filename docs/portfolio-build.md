# Portfolio build notes

**Repo:** `D:/imtiaztamim-portfolio`  
**Domain target:** imtiaztamim.com  
**Theme:** Light · teal `#0f6e56`  
**Section refs:** [`portfolio-section-references.md`](./portfolio-section-references.md)

## Status — Sep 29, 2026

**Core product: DONE.** Public site + admin + Cloudinary + Resend + case studies are built.  
Next work is **content + deploy sync**, not new sections.

### Done

- Loader (Anish T) · Nav/Hero (Dhiraj) · Work (FlawlessNitin) · Portfolio grid (Ilan)
- About (Hussam) · Experience (Kamil) · Skills (nskr + CMS) · Commits (baghel)
- Blog public + admin · Contact (djayanth + Resend)
- Admin: projects · experience · skills · blog · settings
- Cloudinary: covers · feature demos · signed video upload
- Project tech tags: pick/drag from skills + freehand
- Vercel Node 24 · env-backed deploy

### Optional (not blocking)

| Item | Ref / note |
|------|------------|
| Hero intro motion | [min-khant-kyaw-portfolio](https://min-khant-kyaw-portfolio.vercel.app/) · nishmika.me |
| Loader welcome text | melvinjonesrepol.com |
| Custom domain | imtiaztamim.com → Vercel |
| Resend sending domain | Better inbox than test-from |

### Start now (recommended order)

1. **Content** — Re-upload broken covers · fix Cutco Live · fill feature demos where useful  
2. **Deploy** — Push latest admin/UI fixes to Vercel  
3. **Domain** — Attach imtiaztamim.com when ready  
4. **Motion** — Only if you want polish for demos/LinkedIn  

## Run locally

```bash
cd D:/imtiaztamim-portfolio
npm run dev
```

Open http://localhost:3000 · Admin `/admin/login`
