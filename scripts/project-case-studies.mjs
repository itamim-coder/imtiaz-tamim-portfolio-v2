/**
 * Detailed project case-study content for seed + CMS.
 * Feature videoUrl left empty — attach cut-by-cut demos later.
 */
export const projectCaseStudies = {
  jetixia: {
    role: "Full-stack product engineer — architecture through production for the B2B travel booking platform.",
    problem:
      "Travel suppliers speak different API dialects. Agents needed one booking desk that could search, quote, and pay without rewriting every supplier integration by hand.",
    outcome:
      "A production booking platform that normalizes 10+ hotel suppliers into one response shape, with custom YBS and FIB payment flows that settle under real traffic.",
    longDescription: `Jetixia is the B2B travel booking platform I built and own end-to-end — hotels, flights, transfers, activities, and payments for agency workflows.

The hard part was never a single endpoint. It was making HotelBeds, IRIX, HyperGuest, TGX, and others look like one product: consistent search results, bookable rates, and error handling that agents can trust when a supplier flakes mid-booking.

Payments were treated as first-class product work, not a plugin. YBS and FIB flows are wired for the markets we serve, with the same production discipline as the booking path — monitoring, retries, and clear failure states.`,
    features: [
      {
        title: "Multi-supplier hotel API unification",
        summary:
          "Ten-plus hotel suppliers behind one integration surface instead of ten separate agent experiences.",
        details:
          "Each supplier returns different JSON shapes, rate rules, and cancellation semantics. I built adapters that normalize availability, pricing, and room content into a shared contract so the booking desk UI and downstream services stay stable when a supplier changes.",
        highlights: [
          "Adapters for HotelBeds, IRIX, HyperGuest, TGX, and more",
          "Shared search / quote / book contract across suppliers",
          "Graceful degradation when one supplier is slow or down",
        ],
        videoUrl: "",
        order: 1,
      },
      {
        title: "Unified booking response",
        summary:
          "One clean response format for the desk — agents never see raw supplier payloads.",
        details:
          "Booking confirmation, passenger data, and rate metadata are remapped into a single response the frontend and partner APIs can rely on. That keeps reporting, vouchers, and support tooling consistent even when suppliers disagree on field names.",
        highlights: [
          "Normalized booking + voucher payload",
          "Consistent error taxonomy for agents",
          "Easier partner / white-label consumption later",
        ],
        videoUrl: "",
        order: 2,
      },
      {
        title: "Custom YBS payment flow",
        summary:
          "Market-specific YBS payments built into the booking path, not bolted on after checkout.",
        details:
          "YBS is integrated where the business needs it — status callbacks, failure recovery, and booking state updates so a paid booking and an unpaid hold never drift out of sync.",
        highlights: [
          "Payment state tied to booking lifecycle",
          "Callback / webhook handling in production",
          "Clear agent-facing success and failure states",
        ],
        videoUrl: "",
        order: 3,
      },
      {
        title: "Custom FIB payment flow",
        summary:
          "FIB payments for the regions that require it — same production bar as YBS.",
        details:
          "FIB is another first-class payment rail: initiation, confirmation, and reconciliation against the booking record so finance and ops can audit what actually settled.",
        highlights: [
          "Region-specific payment rail support",
          "Reconciliation-friendly booking payment records",
          "Designed for live traffic, not demo checkouts",
        ],
        videoUrl: "",
        order: 4,
      },
      {
        title: "Travel verticals beyond hotels",
        summary:
          "Flights, transfers, and activities as part of the same B2B desk ecosystem.",
        details:
          "The platform is structured so hotels are not the only SKU. Flights, transfers, and activities plug into the same operational patterns — search, book, pay — so agencies get one workspace instead of fragmented tools.",
        highlights: [
          "Multi-vertical booking desk architecture",
          "Shared patterns across product lines",
          "Built for agency / B2B workflows",
        ],
        videoUrl: "",
        order: 5,
      },
    ],
  },
  kornest: {
    role: "Full-stack product engineer — owned Kornest from architecture through VPS production (web, realtime, video, infra).",
    problem:
      "Teams needed one workspace for sprints, chat, docs, and meetings — without renting a managed SFU or splitting work across five SaaS tabs.",
    outcome:
      "Kornest runs in production on a Hetzner VPS: Kanban, chat, wiki docs, leave/HR, and self-hosted mediasoup video with nginx, systemd, and Prometheus/Grafana.",
    longDescription: `Kornest is Jetixia’s multi-tenant team collaboration product. I own the stack end-to-end: React client, Express API, MongoDB, Socket.io, mediasoup SFU, and the VPS deploy path.

The product goal is simple — planning, communication, and meetings in one org-scoped workspace. The engineering goal was harder: realtime video that stays up without handing the last mile to a managed SFU.

Production meetings use self-hosted mediasoup (not Agora). Mesh WebRTC was the early path; mediasoup on the VPS is what we ship.`,
    features: [
      {
        title: "Sprint Kanban & backlog",
        summary:
          "Active sprint boards, backlog, epics, stories, bugs, and story points — drag-and-drop that matches how teams actually plan.",
        details:
          "Teams plan in All Tasks / Scrum views with epics, stories, tasks, bugs, and sub-tasks. Story points and burndown-style reporting keep the board useful beyond a sticky-note wall.",
        highlights: [
          "Active sprint Kanban + backlog",
          "Epics, stories, bugs, sub-tasks",
          "Story points and sprint reporting",
        ],
        videoUrl: "",
        order: 1,
      },
      {
        title: "Realtime chat",
        summary:
          "Channels and DMs over Socket.io — conversation stays next to the work.",
        details:
          "Chat is org-scoped with channels and direct messages so coordination doesn’t leave the product. Realtime delivery is part of the same production stack as the rest of Kornest.",
        highlights: [
          "Channels + DMs",
          "Socket.io realtime delivery",
          "Org-scoped multi-tenant chat",
        ],
        videoUrl: "",
        order: 2,
      },
      {
        title: "Wiki docs",
        summary:
          "TipTap-powered docs / noticeboard so process lives beside the sprint board.",
        details:
          "Teams keep living docs in-product instead of dumping everything into a separate wiki. Noticeboard + docs cover announcements and longer-form reference.",
        highlights: [
          "Rich text docs (TipTap)",
          "Noticeboard for org updates",
          "Knowledge next to tasks and chat",
        ],
        videoUrl: "",
        order: 3,
      },
      {
        title: "Self-hosted mediasoup meetings",
        summary:
          "Production video meetings on a VPS SFU — mesh → mediasoup, not a managed Agora path.",
        details:
          "Meetings use mediasoup SFU on Hetzner with announced IP, UDP media ports, and coturn. This is the accepted production path. An older Agora Room path may exist in code — it is not the product we claim in production.",
        highlights: [
          "mediasoup SFU on VPS",
          "coturn + media port range configured",
          "Journey: mesh WebRTC → self-hosted SFU",
        ],
        videoUrl: "",
        order: 4,
      },
      {
        title: "Leave & HR basics",
        summary:
          "Teams, roles, and leave approvals without a separate HR tool for day-one ops.",
        details:
          "Owner / admin / member roles, team structure, and leave requests with approvals keep people ops inside the same org tenant as the work.",
        highlights: [
          "Roles: owner, admin, member",
          "Leave requests with approvals",
          "Teams under organization tenants",
        ],
        videoUrl: "",
        order: 5,
      },
      {
        title: "VPS production ops",
        summary:
          "nginx, systemd, Prometheus, and Grafana — deploy and watch the same box that runs the product.",
        details:
          "Kornest is not “works on my laptop.” The production path includes systemd services, nginx reverse proxy, and Prometheus/Grafana so realtime and video issues show up before users do.",
        highlights: [
          "Hetzner VPS + systemd",
          "nginx reverse proxy",
          "Prometheus / Grafana monitoring",
        ],
        videoUrl: "",
        order: 6,
      },
    ],
  },
  cutco: {
    role: "Full-stack product engineer — web SaaS + Expo mobile against one backend for Australian energy comparison and switching.",
    problem:
      "Households need a clear way to compare energy plans and switch — on web and mobile — without maintaining two disconnected products.",
    outcome:
      "Cutco ships as a Next.js web app and Expo mobile client on a shared Prisma/PostgreSQL backend, covering comparison and switching flows for the Australian market.",
    longDescription: `Cutco is TrustGuid’s Australian energy comparison and switching product. I work across the web SaaS (Next.js + Prisma + PostgreSQL) and the Expo / React Native mobile app so customers get the same product surface on both clients.

The value is not a marketing site — it is comparison logic and switching flows that survive real customer journeys. One backend keeps plan data, account actions, and switching state consistent whether the user opens the phone app or the web desk.`,
    features: [
      {
        title: "Energy plan comparison",
        summary:
          "Clear plan comparison for Australian households — the core decision surface of the product.",
        details:
          "Users compare plans with the fields that matter for switching decisions. The web and mobile clients read from the same backend so comparison results stay aligned across devices.",
        highlights: [
          "Comparison UX for real plan decisions",
          "Shared data model across clients",
          "Built for Australian energy market flows",
        ],
        videoUrl: "",
        order: 1,
      },
      {
        title: "Switching journey",
        summary:
          "From chosen plan to switch request — stateful flows, not a dead-end quote page.",
        details:
          "Switching is a multi-step product path: capture intent, required details, and confirmation states so ops and the customer can see where a switch sits.",
        highlights: [
          "End-to-end switch flow",
          "Stateful progress the backend can audit",
          "Designed for production customer ops",
        ],
        videoUrl: "",
        order: 2,
      },
      {
        title: "Next.js web SaaS",
        summary:
          "Primary web experience on Next.js with Prisma against PostgreSQL.",
        details:
          "The web app is the full SaaS surface for comparison and switching — authenticated flows, plan browsing, and account actions on a modern Next.js stack.",
        highlights: [
          "Next.js application shell",
          "Prisma + PostgreSQL data layer",
          "Production web customer path",
        ],
        videoUrl: "",
        order: 3,
      },
      {
        title: "Expo mobile app",
        summary:
          "React Native / Expo client for the same product on phones — not a thin brochure wrapper.",
        details:
          "Mobile shares product intent with web: compare, decide, switch. Expo keeps delivery practical while React Native covers the native feel customers expect.",
        highlights: [
          "Expo / React Native client",
          "Parity with core web journeys",
          "One backend, two clients",
        ],
        videoUrl: "",
        order: 4,
      },
      {
        title: "Shared backend contract",
        summary:
          "One API and data model so web and mobile never diverge on plans or switch state.",
        details:
          "Prisma models and API routes are the source of truth. That prevents the classic trap of a “mobile-only” business rule that web never learned about.",
        highlights: [
          "Single source of truth for plans / switches",
          "Fewer duplicate business rules",
          "Easier feature rollout across platforms",
        ],
        videoUrl: "",
        order: 5,
      },
    ],
  },
};
