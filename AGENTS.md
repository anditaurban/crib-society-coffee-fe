# Crib Society — Initial Agent Contract

## Source of Truth
All implementation decisions MUST follow:
1. `docs/PRD.md`
2. `docs/USER-FLOW.md`
3. `docs/UI-GUIDELINE.md`
4. `docs/API-SPEC.md`
5. `docs/IMPLEMENTATION-PLAN.md`

## Technology Constraints
- React + Vite.
- HTML semantic structure.
- Responsive UI.
- Tailwind CSS / utility-first styling.
- Do not introduce React frameworks such as Next.js.
- Do not add backend implementation.
- Do not add libraries unless clearly justified and approved.

## Working Rules
1. Read all SOT documents before changing code.
2. Never invent features outside the SOT.
3. Keep business logic separated from presentation.
4. Use reusable components.
5. Navigation must be configuration-driven.
6. API access must be isolated in service modules.
7. Mock data must mirror API-SPEC structures.
8. Preserve responsive behavior.
9. Implement loading, empty, error, success, and confirmation states.
10. Do not redesign the approved visual direction without approval.

## Phase Gate
After completing a phase:
- Stop.
- Report files changed.
- Report completed requirements.
- Report known issues.
- Wait for explicit user approval before starting the next phase.

## First Execution
Do not build all features immediately. First inspect the repository, validate the SOT, identify missing setup, and prepare only the approved Phase 1 foundation.
