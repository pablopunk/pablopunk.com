---
title: Developing NextJS + CMS is slow. Here's the fix
pubDate: 2022-06-15
description: NextJS is the framework that focuses on performance and developer experience. But it seems they have forgotten about developer performance.
image:
  url: https://ik.imagekit.io/pablopunk/posts/developing-nextjs-cms-is-slow-here-s-the-fix.gif?updatedAt=1698057165875
  alt: NextJS + CMS
author: Pablo Varela
tags: [nextjs, webdev]
---

## **The problem**

React **Fast Refresh** makes it very fast to develop components for your app. You see the changes in the code immediately. But sometimes you need to refresh the page or go to a different one, which is very slow when you are using `getStaticProps`.

It’s slow, but like, really slow. I’ve been using a CMS as the backend of the website you’re seeing right now ([pablopunk.com](http://pablopunk.com)). It’s a great experience to manage your data like that, but when it comes to loading the data when you’re coding a page, it just takes so much time if you’re jumping between pages

## The solution: cache

When you are coding you don’t always want the latest data from the CMS, a cached version is usually good enough to ship the feature or fix you’re working on. That’s why I implemented a **cache layer** on my stack.

### Redis

I chose Redis, but any other method will work. I started with a local server, because I only needed it while coding. But later I moved to a database in [upstash.com](http://upstash.com): it’s still Redis, but you don’t care about running the server! This allowed me to use [Codesanbox Projects](https://projects.codesandbox.io/) to easily run my dev environment.

### getStaticProps

Here’s what I had before the cache implementation:

```ts
const pageData = await getPageData(slug, locale)
```

I didn’t want to include the cache logic right there, so I made a helper function on another file that allowed me to use this simple approach:

```ts
const pageData = await getFromCache(`${slug}-${locale}`, () => getPageData(slug, locale))
```

The function `getFromCache` takes a string as an argument (the key in the database) and a function to get the data — that allows to separate the data-fetch implementation from the cache implementation:

```ts
export async function getFromCache(key: string, fetcher: () => Promise<any>) {
  // don't use cache in production or redis is not connected
  if (!redis || !isDev) {
    return fetcher().then((value) => setInCache(key, value) && value)
  }

  // get from cache
  let cache = await redis.get(key)
  cache = JSON.parse(cache)

  if (cache) {
    // renew cache (SWR-ish)
    fetcher().then((value) => setInCache(key, value))
    return cache
  }

  // fetch value if it's not cached (and save it)
  return fetcher().then((value) => setInCache(key, value) && value)
}
```

Aaaaaaaaaaand now it’s blazing fast!

[](https://ik.imagekit.io/pablopunk/posts/fast-nextjs-cache.gif)
