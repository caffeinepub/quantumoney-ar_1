# Specification

## Summary
**Goal:** Apply Stage 1 UI visual patch (transparent yellow HUD/panels) and implement Stage 2 simulated, image-based map with shared internal marker state between Map Mode and AR Mode—without changing existing structure/behavior or the footer.

**Planned changes:**
- Update styling across non-footer window/panel containers to be fully transparent with thin yellow borders and yellow text, keeping all existing layouts, routes, and behaviors intact.
- Ensure the footer remains exactly as-is and avoid introducing any new UI text containing “Caffeine”.
- Adjust responsive spacing/positioning and safe-area handling so HUD/XP/coins/monsters remain visible and unclipped on small screens (Map Mode and AR Mode), without removing or changing components.
- Replace Leaflet/OpenStreetMap usage on the map page with a static image-based map background and overlay coin/monster markers positioned via deterministic internal (simulated) coordinates.
- Share a single internal marker/state source between Map Mode and AR Mode so in-session state changes are reflected when switching views, without adding real-time networking or external calls.

**User-visible outcome:** The app UI panels appear as transparent, yellow-outlined HUD windows (footer unchanged), the interface is mobile-safe, and users can view an image-based map with coin/monster markers that stays in sync with AR Mode within the same session—without relying on Leaflet/OpenStreetMap or external geolocation/map services.
