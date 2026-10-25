import { readFile } from "node:fs/promises"
import { expect, test } from "@playwright/test"
import { blockExternalRequests } from "./helpers"

const productionOrigin = "https://pablopunk.com"
const cameraRedirectSource =
  "/posts/la-mejor-camara-que-cabe-en-tu-bolsillo-no-es-tu-smartphone"

test.beforeEach(async ({ page, baseURL }) => {
  await blockExternalRequests(page, baseURL)
})

test("RSS serves valid XML with the site home and ordered absolute post links", async ({
  page,
  request,
}) => {
  const feedResponse = await request.get("/rss.xml")
  expect(feedResponse.status()).toBe(200)
  expect(feedResponse.headers()["content-type"]).toContain("application/xml")

  const homeResponse = await page.goto("/")
  expect(homeResponse?.status()).toBe(200)
  const homeCanonical = await page
    .locator('link[rel="canonical"]')
    .getAttribute("href")
  expect(homeCanonical).toBeTruthy()
  if (!homeCanonical) throw new Error("Home page should have a canonical URL")
  expect(new URL(homeCanonical).origin).toBe(productionOrigin)

  const blogResponse = await page.goto("/blog")
  expect(blogResponse?.status()).toBe(200)
  const blogPosts = await page
    .locator('main ul a[href^="/posts/"]')
    .evaluateAll((links) =>
      links.map((link) => ({
        path: (link as HTMLAnchorElement).pathname,
        title: link.querySelector("h2")?.textContent?.trim(),
      })),
    )

  const xml = await feedResponse.text()
  const parsedFeed = await page.evaluate((feedXml) => {
    const document = new DOMParser().parseFromString(feedXml, "application/xml")
    return {
      parserError: document.querySelector("parsererror")?.textContent,
      version: document.documentElement.getAttribute("version"),
      channelTitle: document.querySelector("rss > channel > title")
        ?.textContent,
      channelDescription: document.querySelector("rss > channel > description")
        ?.textContent,
      channelLink: document.querySelector("rss > channel > link")?.textContent,
      items: [...document.querySelectorAll("rss > channel > item")].map(
        (item) => ({
          title: item.querySelector("title")?.textContent?.trim(),
          link: item.querySelector("link")?.textContent,
          guid: item.querySelector("guid")?.textContent,
          pubDate: item.querySelector("pubDate")?.textContent,
        }),
      ),
    }
  }, xml)

  expect(parsedFeed.parserError).toBeUndefined()
  expect(parsedFeed.version).toBe("2.0")
  expect(parsedFeed.channelTitle?.trim()).toBeTruthy()
  expect(parsedFeed.channelDescription?.trim()).toBeTruthy()
  if (!parsedFeed.channelLink)
    throw new Error("RSS channel should have a home link")
  expect(parsedFeed.channelLink).toBe(new URL("/", productionOrigin).href)
  expect(parsedFeed.items).toHaveLength(blogPosts.length)
  expect(
    parsedFeed.items.every(
      (item) =>
        item.title &&
        item.link &&
        new URL(item.link).origin === productionOrigin &&
        item.guid === item.link &&
        item.pubDate &&
        !Number.isNaN(Date.parse(item.pubDate)),
    ),
  ).toBe(true)
  if (parsedFeed.items.some((item) => !item.link)) {
    throw new Error("Every RSS item should have an absolute post link")
  }
  expect(parsedFeed.items.map((item) => item.title)).toEqual(
    blogPosts.map((post) => post.title),
  )
  expect(
    parsedFeed.items.map((item) =>
      new URL(item.link as string).pathname.replace(/\/$/, ""),
    ),
  ).toEqual(blogPosts.map((post) => post.path))
  const publishedDates = parsedFeed.items.map((item) =>
    Date.parse(item.pubDate as string),
  )
  expect(
    publishedDates.every(
      (date, index) => index === 0 || publishedDates[index - 1] >= date,
    ),
  ).toBe(true)
})

const metadataRoutes = [
  { name: "home", path: "/" },
  { name: "blog", path: "/blog" },
  { name: "tag", path: "/tags/nextjs" },
  {
    name: "post",
    path: "/posts/the-best-camera-that-fits-in-your-pocket-is-not-your-smartphone",
  },
  // /lightbox intentionally keeps a self-canonical URL despite using the home layout.
  { name: "lightbox", path: "/lightbox" },
]

test("home, blog, tag, post, and lightbox canonicals match their route paths", async ({
  page,
}) => {
  for (const { name, path } of metadataRoutes) {
    const response = await page.goto(path)
    expect(response?.status(), `${path} should load`).toBe(200)

    const canonicals = page.locator('link[rel="canonical"]')
    await expect(canonicals).toHaveCount(1)
    const canonical = await canonicals.getAttribute("href")
    expect(
      canonical,
      `${name} should have an absolute canonical URL`,
    ).toBeTruthy()
    if (canonical) {
      expect(new URL(canonical).origin).toBe(productionOrigin)
      expect(new URL(canonical).pathname.replace(/\/$/, "") || "/").toBe(
        path.replace(/\/$/, "") || "/",
      )
    }
  }
})

test("home, blog, tag, post, and lightbox have one nonplaceholder description", async ({
  page,
}) => {
  for (const { name, path } of metadataRoutes) {
    const response = await page.goto(path)
    expect(response?.status(), `${path} should load`).toBe(200)
    const descriptions = await page
      .locator('meta[name="description"]')
      .evaluateAll((metas) =>
        metas.map((meta) => meta.getAttribute("content")?.trim()),
      )

    expect
      .soft(descriptions, `${name} should have one description`)
      .toHaveLength(1)
    expect
      .soft(
        descriptions.filter(
          (description) => description && description !== "Astro description",
        ),
        `${name} should have one nonplaceholder description`,
      )
      .toHaveLength(1)
  }
})

test("camera legacy redirect points to a route served by Astro", async ({
  request,
}) => {
  const vercelConfig = JSON.parse(
    await readFile(new URL("../vercel.json", import.meta.url), "utf8"),
  ) as { redirects: { source: string; destination: string }[] }
  const redirect = vercelConfig.redirects.find(
    ({ source }) => source === cameraRedirectSource,
  )

  expect(
    redirect,
    "the legacy camera URL should remain configured",
  ).toBeDefined()
  expect(redirect?.destination).toBeTruthy()
  if (!redirect)
    throw new Error("Legacy camera redirect should remain configured")
  const targetResponse = await request.get(redirect.destination)
  expect(
    targetResponse.status(),
    `${redirect.destination} should resolve to a real route`,
  ).toBe(200)
})
