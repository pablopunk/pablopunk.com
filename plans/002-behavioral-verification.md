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

