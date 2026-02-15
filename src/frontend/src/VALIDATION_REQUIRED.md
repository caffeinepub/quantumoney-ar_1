# Validation Checklist for Stages 1–2

## Stage 1: Transparent Window/Panel Styling

### Visual Verification
- [ ] All non-footer window/panel containers render with fully transparent backgrounds (no tinted fill)
- [ ] All non-footer panels have thin yellow borders (border-primary)
- [ ] All text within panels is yellow (text-primary)
- [ ] Footer remains unchanged with glass-card-elevated styling
- [ ] No new UI text includes the word "Caffeine"

### Layout Verification
- [ ] Existing grid/stacking layouts remain unchanged in Map Mode
- [ ] Existing grid/stacking layouts remain unchanged in AR Mode
- [ ] HUD overlay maintains proper positioning in both fixed and inline variants

### Interactive Behavior
- [ ] Auth gating continues to work correctly
- [ ] Navigation between Map and AR modes functions properly
- [ ] All buttons and interactive elements remain functional
- [ ] Modal dialogs continue to work as expected

## Stage 1: Mobile-Safe Responsive Adjustments

### Mobile Viewport Testing
- [ ] HUD content is fully visible on narrow viewports (< 640px) in Map Mode
- [ ] HUD content is fully visible on narrow viewports (< 640px) in AR Mode
- [ ] Primary controls/content are not overlapped by HUD in Map Mode
- [ ] Primary controls/content are not overlapped by HUD in AR Mode

### Safe Area Padding
- [ ] Bottom safe-area padding (pb-safe) is applied in PageShell
- [ ] Content is not hidden behind notches on devices with notches
- [ ] Content is not hidden behind home indicators on devices with home indicators
- [ ] Footer remains fully visible with adequate spacing

### Responsive Spacing
- [ ] Vertical padding is reduced appropriately on small screens (py-4 on mobile, py-8 on desktop)
- [ ] Gap spacing is reduced appropriately on small screens (gap-4 on mobile, gap-6 on desktop)
- [ ] Text sizes scale down appropriately on mobile (text-xs/text-sm on mobile)
- [ ] Icon sizes scale down appropriately on mobile (w-8 h-8 on mobile, w-10 h-10 on desktop)

## Stage 2: Simulated Map Rendering

### Map Display
- [ ] Static map image renders correctly as background
- [ ] Map maintains 16:9 aspect ratio across all viewport sizes
- [ ] Map is responsive and scales properly on mobile devices

### Marker Rendering
- [ ] Coin markers (yellow circles) appear on the map
- [ ] Monster markers (red circles) appear on the map
- [ ] Markers are positioned using internal simulated coordinates
- [ ] Marker positions are deterministic (same seed produces same positions)
- [ ] No external APIs or geolocation services are called

### Marker Interaction
- [ ] Clicking a marker selects it (increases size, changes opacity, adds stroke)
- [ ] Clicking a selected marker deselects it
- [ ] Selected marker state is visually distinct
- [ ] Marker labels (QTM/M) are visible and properly positioned

### Legend Display
- [ ] Legend shows coin indicator (yellow circle) with "Coins" label
- [ ] Legend shows monster indicator (red circle) with "Monsters" label
- [ ] Legend is centered and properly styled
- [ ] Legend text is yellow (text-primary)

## Stage 2: Internal Synchronization

### Shared State Context
- [ ] SharedMapStateProvider is wired into App.tsx above routed pages
- [ ] useSharedMapState hook is accessible in Map Mode
- [ ] useSharedMapState hook is accessible in AR Mode
- [ ] Markers are generated once and shared between views

### State Persistence
- [ ] Selecting a marker in Map Mode persists when navigating to AR Mode
- [ ] Selecting a marker in AR Mode persists when navigating to Map Mode
- [ ] Marker selection state is maintained within the same session
- [ ] No WebSockets or external sync services are added

### Marker Generation
- [ ] Markers are generated based on principal (user identity)
- [ ] Same principal generates same marker positions (deterministic)
- [ ] Markers are only generated once per session (not on every render)
- [ ] refreshMarkers function can be called to regenerate markers if needed

## Footer Preservation

### Visual Verification
- [ ] Footer background remains glass-card-elevated (not transparent)
- [ ] Footer border remains border-primary/30 (not changed to solid yellow)
- [ ] Footer text remains gray-400 (not changed to yellow)
- [ ] Footer layout and spacing remain unchanged

### Content Verification
- [ ] Footer links remain unchanged
- [ ] Footer attribution text remains unchanged
- [ ] No new "Caffeine" references added anywhere in the footer
- [ ] Footer copyright year displays correctly

## Cross-Browser Testing
- [ ] Chrome/Edge: All features work correctly
- [ ] Firefox: All features work correctly
- [ ] Safari: All features work correctly
- [ ] Mobile Safari (iOS): All features work correctly, safe areas respected
- [ ] Chrome Mobile (Android): All features work correctly, safe areas respected

## Performance Verification
- [ ] Map renders without lag on desktop
- [ ] Map renders without lag on mobile
- [ ] Marker selection is responsive (no delay)
- [ ] Navigation between Map and AR modes is smooth
- [ ] No memory leaks when switching between views repeatedly
