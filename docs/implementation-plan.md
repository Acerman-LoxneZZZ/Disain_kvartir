# Interior Landing Implementation Plan

> **For agentic workers:** Implement the tasks in this session. The user's complete creation brief authorizes execution. Supporting superpowers execution skills are unavailable; use the native workflow.

**Goal:** Deliver an adaptive Russian interior-design portfolio and honest enquiry flow.

**Architecture:** A single React page consumes one typed content configuration. Focused gallery, comparison and enquiry components own interaction state; CSS handles the editorial responsive layout and reduced motion. Static Vite output is portable and hosted privately with Sites.

**Tech Stack:** React, TypeScript, Vite, CSS, native dialog/details/range.

**Spec:** docs/design-spec.md

## Global Constraints
- Palette #F4F0E8 / #252422 / #A75B43; Cyrillic fonts.
- Name, contacts, projects and services in src/site.config.ts.
- No invented awards/testimonials; demo assets labelled.
- No false submission success; no client-side secrets.
- Accessible keyboard, touch and reduced-motion behavior.

## Review Focus
- Unset endpoint: show an explicit message and do not issue a request.
- Network failure: retain values and permit retry.
- Long Russian labels at 360px: wrap without horizontal overflow.
- Dialog: Escape and focus restoration work with gallery keyboard controls.
- Range: Arrow/Home/End update the visible comparison and exposed value.

### Task 1: Editorial page and configuration
Files: package.json, index.html, src/site.config.ts, src/App.tsx, src/styles.css, public/images, public/fonts.
- [x] Install project dependencies and self-host licensed fonts/images.
- [x] Implement all requested sections, responsive layout and entrance/progress motion.
- [x] Run TypeScript and production build; inspect desktop/mobile in one batch.

### Task 2: Accessible interactions and enquiry
Files: src/components/ProjectDialog.tsx, Comparison.tsx, EnquiryForm.tsx, src/lib/enquiry.ts.
Interfaces: ProjectDialog consumes Project, Comparison consumes before/after media, EnquiryForm consumes site.enquiry configuration.
- [x] Implement dialog gallery, native comparison range and FAQ behavior.
- [x] Verify validation and unset endpoint with assertions; verify configured success/failure through mocked fetch.
- [x] Implement POST with JSON, timeout, errors and retry; verify all interactive controls in browser.

### Task 3: Delivery
Files: README.md, ASSET-LICENSES.md, .openai/hosting.json, dist/.
- [x] Document content replacement and endpoint API contract.
- [x] Review visual/accessibility evidence and fix observed defects in one batch.
- [ ] Build, sync exact source, package, privately deploy, and provide source ZIP and live URL.
