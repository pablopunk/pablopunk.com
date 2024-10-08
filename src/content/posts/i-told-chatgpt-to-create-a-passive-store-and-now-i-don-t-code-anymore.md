---
title: I told ChatGPT to create a passive store and now I don't code anymore
pubDate: 2023-03-24
description: Yes, it's THAT good. Since I discovered ChatGPT I don't write boilerplate or stuff I wrote hundreds of times, I ask for it. Today I wanted to make it create a store to generate passive income.
image:
  url: https://ik.imagekit.io/pablopunk/posts/i-told-chatgpt-to-create-a-passive-store-and-now-i-don-t-code-anymore.png?updatedAt=1698057162161
  alt: Passive store
author: Pablo Varela
tags: ["ai"]
---

I actually did it as a joke, but when you tell someone that you like them it's only a joke if they don't like you back. You know what I'm talking about.

I'll try to keep it short, I did spend this morning with it, so the conversation is quite long, but its parts are not that complicated.

## General idea

I won't tell you about it, I will just paste my prompt to ChatGPT:

> I'm creating a website that lists car parts and car accessories that can be found on amazon. It shows the price and everything, but when you click it it will take you to amazon with an affiliate link. Can you suggest a catchy name that can be a .com domain?

And the response was... good:

> Sure, how about "AutoPartCove.com"? This name combines the concepts of automotive parts and accessories, while also evoking a sense of a welcoming destination or "cove" where people can easily find what they're looking for.

I actually had the intention of going back and forth about the name, but the first one actually convinced me. I mean it's not like a serious thing, I'm doing this for fun, so let's go with [autopartcove.com](https://autopartcove.com).

## Time to (not) code!

I don't want to tell it to generate the site for me, I want to create something specific that I like and I know the way it works, in case I need to make modifications or fix errors. Let's go with NextJS.

> Sure, let's call it AutoPartCove. I'm creating in Next.js, can you do the code for me, file by file? Let's start with pages/index.tsx

I won't bore you with the details, but the responses usually look like this:

![screenshot chat gpt pages index](https://ik.imagekit.io/pablopunk/posts/SbMbWmX.png)

It was actually a pretty good start. Of course it's importing stuff like `Layout` and `fetchProducts`, which we can ask it to create them for us. But first, I notice it's using `getServerSideProps`:

```tsx
export const getServerSideProps: GetServerSideProps = async () => {
  const products = await fetchProducts()

  return {
    props: {
      products,
    },
  }
}
```

That means it will be SSR (server-side rendered), but I prefer using SSG (static site generator) for this project. No problem for ChatGPT!

![make it SSG](https://ik.imagekit.io/pablopunk/posts/LqqYZ2S.png)

Done! Now I want to create the Layout component. I want to use TailwindCSS, just because, so I asked:

> give me the Layout component (use tailwindcss for everything). If you want to use colors, use them in this format: className="text-primary-100 bg-secondary-700", having only a primary and a secondary color

It worked but I specified that I wanted shades going from 50 to 900. OMG I'M BORING MYSELF. _Let's get to the good parts._ I generated the layout component, the product list component... So, it's time to actually get some products from the API.

## Getting products

It initially gave me a dumb static list of products, which of course I don't want, so I asked it to use the Amazon API. Long story short, it recommended me a bunch of libraries and I ended up with `amazon-buddy`. The others (including the official amazon PA API) were not working for me (for known reasons).

Even with that one, it was throwing some errors, so I went to its documentation and LITERALLY paste it into ChatGPT.

![amazon-buddy docs](https://ik.imagekit.io/pablopunk/posts/5erIfJB.png)

And it worked!

![amazon-buddy worked](https://ik.imagekit.io/pablopunk/posts/vcq4oJc.png)

## UI

This was actually the longest part, cause I really didn't want to do ANYTHING manually, so **I was asking ChatGPT to do EVERYTHING for me**. Not the best idea, I actually hit GPT-4's 25 requests/3-hours limit so I had to fallback to GPT-3.5. It's not as smart as GPT-4, but it's pretty good, enough for this project.

I tweaked TailwindCSS, some components, dark mode, `next-seo`, buttons here and there, and a search bar that actually works. OH WAIT I ALSO ASKED IT TO MAKE A LOGO WITH DALLE·2! Well, I asked it to give me a prompt, and it kinda worked. Here's what the website looks like at the moment of writing these lines.

![autopartcove.com](https://ik.imagekit.io/pablopunk/posts/sDDffeD.png)

## Blog

As you might have noticed in the screenshot, I didn't wanna stop there, so **I asked it to create a blog** with some posts (that later I would ask it to fill with content 😁) related to the site. It also took some back-and-forth talking about UI, the format of the posts, etc. The final idea was a `pages/blog/index.tsx` that rendered the list of posts, and each post is an actual component inside `pages/blog/<slug>.tsx`. It can easily be done better, using a CMS or using MDX, but that was good enough.

![blog](https://ik.imagekit.io/pablopunk/posts/JBrAWR1.png)

Did I mention that it created a responsive menu without me asking for it? LOOK AT THAT!

![responsive menu](https://ik.imagekit.io/pablopunk/posts/Jikhy8o.gif)

## Conclusion

No. That won't make you money. If someone tells you that generating affiliate stores will make you rich they will also probably tell you about Bitcoin, NFTs, and the keto diet. **Run**.

But that was a fun project. I did all of that in only one morning, and I could actually create something useful in the future. I'm currently using it to improve code that I already did or fill in gaps.

Go try it for yourself, or visit my new awesome store [AutoPartCove.com](https://autopartcove.com) and buy $1,000 worth of things, you know, just for fun :).
