# Specification

## Summary
**Goal:** Full recovery, sync, and feature restoration of Quantumoney.app — removing all Caffeine branding, applying a unified yellow/transparent style, rebuilding key pages (Home, Profile, Banco Central, DAO, Chat, Map), and ensuring all canister references point exclusively to the shared Carteira A canisters.

**Planned changes:**
- Remove all references to "Caffeine" from the entire codebase (index.html meta tags, footer, source comments, visible UI text)
- Replace Footer.tsx with a minimal footer showing only "By HTgamers" and four social share buttons: WhatsApp, X, Telegram, and Instagram
- Apply global visual style: yellow/gold text (#FFD700), transparent backgrounds with thin yellow borders on all cards/panels/modals, compact layouts with no header/navigation clipping
- Rebuild HomePage with a full-screen animated universe background (stars, planets, comets, meteorites), golden ICP and QMY coins that appear at center every 5 seconds with a 3-second scale-up animation then fade out, a welcome message "Welcome to the Quantumoney World", and a CTA button linking to https://quantumoneyar.app
- Rebuild Perfil.tsx with editable username (synced to backend), profile photo upload/preview (persisted to backend), integrated wallet panel showing live ICP and QMY balances, Send/Receive token panels, transaction history, and XP/level display
- Update backend main.mo PlayerProfile type to include `photoUrl` (Text) and `nickname` (Text) fields; update `updateProfile`, `getProfile`, and `getMyProfile` accordingly; update migration.mo as needed
- Restore Banco Central page with tokenomics stat cards, vesting schedule table and chart, burn history table, supply charts, explanatory accordion, and CSV/text download buttons sourced from centralBankSimData.ts
- Restore DAO module: DAOPage.tsx (proposals list), DAOCreateProposalPage.tsx (submit proposals), DAOProposalDetailPage.tsx (vote yes/no/abstain); fix DAO.tsx stub; register all routes in App.tsx
- Restore PublicChatPage.tsx with name entry, message send, auto-scroll, and yellow/transparent style; register route in App.tsx
- Restore MapPage.tsx using Leaflet OpenStreetMap with coin drop and monster spawn markers, static fallback from mapDatasets.ts, correct full-height layout
- Enforce all frontend canister references (useARGameData.ts, useICPLedger.ts, useQMYLedger.ts, TechnicalValidationPanel.tsx, CanisterArchitecturePanel.tsx) use identical Carteira A canister IDs as listed in TechnicalPage.tsx; remove any divergent IDs
- Ensure all routes in App.tsx (Home, Profile, Banco Central, DAO sub-pages, Chat, Map, Swap, Docs, Gold Paper, Tokenomics, Roadmap, Legal, About, Contact, Technical, Presale) are correctly registered and lazy-loaded with no empty/stub targets

**User-visible outcome:** Quantumoney.app presents a fully branded, Caffeine-free experience with a consistent yellow/transparent visual theme. The home page features an animated universe with emerging gold coins and a link to the AR app. The profile page allows users to manage their identity and wallet, synced with QuantumoneyAR.app via shared canisters. Banco Central, DAO, Chat, and Map pages are all fully functional and navigable.
