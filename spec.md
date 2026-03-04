# Specification

## Summary
**Goal:** Fix the LanguageProvider scope so it wraps the entire application, enforce production-only canister IDs across both domains, and remove automatic profile creation logic from the frontend.

**Planned changes:**
- Restructure the global provider hierarchy to a single LanguageProvider wrapping all routes in the order: AuthProvider → LanguageProvider → Router → App; remove any duplicate LanguageProvider instances
- Ensure all pages (Legal, Contact, Tokenomics, Privacy Policy, Terms of Service, etc.) are descendants of the single LanguageProvider so `useLanguage` never throws an out-of-scope error
- Audit all canister actor calls to use hardcoded production canister IDs (Logic, Ledger, Governance) with no conditional dev/local/mock switching for either quantumoney.app or quantumoneyar.app
- Remove any automatic profile creation logic; if a Principal has no existing backend profile, display a clear "Profile not found" error instead of creating one silently
- Ensure UserID is always derived from the authenticated Internet Identity Principal with no synthetic or fallback IDs

**User-visible outcome:** Language switching works correctly on every page without console errors, both domains always connect to the same production canisters, and users without an existing profile see a clear error message instead of a silently created empty profile.
