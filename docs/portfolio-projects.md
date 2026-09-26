# Portfolio — D: Drive Project Map

Structured summary of production work found on `D:/` (Jul 2026 scan).

---

## Overview

| Domain | Path | Summary |
|--------|------|---------|
| **Cutco** (TrustGuid) | `D:/Cutco/` | Australian energy comparison & switching platform |
| **EchoVoice / Sonic** (TrustGuid) | `D:/sonic-agent-builder/` | AI voice agent SaaS |
| **Canvasive** (TrustGuid) | `D:/Canvasive/` | AI marketing automation |
| **Booking Desk / Jetixia** | `D:/Booking_Desk/` | White-label B2B travel platform; per-wholesaler branding + payment gateways |
| **Kornest** (Jetixia) | `D:/Booking_Desk/tasks-sys-V2/` | Team collab SaaS — Kanban, chat, docs, video, leave HR; Prometheus/Grafana |

---

## Cutco

**Paths:**
- Mobile: `D:/Cutco/cutco_app/` — Expo / React Native
- Web SaaS: `D:/Cutco/New/cutco/` — Next.js 16 + Prisma
- Automation: `D:/Cutco/Cutco Automation/`

**Stack:** Next.js, Prisma, PostgreSQL, Expo, React Native

---

## Booking Desk / Jetixia

**Paths:**
- Frontend: `D:/Booking_Desk/bookingdesk/` (Next.js — hostname → wholesaler branding)
- Core backend: `D:/Booking_Desk/bookingdesk-backend 6/`
- Flights: `D:/Booking_Desk/jetixia-air/` (Sabre / Amadeus / Travelport work)
- Transfers: `D:/Booking_Desk/jetixia-transfer-backend/`
- Activities: `D:/Booking_Desk/jetixia-activity-backend/`
- Events: `D:/Booking_Desk/jetixia-event-backend/`
- Extranet: `D:/Booking_Desk/Jetixia-Extranet/`
- Hotel mapping: `D:/Booking_Desk/jetixia-hotel-mapping/`
- Dashboard: `D:/Booking_Desk/jetixia-system-dashboard-backend/`
- Payments folder: `D:/Booking_Desk/ybs payment/`

**What it is:** White-label B2B travel platform. One codebase serves multiple wholesalers under their own domains/brands (e.g. **bdesktravel.com**, **flywinbookings**) — branding resolved from hostname.

**Verticals:** hotels · flights · transfers / transport · activities · extranet · hotel mapping · events · system dashboard

**Hotels:** 10+ supplier APIs (HotelBeds, IRIX, HyperGuest, TGX, etc.) normalized into one search/book contract.

**Payments:** Gateway adapters (**YBS**, **FIB / First Iraqi Bank**, **Stripe**) configured **per wholesaler** (`WholesalerPaymentGatewayConfig`) — not one hard-coded checkout for the whole platform.

**Strong LinkedIn angles:**
- “Same white-label booking desk, different wholesaler brands”
- “Payment gateway chosen by wholesaler request (YBS / FIB / Stripe)”
- “I unified 10 hotel APIs into one response format”

---

## Kornest (Jetixia — formerly Planixia codename)

**Path:** `D:/Booking_Desk/tasks-sys-V2/`  
See [team-collab-product.md](./team-collab-product.md)

---

## Canvasive

**Path:** `D:/Canvasive/` — React, Supabase, n8n

---

## EchoVoice / Sonic

**Path:** `D:/sonic-agent-builder/` — Vapi, Twilio, MCP, AI voice agents

---

## DevOps / VPS (cross-project)

- Hetzner VPS, nginx, systemd, Prometheus/Grafana
- WebRTC: mesh → mediasoup SFU (production; not Agora)

---

## Positioning statement

> Full-stack product engineer building production SaaS for international clients — web & mobile apps, multi-supplier booking platforms, AI voice agents, team collaboration tools, and VPS-backed deployments from architecture to production.
