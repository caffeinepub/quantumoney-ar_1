# Specification

## Summary
**Goal:** Patch Quantumoney.app with simulation-safe wallet sending, new informational sections (Central Bank, Presale, Pre‑Proposals, Gold Paper visualization), a public community chat, improved navigation to these areas, and full removal of “Caffeine” branding.

**Planned changes:**
- Add a simulated-only “Send QMY” flow on the Wallet page (button + destination Principal + amount + simulated success/failure feedback), structured so it can later be swapped for real transfers.
- Add simulated “available vs locked” QMY balances for the send flow using the vesting schedule (100 unlocked immediately; 900 locked unlocking 100 every 30 days), clearly labeled as simulated and not replacing existing on-chain read-only balance views.
- Create a new “QMY Central Bank” dashboard page/route with responsive cards/sections for circulating vs locked supply, distribution by category, usage stats, presale stats, and geographic distribution (simulated/static for now, clearly labeled).
- Implement a public community chat (frontend page + backend storage) with message posting, timestamps, pagination for infinite scroll, and periodic polling/refetch for near real-time updates (no WebSockets), including basic anti-abuse constraints.
- Add a “Pre‑Proposals” educational section to browse proposal drafts and view details via “Learn more,” with no DAO submission/voting/execution actions.
- Add a “QMY Presale” interactive section/page showing lots/phases, acquisition rules, time-based distribution, and unlock visualization with counters/filters using simulated data only (no payments/issuance).
- Upgrade the “Gold Paper / Papel Dourado” into an interactive visualization page showing the 600M strategic distribution and a way to explore hotspots/tourist points, aligned with the app’s existing “quantum universe” visual style and ready to visually sync with QuantumoneyAR.app.
- Remove all visible references to “Caffeine” across the app (including footer/attribution/metadata) and remove any code comments mentioning “Caffeine.”
- Add/adjust routes and navigation entry points so Central Bank, Public Chat, Pre‑Proposals, Presale, and the upgraded Gold Paper visualization are discoverable and consistent with existing layout/styling.

**User-visible outcome:** Users can simulate sending QMY from the wallet (with simulated vesting-aware balances), browse new Central Bank and Presale informational dashboards, read Pre‑Proposals, use a public community chat that updates via polling and supports infinite scroll, explore an upgraded interactive Gold Paper distribution visualization, and see the site presented as fully Quantumoney-branded with no “Caffeine” references.
