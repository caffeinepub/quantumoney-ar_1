# Specification

## Summary
**Goal:** Apply a tightly scoped UI patch to the QMY Token page to correct QMY branding, reveal the site’s global dynamic background, and update the page’s glass/yellow styling while keeping all other routes/components unchanged and restoring a successful build.

**Planned changes:**
- Update `/qmy-token` to use a QMY coin asset (not the current QTM coin) and ensure all visible token naming on that page reads “QMY” (no “QTM”).
- Remove the QMY Token page’s solid black/static background so the global dynamic background effect shows behind the page content.
- Restyle the QMY Token page content windows (cards/sections) to a transparent/glass look with very thin yellow borders and yellow typography, without changing layout or content structure.
- Ensure the footer remains intact and unmodified, and that no “Caffeine” references are added anywhere.
- Resolve the build-blocking configuration error so the project rebuilds and publishes successfully with only this page’s patch applied.

**User-visible outcome:** The QMY Token page displays correct QMY coin branding, shows the same dynamic background effect as other pages, uses glass-like yellow-accented card styling, and the app rebuilds/publishes without configuration errors while the rest of the site remains unchanged.
