# Draft — Experience & Projects (Brittany Chiang v4 style)

Layout cue from [v4.brittanychiang.com](https://v4.brittanychiang.com/):  
scrollable **Experience** list (role · company · range · blurb · tags), then **Projects** (title · blurb · tags · optional links).  
Light theme + your teal — not a 1:1 clone of her dark UI.

**Status:** copy draft only — not wired into the site yet.

---

## Experience

### Full-Stack Product Engineer · TrustGuid  
**Remote · [Start] – Present**

Own end-to-end delivery across multiple SaaS products for international clients — architecture, UI, APIs, data, and deploys. Ship web and mobile features in production without handing off the last mile.

Products in this role: Cutco, EchoVoice, Canvasive.

`Next.js` `React Native` `Node.js` `PostgreSQL` `Prisma` `Supabase` `Vapi` `Twilio`

---

### Full-Stack Product Engineer · Jetixia  
**Remote · 2024 – Present**

Own the white-label B2B travel platform wholesalers rebrand and run under their own domains. Ship multi-vertical booking (hotels, flights, transfers, activities, extranet) and payment-gateway integrations requested per wholesaler. Operate production on VPS (nginx, systemd, monitoring). Also ship **Kornest** — Jetixia’s multi-tenant team collaboration SaaS product (not an internal-only tool).

`Node.js` `Express` `MongoDB` `Microservices` `YBS` `FIB` `Stripe` `mediasoup` `Prometheus` `Grafana`

---

### Tech Lead · Moynaa  
**Remote · Dec 2023 – Present**

Led MVP from prototype to production; drove prioritization and delivery across web and mobile for an early-stage product.

`React` `Node.js` `MongoDB`

---

## Projects

### Jetixia — White-label B2B travel platform  
**Jetixia · e.g. bdesktravel.com · flywinbookings**

One white-label booking product. Hostname branding per wholesaler. Hotels (10+ suppliers), flights, transfers, activities, extranet, hotel mapping. Payment gateways (**YBS**, **FIB**, **Stripe**) configured per wholesaler request.

`Node.js` `Express` `MongoDB` `YBS` `FIB` `Stripe` `HotelBeds` `IRIX` `HyperGuest` `Sabre`

<!-- Link: case study later · live if public -->

---

### Kornest — Team collaboration SaaS  
**Jetixia · going public soon**

Multi-tenant workspace: sprint Kanban, real-time chat, wiki docs, leave/HR, and video meetings. Production video via self-hosted **mediasoup SFU** on Hetzner VPS with Prometheus/Grafana — not a managed video SaaS.

`React` `Express` `MongoDB` `Socket.io` `mediasoup` `nginx` `systemd`

<!-- Link: https://kornest.com when ready to feature -->

---

### Cutco — Energy comparison & switching  
**TrustGuid**

Australian energy comparison and switching platform — web SaaS, mobile app, and retailer workflow automation around plan compare and switch flows.

`Next.js` `Prisma` `PostgreSQL` `Expo` `React Native`

---

### EchoVoice — AI voice agents  
**TrustGuid**

SaaS to build and deploy AI phone agents — agent builder UI, voice workflows, and telephony orchestration (Vapi / Twilio).

`React` `Vapi` `Twilio` `Supabase` `Node.js`

---

### Canvasive — AI marketing automation  
**TrustGuid**

Campaign and content automation — design/studio flows plus n8n-orchestrated social and ads pipelines.

`React` `Supabase` `n8n` `Polotno`

---

## Notes for layout (when we build)

**Experience row (Brittany-like):**
```
2024 — Present     Full-Stack Product Engineer
                   Jetixia / Booking Desk
                   [short paragraph]
                   [tag] [tag] [tag]
```

**Project card (Brittany-like, but no heavy cards in hero — OK below fold):**
```
Title              short problem → what you built
Company            [tags]
```

**Order on page:** Experience first (jobs), then Projects (products) — same as v4 Brittany.  
**Do not** dump the same feature list in both; Experience = ownership, Projects = product + stack.

## Fill before ship
- [ ] TrustGuid start month/year  
- [ ] Public links (Kornest, Cutco, etc.) only when OK to show  
- [ ] Optional: trim Moynaa if you want a tighter 2-role Experience block  
