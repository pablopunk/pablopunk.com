---
title: Yet another Next.js starter kit. My way.
pubDate: 2021-07-01
description: But this one without all that boilerplate that you end up removing. Just replacing it.
image:
  url: https://ik.imagekit.io/pablopunk/posts/yet-another-next-js-starter-kit-my-way-.png?updatedAt=1698057160491
  alt: Next.js starter kit
author: Pablo Varela
tags: [nextjs, webdev]
---

But this one without all that boilerplate that you end up removing. Just replacing it.

I often come across next.js projects that aim to be a good way to start a new project but I always need to either remove lots of stuff from it or add very basic stuff (like SEO, come on).

So, I started to create my own. Very simple, yet powerful by default.

- [github.com/pablopunk/next-starter](https://github.com/pablopunk/next-starter)

## Features

- **ALMOST EMPTY**: Easy to start. Should fit any project.
- **TYPESCRIPT**: With the basic `tsconfig.json`.
- **TAILWINDCSS**: JIT mode. Synced with CSS variables. Check these files for more info: `tailwind.config.js` and `components/styles.css`
- **DARK MODE**: Automatic for user with dark mode enabled. Exposes: `window.__toggleDarkMode()` and `const [theme, toggleTheme] = useTheme()`.
- **SEO**: Very basic SEO config with `next-seo`, taking values from `config.js`.
- **LINTING**: Basic eslint/prettier config. Check both on `package.json`. Prettier is autorun on pre-commit with `husky`.

> Here’s a [live demo](https://next-starter.pablopunk.com).

As you can see in the list, they're basic stuff that probably 90% of devs would want on a new project. Don't like dark mode? Don't use it, but it's there for you. Don't like typescript? You should. Don't like tailwind? Ok then don't use the kit cause you'll hate it.

Go ahead and **[generate a project](https://github.com/pablopunk/next-starter/generate)** from this template! As the first steps, you can:

- modify the `config.js` to fit your website (it will be the default SEO).
- modify the color palette at `components/styles.css`
- modify the favicon at `public/favicon.png`

That's it! Drop me a message on [twitter](http://twitter.com/pablopunk) or [email me](mailto:pablo@pablopunk.com) for any feedback or questions.
