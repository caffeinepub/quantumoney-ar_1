# Specification

## Summary
**Goal:** Patch the simulated/pro Quantumoney.app frontend to eliminate the LanguageProvider runtime error and consistently enforce the “simulated UI-only” rules (chat, presale, gold paper) while maintaining the premium black/gold AR-HUD-aligned layout and complete legal/footer requirements.

**Planned changes:**
- Wrap the routed application tree with `LanguageProvider` (without editing immutable entry files) so any route using `useLanguage()` works without runtime errors.
- Enforce public chat as simulated UI-only: no backend calls and no persistence (no localStorage/IndexedDB); messages exist only in-memory for the current session/tab, and the UI clarifies this behavior.
- Ensure the global shell/layout uses a 100dvh-aware full-height approach and keeps consistent premium black/gold styling with AR-style HUD/map info window visual language aligned to QuantumoneyAR.app (visual-only; no external connections).
- Update/verify footer usability across resolutions; remove any remaining “Caffeine” references across surfaced strings; ensure footer contains “by HTgamers”, helpdesk@quantumoney.net, and “On-chain na Internet Computer (ICP)”, preserving existing content.
- Ensure `/terms` and `/privacy` show complete Feb/2026 documents (no placeholders/truncation), remain navigable via site links, and keep the cookie consent banner visible on entry with working links to `/privacy`.
- Keep presale and gold paper strictly simulated/static UI: no real purchase/transaction logic or backend-changing behavior, while preserving existing content and visuals.

**User-visible outcome:** Users can navigate all pages without the LanguageProvider error, see a consistent full-height premium UI with AR-style HUD visuals, use a simulated public chat that resets on reload, access fully populated Terms/Privacy pages via working links (with cookie banner links working), and interact with presale/gold paper screens as static simulations—while the footer is readable/clickable everywhere and “Caffeine” is fully removed from visible content.
