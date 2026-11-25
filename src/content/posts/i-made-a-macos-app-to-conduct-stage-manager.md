---
title: The only window manager that fits macOS is native. Sort of
pubDate: 2026-11-25
description: Batuta adds keyboard navigation and tiling to macOS Stage Manager. Move between windows and stages without touching the mouse.
image:
  url: https://ik.imagekit.io/pablopunk/posts/batuta-demo-light.gif
  url_dark: https://ik.imagekit.io/pablopunk/posts/batuta-demo-dark.gif
  alt: "Batuta demo: three windows in Messy mode switch to Even and back, then a fourth window joins"
author: Pablo Varela
tags: [mac, productivity]
featured: true
---

I've tried every tiling window manager out there, and I daily drove some of them for years: [Hyprland](https://hyprland.org) and [niri](https://github.com/YaLTeR/niri) on Linux, and [AeroSpace](https://github.com/nikitabobko/AeroSpace) on macOS, where I even keep [my own fork](https://github.com/pablopunk/AeroSpace). On the Mac, I kept trying them to fill what feels like a gap in the OS.

But on macOS they all share the same problem.

## The accessibility API is the wrong tool

Apple gives you no real API to manage windows, so every tiling manager on macOS is built on the accessibility API plus a pile of workarounds. That API was never meant for this. It's slow, it lags, and the animations are bad. You can't make anything beautiful with it.

So I fell back to [Stage Manager](https://support.apple.com/guide/mac-help/use-stage-manager-mchl534ba392/mac). It's built in, so it feels native, and it gives you workspaces: one stage for code, one for mail, one for music.

The problem is the keyboard. You can't switch apps fast, and you can't switch stages fast. `⌘⇥` doesn't cut it, and app switchers are just patches for the wrong problem.

So I made [Batuta](https://batuta.pablopunk.com) (Spanish for a conductor's baton): **keyboard control for Stage Manager, with tiling that stays out of your way**.

## A window manager that respects you

Tiling managers are bossy. They build for the keyboard, treat the mouse as an afterthought, and if you move a window, it snaps right back.

But I moved that window for a reason. Maybe I want it bigger for a while, and I'll tidy up later. Floating modes exist, but they're an afterthought too.

In Batuta, **if you move or resize a window, it stays there**. It uses the native stages, so the mouse works like it always did, and you forget there's a tiling manager at all until you switch stages or press the shortcut to tile. Freedom, with optional tidiness.

That's why it pairs so well with [Swift Shift](/posts/i-made-a-macos-app-for-the-ultimate-window-management), my app to move and resize windows from anywhere with a modifier and the mouse. Nudge a window with Swift Shift and Batuta leaves it right there.

The keyboard is an extra on top:

- `⌃⌘ + arrows` moves focus between windows and walks through your stages. Let go to open one.
- Add `⇧` to move windows instead: swap them, send one to its own stage, or pull a stage into the current one.

## Messy mode

I don't always want one window to fill the whole monitor. It looks ugly and it isn't necessary. And I don't always want all my windows to fill it either. Sometimes I just want them side by side, a bit smaller, because they feel more comfortable that way.

That's **Messy** mode: loose layouts where windows can overlap. There's also Even, BSP, Custom (draw your own) and Off, and everything lives in `~/.config/batuta/config.json`, ready for your dotfiles.

## Get it

```bash
brew install pablopunk/brew/batuta
```

Or grab it from [GitHub releases](https://github.com/pablopunk/batuta/releases). It's free, open source, and in alpha, so expect bugs (and please report them).
