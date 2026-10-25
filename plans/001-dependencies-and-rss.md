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

