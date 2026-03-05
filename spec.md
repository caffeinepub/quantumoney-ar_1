# Specification

## Summary
**Goal:** Perform a full functional restoration of the Quantumoney core — stripping all broken visual/animated elements and rebuilding the essential game loop: Internet Identity login, QMY/XP profile display, 2D map with coin markers, and basic coin capture mechanics.

**Planned changes:**
- Remove all animated coin visuals, 3D decorative elements (FloatingQMYCoins, SpaceBackground, QuantumUniverseScene, Three.js/React Three Fiber components), and decorative overlays from all pages
- Fix all page titles that incorrectly display the prefix "nav." — replace with clean readable English/Portuguese titles
- Restore a fixed footer on all pages: "© 2026 Quantumoney. All rights reserved." and "By HTgamers"; remove all references to "Caffeine"
- Enforce a clean, static dark layout (#0a0a0a background) with yellow/gold accents; no gradients, glow effects, or animations
- Restore Internet Identity as the sole login method; Principal ID must be available app-wide via AuthContext after login
- Restore /profile page showing: Principal ID, QMY balance (from canister 5o54h-giaaa-aaaad-aentq-cai), ICP balance, XP, and a capture history section (always visible, shows empty state if no history)
- Add backend `claimWelcomeBonus` endpoint: grants +1000 QMY and +100 XP on first login per Principal; flag stored in stable storage; no-op on repeat calls
- Show a dismissible welcome bonus banner/modal (+1000 QMY, +100 XP) on the frontend after first login only
- Restore backend storage for 600,000,000 QMY distributed across at least 50 geographic coin clusters (lat/lon/amount/id) with a query endpoint; data persists in stable storage
- Restore /map page with a functional Leaflet + OpenStreetMap 2D map displaying coin markers at real-world coordinates
- Implement coin capture mechanic: clicking a marker within 50m calls the backend capture endpoint, awards QMY and proportional XP, removes the coin from the map; clicking a marker >50m away shows an error message
- Restore basic XP system in the backend (per-player xp field, incremented by captures and welcome bonus, persists in stable storage)
- Disable/hide DAO, advanced Central Bank, complex vesting, public burns, and all charts from navigation and routing (show "Coming Soon" or remove entirely)
- Simplify bottom navigation to exactly 3 tabs: Home, Map, Profile (active tab highlighted in yellow/gold)

**User-visible outcome:** Users can log in via Internet Identity, receive a one-time welcome bonus, view their QMY/ICP/XP balances and capture history on their profile, and explore a 2D world map to find and capture QMY coin clusters within 50 meters of their location.
