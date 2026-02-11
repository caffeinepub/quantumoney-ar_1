# Specification

## Summary
**Goal:** Initialize a minimal Internet Computer project workspace foundation (without regenerating code) by adding only the essential root config files and ensuring required frontend entry files exist, then stop for validation.

**Planned changes:**
- Add a minimal root-level `package.json` with only the scripts needed to install dependencies and build the existing React + TypeScript frontend (without rewriting any existing source files).
- Add a minimal root-level `dfx.json` that defines:
  - a backend canister referencing the existing entrypoint at `backend/main.mo` (no backend changes),
  - an assets canister that serves the existing frontend build output.
- Ensure `frontend/index.html` and `frontend/src/main.tsx` exist; create them only if missing and do not modify if already present.
- Stop after creation and provide an explicit confirmation that `package.json`, `dfx.json`, `frontend/index.html`, and `frontend/src/main.tsx` physically exist before any build or deployment attempt.

**User-visible outcome:** The workspace contains the minimal configuration/entry files required to proceed to a later validation/build step, with an explicit confirmation of file presence and no build/deploy performed.
