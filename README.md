# [pablopunk.com](https://pablopunk.com)

> Built with [Astro](https://github.com/pablopunk/pablopunk.com/pull/144).
> 
> If you're looking for an overengineered personal website, [I'm not that guy anymore](https://github.com/pablopunk/pablopunk.com/pull/142).



https://github.com/pablopunk/pablopunk.com/assets/4324982/c3adaa86-b6b3-4db5-952b-a35a16f30782

## Local development

This project requires Node.js 24 and pnpm 11.23.0. The versions are pinned in
`mise.toml` and `package.json`.

```sh
mise trust
pnpm install --frozen-lockfile
pnpm dev
```

Use these commands before submitting changes:

```sh
pnpm check
pnpm lint
pnpm build
pnpm exec playwright install chromium
pnpm test
```

`pnpm check` runs Astro diagnostics and TypeScript. `pnpm build` runs the check
and creates the production build. `pnpm lint` runs Biome without writing
changes. `pnpm test` runs route and browser regression tests in Chromium against
the Astro development server.

For dependency updates, run `pnpm audit` or `pnpm audit --json`, then check each
finding against its installed dependency path and the upstream advisory. Severity
alone does not show whether an issue is reachable in the deployed site. Prefer
supported package updates; use narrow, same-major pnpm overrides only when an
upstream dependency has not yet incorporated a compatible patch.

`pnpm peers check` reports that `@astrojs/tailwind@6.0.2` declares Astro
`^3.0.0 || ^4.0.0 || ^5.0.0`, while this project uses Astro 7.4.2. The local
check, lint, build, and browser gates pass with this combination; revisit the
peer warning when the adapter declares support for the installed Astro version.

The current audit has one moderate exception: `postcss-selector-parser@6.1.4`
(`GHSA-rj75-hqrm-r3gf`) is used by Tailwind 3 during builds. Its fix is in
version 7.1.6, outside Tailwind 3's declared 6.x range. The advisory does not
affect build-time parsing of trusted project styles; recheck this finding when
Tailwind or its selector-parser dependency changes.

