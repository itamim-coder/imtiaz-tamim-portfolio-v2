# Team Collaboration MVP — Product Context

**Repo:** `D:/Booking_Desk/tasks-sys-V2/`  
**Product name:** **Kornest** (final)  
**Company:** Jetixia / Booking Desk  
**Legacy internal codename:** Planixia (`planixia` package) — do not use publicly  
**planixia.com / planixia.io:** Registered by someone else — user does NOT own

---

## One-liner

**Kornest** — multi-tenant team collaboration SaaS under Jetixia: sprint Kanban, real-time chat, wiki docs, mediasoup SFU video rooms, leave/HR — Node.js + React on Hetzner VPS with Prometheus/Grafana.

---

## Core features

### Planning & tasks
- Dashboard, All Tasks (active sprint Kanban), Backlog, Scrum Board, Reports, Projects
- Epics, stories, tasks, bugs, sub-tasks, story points, drag-and-drop, burndown

### Communication
- Chat (channels + DMs), Noticeboard, Wiki docs (TipTap)

### Video
- `/room` / meetings — **mediasoup SFU** (production)
- Earlier: mesh WebRTC; Agora code may exist but is **not** the accepted production path

### People & HR
- Teams, leave management with approvals
- Roles: owner, admin, member

---

## Architecture

- Multi-tenant by `organizationId`
- Customer app: `client/`
- Platform admin: `platform-admin/` (port 8001)

---

## Tech stack

React · Vite · Express · MongoDB · Socket.io · mediasoup · nginx · systemd · Prometheus/Grafana

---

## WebRTC journey (content angle)

1. **Mesh** — 2–3 users OK, breaks at scale, NAT/firewall pain
2. **mediasoup SFU** — self-hosted on VPS — **production choice** (not Agora)

---

## Naming

**Locked:** **Kornest** (under Jetixia)

**Do not use publicly:** Planixia, SquadLane (old candidates), "name TBD"

## Two video menus (verified)

| Menu | Route | Engine | Production? |
|------|-------|--------|-------------|
| Meetings | `/meetings` | mediasoup SFU | **Yes** |
| Room | `/room` | Agora | Code + env keys exist — **not the accepted prod product** |

Live: `https://kornest.com` · VPS mediasoup workers + coturn confirmed Jul 13 2026.
See `D:/agent-context/portfolio/kornest-video-flow.md` (engineering notes — not in this repo).
