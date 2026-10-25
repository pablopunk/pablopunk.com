# Improvement execution

Planned at df54ba1 on 2026-10-25. User requested all Luna max subagents and completion of audited work.

| Plan | Scope | Dependencies | Status |
|---|---|---|---|
| 001 | Dependencies, security triage, RSS and pnpm baseline | none | DONE — reviewed 17e36b4 in isolated worktree; integration pending |
| 002 | Behavioral tests and CI | none to author; final gates require 001/003 | DONE — strengthened and verified in d174f7a3 |
| 003 | Metadata, tags, redirect, lightbox, optional toast, motion/performance | none | DONE — a151a72 reviewed; integrated gates pass |
| 004 | Combine all lanes in isolated review checkout and pass final gates | 001/002/003 implemented | DONE — reviewer APPROVE d174f7a3 |

Independent isolated worktrees. Combine and verify in a disposable review worktree after all three pass scope review; the user subsequently explicitly authorized merging and pushing all reviewed work to main. Advisor reviews and maintains this index.

## Findings considered and rejected

- Automatic architecture redesign: not justified for this small site; preserve the existing surface classes and visual choices.
- Direction ideas (surface gallery, related-post ranking): optional product ideas, outside the nine audited repair findings.

## Review evidence

- 001: `/home/pol/.t3/worktrees/pablopunk.com/t3-1935f19a`, branch `t3/restore-rss-secure-deps`, commit `17e36b420e5b70b37588d86684cb009971025e7a`. Reviewer reran Node24 production build, check, Biome, frozen install and diff check successfully. Audit confirmed 0 critical/high, 1 moderate trusted-build selector-parser exception. Built RSS has 13 entries and production home URL. Existing Tailwind adapter peer range excludes Astro7; combined browser verification remains required. No changes outside scope.
- 002: `/home/pol/.t3/worktrees/pablopunk.com/t3-0deb3428`, branch `t3/add-route-browser-regression-tests`, commit `8de12f1c1134b058b2542a13b8a4fbd90ff44fd0`. Full diff reviewed; lint passes. 14 tests authored; baseline failures reproduce audited bugs. Final review requests: assert no pageerror for blocked Toastify; check production canonical origin, lightbox canonical, Shift+Tab and backdrop/no-JS close; test initial reduced-motion toggled off activates tilt. Dots reset assertions must allow unchanged dots without inline transforms and assert visual identity, to support scoped neighborhood updates rather than full-grid writes. Integration must use Node24, resolve package/lock overlap and rerun all gates. No scope violations.
- 003: Full a151a72 diff reviewed; integrated as 0b493079. Native modal, visible fallback, metadata, redirect, optional notifications and spatial dots preserve scoped behavior. Performance report: 110 candidates/78 writes for a centered update out of 2170 hero circles at 1280x800; repeated stationary update writes zero; environment-specific callback timing 1.2–1.5ms.
- 004 APPROVE: `/home/pol/.t3/worktrees/pablopunk.com/t3-40dfc744`, branch `t3/integrate-and-verify-improvement-lanes`, HEAD `d174f7a34aad592b892beeee8a4120537b766a99`. Reviewer read integration diff and strengthened tests, reran Node24 check, lint, production build and full browser suite: 16 passed in 26s. Frozen reinstall preserved lock SHA256 632cef77710ab8d35e973ed114d404f860c5206d96fccd2888b4ba9909bc9c17. Audit independently confirms 0 critical/high and 1 moderate. Sharp0.35.5 resolves inside pnpm store, no temporary package link. Clean worktree, 23 scoped changed paths; diff check passes. Residuals: documented moderate trusted-build selector-parser advisory; Tailwind adapter stale Astro peer range; two nonfatal gradient warnings. User explicitly approved shipping to main after this review. Remote main advanced with project content commit 43470311; merge 4a30d8e preserves that change, with final checks repeated before shipping.
