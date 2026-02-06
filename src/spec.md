# Specification

## Summary
**Goal:** Replace the Gold Paper header link and page behavior so it routes internally to an on-site placeholder page, eliminating navigation to the external documentation canister URL and avoiding 503 errors.

**Planned changes:**
- Update the “Gold Paper” header navigation item (desktop and mobile) to use internal SPA routing to the existing `/gold-paper` route, removing any external link, new-tab behavior, or redirect to `https://whu4t-kiaaa-aaaah-qsc5q-cai.icp0.io/`.
- Change the `/gold-paper` page to never redirect or fetch/expose Gold Paper content, and to render only this exact single line of text: “Golden Paper temporarily unavailable – content preserved”.
- Remove or leave unused any remaining frontend implementation paths from the Gold Paper entry point(s) that could navigate users to the canister root URL.

**User-visible outcome:** Clicking “Gold Paper” in the header navigates within the app to `/gold-paper`, where users only see “Golden Paper temporarily unavailable – content preserved”, and no longer encounter 503 errors from attempting to load the external canister URL.
