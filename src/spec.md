# Specification

## Summary
**Goal:** Add an institutional, documentation-only “Treasury & Monetary Policy” section after DAO & Governance, keep governance strictly conceptual and isolated from gameplay, and fix duplicate React Query provider usage.

**Planned changes:**
- Create a new “Treasury & Monetary Policy” documentation page/route using the existing luxury black/gold styling, written in an institutional, neutral tone and explicitly conceptual/non-operational (no transactions, token issuance, swaps, bridges, or financial operations).
- Add header navigation links (desktop and mobile) to the new page following existing TanStack Router link patterns and existing bilingual behavior, ensuring English user-facing labels/headings are available in English.
- Ensure DAO/governance documentation remains conceptual and does not connect to or interfere with the game layer (no shared interactive flows, shared state, or backend endpoints).
- Remove nested/duplicate React Query `QueryClientProvider` usage so only a single provider exists at runtime, without modifying immutable files (including `frontend/src/main.tsx`).

**User-visible outcome:** Users can navigate (desktop/mobile) to a new “Treasury & Monetary Policy” institutional documentation page that clearly states it is conceptual only, while the game continues to work as before and the app runs with a single React Query provider.
