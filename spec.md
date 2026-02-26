# Specification

## Summary
**Goal:** Clean up Caffeine branding site-wide, add social share buttons to the footer, merge the Profile and Wallet pages into one, restore the public Central Bank page, and confirm map pages remain synced with Carteira A canisters.

**Planned changes:**
- Remove all Caffeine branding, links, and references from every page, component, and layout file across the frontend
- Update the Footer to show only the copyright line, "By HTgamers", and four social share buttons (WhatsApp, X/Twitter, Telegram, Instagram) that open platform share URLs with the app's URL pre-filled — no height or layout changes
- Merge the Profile page and Wallet page into a single unified `/profile` page displaying user info (principal, nickname, XP/level, energy), QMY and ICP balances, vesting breakdown, transaction history, and the simulated send card; remove the standalone `/wallet` route; apply yellow-bordered glass panel styling throughout
- Restore and complete the Central Bank page (`BancoCentral.tsx`) as a public (no login required) page showing total QMY supply, circulating coins, locked/vesting coins, XP totals, bonus distributions, monster counts, and recent transactions — all fetched from the existing Carteira A canister IDs using hooks already in use (e.g., `useLuxuryBank`, `useQMYLedger`); maintain yellow-on-dark glass panel style
- Verify that all Leaflet OpenStreetMap map pages continue to display coin and monster markers synced with the existing Carteira A canisters, with no changes to map layout or configuration

**User-visible outcome:** The footer is clean with social share buttons and no Caffeine references; users access their wallet info directly on the Profile page; the Central Bank page is publicly accessible with live canister data; and all maps continue showing correct marker positions.
