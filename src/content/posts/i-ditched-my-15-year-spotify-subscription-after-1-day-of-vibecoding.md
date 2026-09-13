---
title: I ditched ~15 years of Spotify after 1 day of vibecoding
pubDate: 2026-09-13
description: I've been on Spotify since around 2011 and paying for most of it. One day of vibecoding later I had Spotifin, my own Jellyfin player that runs everywhere.
image:
  # TODO: swap for the Spotifin header once uploaded (posts/spotifin.png)
  url: https://ik.imagekit.io/pablopunk/posts/remote%20play.png
  alt: Spotifin
author: Pablo Varela
tags: [jellyfin, music, flutter, ai]
featured: true
---

I've been on Spotify since around 2011, and paying for it for most of that time. My actual music, though, has lived on my own [Jellyfin](https://jellyfin.org) server for a while. Don't you miss actually **owning** your music? I do. I started to do it with my movies/shows a while ago, it was about time to do it with my music. The only thing I don't love about it was the apps. Some look dated, some are missing features, some only exist on one platform. So I kept opening Spotify just because the app feels nice to use.

A day of vibecoding later, I cancelled my Spotify subscription. This is [Spotifin](https://spotifin.app): **a free, open-source, Spotify-style music player that connects to your existing Jellyfin library.** It aims to be your go-to player *everywhere*.

## What it does

- 🌍 **Everywhere**: web, iOS, Android, macOS, Windows and Linux from a single Flutter codebase.
- ⚡ **Instantly opens**: it starts from your saved library and can play your downloads even without a connection.
- 🎤 **Synced lyrics**: pulled from Jellyfin and [LRCLIB](https://lrclib.net), following along as you listen.
- 🎲 **Daily mixes**: auto-generated from your tags and refreshed every day.
- 📡 **Remote play**: control another device or hand off playback mid-song without losing your place.
- ⬇️ **Downtify integration**: search music that isn't in your library yet and add it in one click if you run a [Downtify](https://downtify.henriquesebastiao.com/) server (don't sue me).

## Try it

The web app is the best place to start: **[spotifin.app](https://spotifin.app)**. You get your whole library and every feature, downloads included, on any device, with nothing to install.

If you'd rather run it natively, there are builds for iPhone/iPad, Android, macOS, Windows and Linux on the [releases page](https://github.com/pablopunk/spotifin/releases).

> Source code and more info: [github.com/pablopunk/spotifin](https://github.com/pablopunk/spotifin)

Spotifin is licensed under the AGPL-3.0. If you have a Jellyfin library, I'd love to know how it holds up with your setup. I suggest you keep supporting the artists you like somehow. **Downtify uses YouTube to download songs** (from your own account), and I still keep my YouTube Premium subscription.
