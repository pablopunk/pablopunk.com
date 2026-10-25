# Plan 004: Integrate and verify all improvement lanes in an isolated review worktree
## Status
Priority P1; effort M; risk MED; planned at df54ba1, 2026-10-25; depends on implementations 001/002/003 (all committed and reviewed; final combined gates pending).
## Drift check
Start at df54ba1. All three commits below are based on that commit. Compare git diff --stat df54ba1..HEAD if start differs.
## Why this matters
Three independent Luna max agents implemented the audit. The framework and tests touch package.json/pnpm-lock.yaml; combined behavior must be verified rather than trusting individual reports. Advisor may only edit plans; YOU are its executor authorized to edit scoped source in your isolated checkout.
## Inputs/current state
1. Dependency/RSS: 17e36b420e5b70b37588d86684cb009971025e7a (branch t3/restore-rss-secure-deps, path /home/pol/.t3/worktrees/pablopunk.com/t3-1935f19a). Astro7.4.2, Vercel11.0.16, RSS4.0.19; one pnpm lock; 0 critical/high, one moderate trusted-build Tailwind3 selector-parser exception. Reviewer reran Node24 build/check/lint/frozen-install and checked RSS13 entries. Tailwind adapter peer range excludes Astro7 but gates pass; browser checks needed.
2. Test baseline: 8de12f1c1134b058b2542a13b8a4fbd90ff44fd0 (branch t3/add-route-browser-regression-tests, path /home/pol/.t3/worktrees/pablopunk.com/t3-0deb3428). Adds Playwright14 tests and CI; baseline8 failures reproduce audited bugs. Full diff reviewed.
3. UI: a151a72f93ed66e1033621dd914226b611f4d079 (branch t3/fix-ui-fallbacks-lightbox-and-dots, path /home/pol/.t3/worktrees/pablopunk.com/t3-bb4bd9bf). Visible tags, canonicals, redirect, native dialog, Toastify guards, tilt live preference, dots spatial lookup. Full diff reviewed. Dots reset uses empty inline transform; old tests demand translate(0px,0px) on every circle, wrongly coupling to old implementation.
## Scope
Only union of three commits' changed paths plus tests/**, README.md, playwright.config.ts, package.json, pnpm-lock.yaml, pnpm-workspace.yaml, .github/workflows/check.yml, src/lib/lightbox.ts, src/pages/index.astro, src/layouts/Layout.astro, src/components/Tags.astro, src/lib/interactive-dots.ts. Fix concrete integration/regression failures only; no new features or redesign. Do not edit parent checkout or plans index. Do not merge/push to user's branch or open PR.
## Steps
1. Cherry-pick dependency commit, test commit, UI commit IN YOUR isolated worktree. Resolve package.json retaining secure versions/packageManager plus test/lint scripts and Playwright dev dependency. For pnpm-lock.yaml use dependency-lane lock as base then regenerate with pnpm install (not Bun); retain security overrides. Verify git status, expected combined scope, frozen install.
2. Strengthen tests per reviewer: blocked Toastify test collects pageerror and asserts zero after theme toggle AND ':' Vim shortcut. Assert canonical production origin and /lightbox intentional canonical policy (existing implementation is self canonical; acceptable, document expectation). Add lightbox Shift+Tab, backdrop closing, usable no-JS close/backdrop, repeated open/close no inert/scroll lock remaining. Add initial reducedMotion:reduce -> no-preference enables tilt, then reduce resets. Change dot reset assertions to check actual identity transform (computed DOMMatrix or empty/zero translation as appropriate), allowing never-displaced circles with no inline transform. Keep nonzero displacement assertions and meaningful reset checks; do not loosen to always-pass. RSS dates must be descending, canonical/feed origin production.
3. Native dialog has modal semantics via showModal but tests currently require explicit aria-modal=true. Either add correct explicit aria-modal=true to modal HTML (simple, semantically valid) OR justify testing native modal accessibility instead; preserve disabled-JS route links and native focus handling. Inspect lightbox focus cleanup and Astro routing while testing.
4. Run Node24 and pnpm11.23.0. Run pnpm check, pnpm lint, pnpm build, pnpm exec playwright install chromium if needed, pnpm test, pnpm audit --json, git diff --check and frozen reinstall without lock changes. Fix integration failures within scope, preserving user-approved design and original regression coverage. Tests must exercise 3 client-navigation cycles without full page.goto resetting each cycle; include client return home. Bound remote network where possible, but build may fetch configured author images.
5. Remove README conversational "test lane provides" wording; describe final commands. Document any remaining peer/audit issues accurately. Commit final integration fixes and return worktree/branch/HEAD, constituent commits, files, gate outputs, tests count, residual risks.
## Verification / done criteria
All checks/build/lint/browser tests exit0. Audit may remain nonzero only for documented single moderate trusted-build selector parser; 0 critical/high confirmed. Frozen install leaves lock unchanged. No temporary Sharp symlinks or /tmp package dependencies required: install must be reproducible. No parent branch changes. Keep working to resolve a failure; if same blocker persists after two reasoned attempts, stop and report exact cause and evidence rather than marking complete.
## Maintenance
Node24 binary /home/pol/.local/share/mise/installs/node/24.22.1/bin/node. Direct pnpm binary /home/pol/.local/share/mise/installs/pnpm/11.23.0/pnpm. Ensure PATH includes both dirs for subprocesses; inherited shell may select Node26. Use mise trust only in your own checkout if necessary.
## Original plans (fully inlined for context)
# Plan 001: Restore RSS and a secure reproducible dependency baseline
## Status
Priority P1; effort M–L; risk MED; depends on none; category security/migration/bug/dx; planned at df54ba1, 2026-10-25.
## Drift check
Run git diff --stat df54ba1..HEAD -- package.json pnpm-lock.yaml bun.lockb mise.toml README.md astro.config.mjs src/pages/rss.xml.js before changes. Compare excerpts if nonempty.
## Why this matters
GET /rss.xml returns HTTP 500 because @astrojs/rss 4.0.11 imports astro/zod and invokes z.function().returns(), removed by the current Zod. The pnpm audit reports one critical and 22 high advisories. Astro locked at 6.4.8 is behind security patches. These are dependency matches, not proof every advisory is exploitable. Local Bun-installed Astro is 6.1.1 and Motion 12.38.0, while pnpm locks 6.4.8 and 12.43.0.
## Current state
package.json:21: "@astrojs/rss": "4.0.11"; :30 "astro": "6"; "@astrojs/vercel": "^10.0.3".
src/pages/rss.xml.js:4 imports rss from "@astrojs/rss"; GET currently sets site: context.url and maps unsorted local posts.
astro.config.mjs imports @astrojs/tailwind, @astrojs/vercel, sitemap, icon; output:"server", adapter:vercel(); image domains explicitly allowed. Preserve domains.
README.md only identifies Astro and embeds a recording. mise.toml pins pnpm 11.23.0. Both bun.lockb and pnpm-lock.yaml are tracked.
## Scope
Only package.json, pnpm-lock.yaml, bun.lockb (remove), pnpm-workspace.yaml, mise.toml, README.md, astro.config.mjs, tsconfig.json, src/env.d.ts, src/pages/rss.xml.js. Minimal compatibility changes elsewhere REQUIRE reporting before continuing; do not edit shared UI files. Tests are owned by another lane.
## Shared context and conventions
This is pablopunk.com's Astro 6 / TypeScript / Tailwind 3 site, deployed with the Vercel adapter. All normal HTML pages are prerendered; RSS is currently SSR. Current commit df54ba1. Node 24 is required. mise.toml pins pnpm 11.23.0; the mise shim can refuse untrusted new worktrees. Run mise trust in YOUR disposable checkout, then use pnpm; direct binary fallback is /home/pol/.local/share/mise/installs/pnpm/11.23.0/pnpm. Do not use Bun: its tracked lock differs from pnpm.
Match two-space TypeScript indentation, double quotes, no semicolons; src/lib/tilt.ts is a convention exemplar with exported initializer, AbortController cleanup on astro:before-swap, reduced-motion checks. Keep the existing surface appearance, strength of tilts, and dotted animation.
Exact existing commands: pnpm check = astro check && tsc --noEmit; pnpm build = astro check && astro build; pnpm exec biome check src (check only). No tests currently exist. Run git diff --check too. Build/install artifacts are allowed inside this disposable worktree.
## Git workflow
Work only in your assigned isolated worktree. Commit logical changes there using plain imperative messages, e.g. "Repair RSS generation". Do not merge, push, open PRs, or modify the parent checkout. Skip updating plans/README.md: reviewer owns it. Report worktree path, branch, commit SHAs and exact commands/results.
## STOP conditions
Stop and report after two failed reasonable attempts at the same verification; if required changes exceed scope; or if credentials/private service access are required. Do not mask failures or weaken tests. Document minimal compatible adaptations. Never copy secret values.

## Steps
1. Run pnpm install --frozen-lockfile, pnpm check and pnpm audit --json. Summarize actual high/critical dependency paths and reachable runtime conditions. Verify existing baseline and reproduce RSS 500 with a dev server on a unique port (do not use 4321).
2. Consult primary upstream advisories/docs and choose a supported, mutually compatible patched Astro, Vercel adapter and RSS combination; use current registry data. The critical AVIF advisory GHSA-26w7-cxv4-gfx2 reports Astro >=7.2.8 and Sharp >=0.35.4 fixed; verify latest advisories rather than blindly pinning this minimum. Make the smallest supported upgrade that removes high/critical issues where possible; preserve Tailwind3 (do not redesign/migrate styling). Resolve transitive patches through supported upgrades or narrowly justified compatible overrides. Do not force unsafe major overrides. Verify pnpm check and pnpm build after each compatibility step.
3. Repair RSS using compatible rss API; use context.site or stable production site origin rather than the request /rss.xml URL. Sort newest first. Prefer prerender=true since all posts are local. Verify HTTP200, valid XML, absolute production post links, feed home URL, actual post count and newest-first order using node/python XML parsing. Dev and built endpoint must work.
4. Keep pnpm as single lock baseline, add packageManager matching pinned pnpm, remove bun.lockb, document Node24, mise trust, pnpm install --frozen-lockfile, dev/check/build/lint/test commands (test lane adds test script), and describe audit process. No speculative scripts. Verify clean frozen reinstall does not alter lockfile.
## Test plan
No behavior test framework exists yet; a parallel lane will add it. Independently verify feed XML against src/content/posts frontmatter using a temporary script, not just HTTP status. Run pnpm exec biome check src, pnpm check, pnpm build, pnpm audit --json and git diff --check. Report residual advisories explicitly with package path, exploitability, and upstream block. Never claim "secure" on unresolved applicable high/critical findings.
## Done criteria
All commands above pass except audit may remain nonzero ONLY with individually documented unresolvable/nonapplicable findings; feed valid and correct; one lockfile; frozen install reproducible; no scope violations. Commit changes and return exact audit before/after counts and compatibility risks.
## Maintenance notes
Integration lane must combine package.json test additions with dependency changes and regenerate pnpm lock. Never overwrite the other lane's scripts. Re-run browser tests after framework upgrade.


# Plan 002: Add meaningful route and browser regression verification
## Status
Priority P1; effort M; risk LOW; depends on none for implementation; final passing gates depend on plans 001 and 003 fixes; category tests/dx; planned at df54ba1, 2026-10-25.
## Drift check
Run git diff --stat df54ba1..HEAD -- package.json pnpm-lock.yaml .gitignore .github tests playwright.config.ts.
## Why this matters
Existing pnpm check passes while RSS is HTTP500 and tag navigation is invisible without JS. Recent Astro lifecycle interactions need behavior assertions for client navigation and reduced motion, not implementation snapshots.
## Current state
package.json scripts has check/build/format/type:check but no test or CI; no existing tests. src/lib/interactive-dots.ts:7 selects primary CTAs and .bg-dots and prepends SVG; cleanup at astro:before-swap. Layout uses ClientRouter. Tags has opacity:0 baseline. Layout canonical is SITE_URL + (post ? getPostUrl(post) : ""). Image overlay on /lightbox is currently a div with close anchor. Parallel fixes will correct these.
## Scope
Only package.json (test/lint scripts + dev test dependencies), pnpm-lock.yaml (dev test dependencies only), .gitignore (test artifacts), playwright.config.ts (new), tests/** (new), .github/workflows/check.yml (new). No application code fixes. Do not update dependencies beyond test requirements. README setup docs are owned by dependency lane.
## Shared context and conventions
This is pablopunk.com's Astro 6 / TypeScript / Tailwind 3 site, deployed with the Vercel adapter. All normal HTML pages are prerendered; RSS is currently SSR. Current commit df54ba1. Node 24 is required. mise.toml pins pnpm 11.23.0; the mise shim can refuse untrusted new worktrees. Run mise trust in YOUR disposable checkout, then use pnpm; direct binary fallback is /home/pol/.local/share/mise/installs/pnpm/11.23.0/pnpm. Do not use Bun: its tracked lock differs from pnpm.
Match two-space TypeScript indentation, double quotes, no semicolons; src/lib/tilt.ts is a convention exemplar with exported initializer, AbortController cleanup on astro:before-swap, reduced-motion checks. Keep the existing surface appearance, strength of tilts, and dotted animation.
Exact existing commands: pnpm check = astro check && tsc --noEmit; pnpm build = astro check && astro build; pnpm exec biome check src (check only). No tests currently exist. Run git diff --check too. Build/install artifacts are allowed inside this disposable worktree.
## Git workflow
Work only in your assigned isolated worktree. Commit logical changes there using plain imperative messages, e.g. "Repair RSS generation". Do not merge, push, open PRs, or modify the parent checkout. Skip updating plans/README.md: reviewer owns it. Report worktree path, branch, commit SHAs and exact commands/results.
## STOP conditions
Stop and report after two failed reasonable attempts at the same verification; if required changes exceed scope; or if credentials/private service access are required. Do not mask failures or weaken tests. Document minimal compatible adaptations. Never copy secret values.

## Steps
1. Install frozen pnpm baseline. Add minimal Playwright setup with deterministic local webServer on a unique loopback port, one worker if needed, Chromium only initially. Add test script and nonmutating lint script. Use small real browser tests; repository has no exemplar tests, follow @playwright/test official fixtures and webServer conventions. Verify test discovery with pnpm exec playwright test --list.
2. Add HTTP/XML route tests for RSS200, XML structure, feed production home and absolute post links/count/order; canonical and exactly one nonplaceholder description for home/blog/tag/post; camera legacy redirect destination points to a real route (Vercel redirect is not served by Astro dev, assert config then request target).
3. Add browser tests for tags visible with JS disabled; home→blog→tag→home via client navigation repeated, exactly one SVG per eligible surface after each home navigation; tilt responds and resets; dots repel/reset; reduced motion disables movement and tags remain visible across live preference change; theme toggle still works with Toastify CDN blocked; lightbox role/focus containment/Escape/close/focus restoration including direct navigation. Scope assertions to intended user-visible results, wait for observable state, avoid arbitrary sleeps and timing thresholds. Prior to parallel fixes, documented failures reproducing audited bugs are expected; do not weaken assertions to pass baseline.
4. Add CI Node24 and pinned pnpm frozen install, check, lint, build, browser installation with dependencies and tests. Avoid duplicate build in tests if CI already provides it; choose a documented consistent dev/build test mode. Cache package downloads, not stale installed dependencies. Verify YAML and run exact local gates.
## Test plan / done criteria
pnpm check, pnpm exec biome check src, pnpm build, pnpm exec playwright test --list, pnpm test, git diff --check. New test files must make substantive assertions listed above. Initial lane may report expected failures with named audited bug mapping; final integration MUST pass all tests. Ensure no remote image/CDN availability dependency creates flaky tests; preserve behavior testing when blocking nonessential external requests. Commit tests and report tests passed/failed and causes honestly.
## Maintenance notes
Dependency lane owns framework versions/packageManager; integration must merge package.json and regenerate lock with pnpm, keeping both sets of changes. UI lane may use test selectors; prefer roles/labels/current data attributes, don't require app-only test hooks.


# Plan 003: Correct UI fallbacks, metadata, redirect, lightbox and bound dots work
## Status
Priority P1; effort M; risk MED; depends on none; category bug/accessibility/perf; planned at df54ba1, 2026-10-25.
## Drift check
Run git diff --stat df54ba1..HEAD -- src/components/Tags.astro src/layouts/Layout.astro src/site.ts src/pages/index.astro src/lib src/styles/surfaces.css vercel.json.
## Why this matters
Tags are invisible without JS; blog/tag canonicals point home; a camera redirect misses /posts/; the overlay leaves obscured links focusable. Dots visit the entire grid per mouse frame even though a small neighborhood moves. Fix behavior while preserving the user-approved design.
## Current state and excerpts
Tags.astro:41: [data-motion-tag] { opacity:0; transform:translateY(6px); will-change:opacity,transform; }. Motion entrance explicitly animates opacity:[0,1].
Layout.astro:44: const url = site.SITE_URL + (post ? getPostUrl(post) : ""); :90 adds <meta name="description" content="Astro description" />. site.ts uses DEV localhost and NEXT_PUBLIC_VERCEL_URL; canonicals should use stable mainUrl (https://pablopunk.com).
vercel.json:115 destination "/the-best-camera-that-fits-in-your-pocket-is-not-your-smartphone" lacks /posts/.
index.astro:32–45 renders #lightbox as fixed div, close <a href="/" aria-label="Close image" class="surface-button surface-button--icon ...">, backdrop anchor and Logo1200. Profile trigger is a[href="/lightbox"][data-motion-profile]. src/pages/lightbox.astro renders index with lightbox prop.
interactive-dots.ts:66 loops all dots calculating hypot/atan2 and setting transform each nearby frame; each surface has separate document pointermove listener. 18px hero,12px CTA grids; radius90/60, force36/28, overflow0/48. CSS fallback must remain. tilt.ts initially returns entirely on reducedMotion.matches; later disabling reduced motion never enables it until navigation.
ThemeButton.astro unconditionally calls async CDN Toastify, as does Layout vim shortcut; blocked script throws after theme already changes.
## Scope
Only src/components/Tags.astro, src/components/ThemeButton.astro, src/layouts/Layout.astro, src/site.ts, src/pages/index.astro, src/pages/lightbox.astro, src/lib/interactive-dots.ts, src/lib/tilt.ts, src/lib/lightbox.ts (new if needed), src/styles/surfaces.css, vercel.json. No package/dependency/test framework/CI changes. New temporary verification outside tracked tree is fine in isolated worktree.
## Shared context and conventions
This is pablopunk.com's Astro 6 / TypeScript / Tailwind 3 site, deployed with the Vercel adapter. All normal HTML pages are prerendered; RSS is currently SSR. Current commit df54ba1. Node 24 is required. mise.toml pins pnpm 11.23.0; the mise shim can refuse untrusted new worktrees. Run mise trust in YOUR disposable checkout, then use pnpm; direct binary fallback is /home/pol/.local/share/mise/installs/pnpm/11.23.0/pnpm. Do not use Bun: its tracked lock differs from pnpm.
Match two-space TypeScript indentation, double quotes, no semicolons; src/lib/tilt.ts is a convention exemplar with exported initializer, AbortController cleanup on astro:before-swap, reduced-motion checks. Keep the existing surface appearance, strength of tilts, and dotted animation.
Exact existing commands: pnpm check = astro check && tsc --noEmit; pnpm build = astro check && astro build; pnpm exec biome check src (check only). No tests currently exist. Run git diff --check too. Build/install artifacts are allowed inside this disposable worktree.
## Git workflow
Work only in your assigned isolated worktree. Commit logical changes there using plain imperative messages, e.g. "Repair RSS generation". Do not merge, push, open PRs, or modify the parent checkout. Skip updating plans/README.md: reviewer owns it. Report worktree path, branch, commit SHAs and exact commands/results.
## STOP conditions
Stop and report after two failed reasonable attempts at the same verification; if required changes exceed scope; or if credentials/private service access are required. Do not mask failures or weaken tests. Document minimal compatible adaptations. Never copy secret values.

## Steps
1. Use CSS-visible default tags, let JS keyframes provide entrance, and handle live reduced-motion changes cleanly (no invisible tags or lingering active animation). Verify no-JS and preference transitions through a browser or temporary assertion harness.
2. Set canonical from current pathname plus stable production origin; home and lightbox may intentionally share home canonical; remove placeholder duplicate description. Preserve post metadata and do not add speculative SEO. Correct camera redirect destination. Verify rendered home/blog/tag/post/lightbox each has expected canonical and one description; request corrected destination gets200.
3. Make lightbox a real modal using native dialog or complete equivalent, keeping close link design and direct /lightbox support. Initial focus on close; contain focus; Escape/backdrop/close navigate home; background inert and scroll locked while open; restore profile trigger focus after client return when appropriate. Preserve Astro transitions and no-JS close/backdrop navigation. Clean up event listeners/inert/scroll on swap. Verify repeated open/close, direct URL, Tab/Shift+Tab/Escape, and background accessibility.
4. Guard optional Toastify global calls when CDN is absent; theme/Vim navigation must still work. Match existing tone/appearance; no new notification system. Fix initial-reduced-motion tilt setup so toggling preference enables/disables immediately. Verify blocked script, live preference changes, no runtime errors.
5. Profile dots at desktop size first and record number of visited/written circles and approximate frame timing with a temporary browser instrument or benchmark, avoiding undocumented permanent debug hooks. If frame time material OR full-grid traversal confirmed waste, restrict update to grid neighborhood plus previously displaced dots; avoid rewriting unchanged transforms; share scheduling where practical; reset correctly on leave, blur, scroll, resize and reduced motion. Do not change density, force, fade, hover speed, strengths, or replace with canvas without evidence. Verify displacement/reset and bounded per-frame writes; report measured results with hardware/viewport caveat. Keep code simple; no broad motion architecture rewrite.
## Test plan / done criteria
Run pnpm check, pnpm exec biome check src, pnpm build, git diff --check. A parallel lane adds browser regression tests; independently exercise above scenarios with product-native T3 preview if available (preview_status then preview_open; use agent-owned tab and explicit port), or supported browser fallback only if unavailable. Verify lightbox no-JS links remain usable, CSS dots fallback intact, no duplicate grids after repeated client navigation. Commit changes. Include full verification evidence and honest unmeasured limitations.
## Maintenance notes
The modal is route-backed, not an in-page state widget; preserve route/transition behavior. SVG coordinate normalization under tilt remains approximate; avoid broad geometry work. Tests from plan002 must be rerun on integrated framework upgrade.


