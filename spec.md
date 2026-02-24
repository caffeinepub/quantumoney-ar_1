# Specification

## Summary
**Goal:** Remove the Map page, apply consistent yellow borders to all UI containers, update navigation to list all active pages, and clean up the footer by removing Caffeine references.

**Planned changes:**
- Remove the Map page (MapMode.tsx), its route from App.tsx, and all navigation links pointing to it in Header.tsx and SectionNavigator.tsx
- Update the global `glass-card` utility class in index.css to include a yellow border using the existing QMY brand yellow/gold color from tailwind.config.js
- Apply the yellow border consistently to all card, panel, and container components across every page (profile panels, wallet cards, DAO cards, bank tiles, presale cards, tokenomics sections, etc.)
- Update Header.tsx and SectionNavigator.tsx to include links to all active pages (Home, QMY Token, Wallet, AR Profile, Bank, DAO, Chat, Docs, Presale, About, Legal, Contact, etc.)
- Remove all references to "Caffeine" from Footer.tsx, retaining only Quantumoney branding, navigation links, and legal information

**User-visible outcome:** The app no longer has a Map page or any dead map links. Every card and panel across all pages displays a consistent yellow border. The header and section navigator provide access to all active pages, and the footer shows only Quantumoney branding with no Caffeine references.
