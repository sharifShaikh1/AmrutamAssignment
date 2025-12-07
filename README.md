
# task3-vite-react-ts

This repo is my implementation of the Task 3 Figma assignment. It's a small admin-style demo built with React + Vite + TypeScript and styled with Tailwind + a few base CSS rules.

I implemented the requested pages and UI flows and wired up routing and a sidebar layout so the UI is easy to run and inspect locally.

--

## Quick start (Windows / PowerShell)

Install & run locally:

```pwsh
npm install
npm run dev
```

Production build / preview:

```pwsh
npm run build
npm run preview
```

Open http://localhost:5173 — the app loads the Affiliate dashboard by default.

--

## What’s included

- Pages implemented:
	- Dashboard (affiliate) — full layout, KPI cards, lists and recent activity
	- Commission & Special Commission — management panels, toggles and tables
	- Coupons — management UI and special coupon list
	- Payment Pending & Payment History — table views with selection and toolbar
	- FAQ — per-origin FAQ pages, inline Add form, MAX_FAQS homepage limit and replacement modal
	- Customization Overview — overview cards and quick links for Web/App
	- Projects (list / new form / detail) and Invoices — functional mock CRUD UI
	- Users (+ detail), Reports, Activity, Settings — working UI pages with sample data

- Key features and decisions:
	- Component-first design: shared components in `src/components/` (Sidebar, Topbar, FaqLimitModal, AddFaq, ErrorBoundary).
	- Inline Add FAQ as requested — no route change; Add form resets on close and is isolated per origin.
	- Per-origin state for Web vs App FAQ to ensure form inputs, selections and pagination do not bleed across origins.
	- FAQ homepage enforcement: MAX_FAQS (5) and a modal flow to replace items instead of exceeding the cap.
	- ErrorBoundary added to catch runtime render errors and show a resettable fallback (dev-friendly).

--

## Approach & design decisions

I built this assignment focusing on correctness and maintainability while following the constraints in the brief.

- High-level approach:
	- Start with a component-driven layout (Sidebar + Topbar + pages) so UI pieces can be reused and tested easily.
	- Implement realistic, working pages first (tables, selection, forms) and keep some informational pages as small placeholders to remain focused on core functionality.
	- Keep the routing clear: per-origin customization routes and an affiliate dashboard route under `/affiliate` to match the UX requirements.

- Why these choices:
	- Reusable components speed up adding new pages and make behavior consistent (e.g., table rows, badges, cards).
	- Per-origin state for FAQ gives a predictable user experience when switching between Web and App contexts.
	- Inline Add FAQ and the replacement modal follow the exact specification given in the task (no separate add route; keep breadcrumb unchanged).

--

## Project layout

```
src/
	pages/           # main page components
	components/      # layout & UI pieces (Sidebar, Topbar, ErrorBoundary, FaqLimitModal, etc.)
	styles.css       # Tailwind import + small base CSS
	App.tsx          # app + routes
```

--

## Routes & behavior notes

- `/` → redirects to `/affiliate/dashboard` (Affiliate dashboard is the default landing page)
- `/affiliate` → redirects to `/affiliate/dashboard`
- `/customization/app/faq` and `/customization/web/faq` → FAQ pages for each origin (separate state)
- `src/components/ErrorBoundary.tsx` → catches render-time errors and displays a resettable fallback UI

--

## How to test error handling

Edit any page and add `throw new Error('test')` to the component body, then open that route — you’ll see the ErrorBoundary fallback.

--

## Notes for maintainers / contributors

- This is a focused assignment demo — no backend, no auth, mostly static/mock data.
- If you want tests, logging, or error reporting (Sentry), say which tool you prefer and I’ll add it.

--


## License

MIT — use it however you like.

--

## Where to look

- Pages: `src/pages/` (implemented pages + placeholders shown by filename)
- Main layout & navigation: `src/components/Sidebar.tsx`, `src/components/Topbar.tsx`
- Shared components and features: `src/components/` (ErrorBoundary, FaqLimitModal, AddFaq)
- Styles: `src/styles.css` (Tailwind + base CSS)

Notes / developer tips
- The site loads the Affiliate dashboard at `/` (the root). The affiliate dashboard is also accessible at `/affiliate/dashboard` and `/affiliate` redirects there.
- The ErrorBoundary wraps the main routes to show a friendly fallback — to test it, add `throw new Error('test')` in a page component and open that route.

