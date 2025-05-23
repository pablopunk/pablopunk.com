---
title: How buying an M1 Macbook Air saved me money and time
pubDate: 2021-07-04
description: I had a 2019 16" MacBook Pro so I didn't have any expectations about the small cheap MBA being better than my beast. I was wrong.
image:
  url: https://ik.imagekit.io/pablopunk/posts/how-buying-an-m1-macbook-air-saved-me-money.jpg?updatedAt=1714130888479
  alt: M1 Macbook Air
author: Pablo Varela
tags: [mac]
---

At the start of this year I bought an M1 macbook air. Not because I needed one, but I was really curious about how it could perform on my daily tasks and my job also. I had a 2019 16" MacBook Pro so I didn't have any expectations about the small cheap MBA being better than my beast. I was wrong.

My plan was to try it out for a couple of weeks to see if I would suffer much from compatibility issues (virtualization, not-supported apps...) or poor performance while doing webdev work. **I ended up selling my 16-inch MBP!**

## The issues

I got my MBA and started to love the small form factor again. I was kinda hating my big-ass 16-inch macbook now, I really liked the portability even if it meant having a bit less performance. I started to install all the dev tools I needed. I thought this was gonna be the biggest issue but it wasn't. I did have some problems installing the native ARM version of [homebrew](http://brew.sh/), but I ended up installing the virtualized version. So all the tools I was using were actually virtualized (x86 binaries running on the ARM chip). How did that go performance-wise?

- **A-m-a-z-i-n-g**

I wish I still had my MBP to do the benchmarks again and show you the results. But I remember I was developing a nodejs/react project with webpack, and the compilation time was **THREE (3) TIMES FASTER ON THE VIRTUALIZED M1 CHIP**. Oh, I didn't mention this is a **1200**€ machine vs a **2700**€ one. Yes.

So I started to think this could really replace my current laptop. I was still using my 2 monitors at home, so screen real estate was not an issue. Although as you might know, M1 macbooks can only have **1 external display at a time**. The workaround was buying an (expensive) dongle **displaylink**-compatible, which basically connects via USB and you can have as many displays as you want. [This is](https://www.amazon.es/Kensington-K33972EU-Replicador-puertos-conector/dp/B009JZHEVU/ref=sr_1_13?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dchild=1&keywords=displaylink+plugable&qid=1625490304&sr=8-13) the one I got. At first it was kind of tricky making it work with the laptop closed, but the drivers improved since then and nowadays they're almost perfect.

I'm not sure if it's placebo, but the every-day experience with macOS feels snappier on the M1 MBA. Although it's not a surprise considering Apple is now controlling both the hardware and the software. Actually it feels faster for apps like **Cura Slicer and Autodesk Fusion 360** (both virtualized) compared to my 3060TI custom PC 👀 .

## How did it save me money then?

Although some things were not perfect (for example some Docker images wouldn't work on M1 yet, I needed to wait) I ended up selling my MBP for more (**1500€**) than the MBA costs (**1200€**). I not only gained in performance but also in performance per watt. Did I mention this macbook has a **30W** charger? My *older* MBP had a **96W**. Big difference. At high loads the cost is three times higher, and the battery is also amazing. I can go days without charing the laptop and having it around for daily tasks, turned on all the time. Which is also great for remote-working on coffee shops, etc.

I actually **never missed the MBP.** Maybe the speakers are better, when I use it on the go. But I'm always with my Airpods on.

Oh, and I did save some generic benchmarks when I had both at home. Here they are (geekbench):

![Img](https://ik.imagekit.io/pablopunk/posts/captura_de_pantalla_2021-01-24_a_las_19-11-12.png)

![Img](https://ik.imagekit.io/pablopunk/posts/captura_de_pantalla_2021-01-24_a_las_19-12-02.png)

If you have any comments or questions ping me on [twitter](https://twitter.com/pablopunk) or [email me](mailto:pablo@pablopunk.com).
