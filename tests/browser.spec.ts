import { type Page, expect, test } from "@playwright/test"
import {
  blockExternalRequests,
  circleTransformsAreIdentity,
  hasDisplacedCircle,
} from "./helpers"

test.beforeEach(async ({ page, baseURL }) => {
  await blockExternalRequests(page, baseURL)
})

const expectLightboxCleanup = async (page: Page) => {
  await expect
    .poll(() =>
      page.evaluate(() => ({
        htmlOverflow: document.documentElement.style.overflow,
        bodyOverflow: document.body.style.overflow,
        inertElements: document.querySelectorAll("[inert]").length,
      })),
    )
    .toEqual({ htmlOverflow: "", bodyOverflow: "", inertElements: 0 })
}

test("tags are visible with JavaScript disabled", async ({
  browser,
  baseURL,
}) => {
  const page = await browser.newPage({ javaScriptEnabled: false })
  await blockExternalRequests(page, baseURL)
  const response = await page.goto(new URL("/blog", baseURL).href)

  expect(response?.status()).toBe(200)
  const tags = page.locator("[data-motion-tag]")
  await expect(tags.first()).toBeAttached()
  await expect
    .poll(() =>
      tags.evaluateAll((elements) =>
        elements.every((element) => getComputedStyle(element).opacity === "1"),
      ),
    )
    .toBe(true)

  await page.close()
})

test("three client navigation cycles keep one SVG per eligible home surface", async ({
  page,
}) => {
  await page.goto("/")

  const assertOneSvgPerSurface = async () => {
    const eligibleSurfaces = page.locator(".surface-button--primary, .bg-dots")
    await expect(eligibleSurfaces).toHaveCount(3)
    await expect(page.locator(".interactive-dots")).toHaveCount(3)
    await expect
      .poll(() =>
        eligibleSurfaces.evaluateAll((surfaces) =>
          surfaces.every(
            (surface) =>
              surface.querySelectorAll(":scope > svg.interactive-dots")
                .length === 1,
          ),
        ),
      )
      .toBe(true)
  }

  for (let cycle = 0; cycle < 3; cycle += 1) {
    await assertOneSvgPerSurface()
    await page.getByRole("link", { name: "Blog" }).click()
    await expect(page).toHaveURL(/\/blog$/)
    await page.locator("[data-motion-tag]").first().click()
    await expect(page).toHaveURL(/\/tags\//)
    await page.getByRole("link", { name: "Go to home page" }).click()
    await expect(page).toHaveURL(/\/$/)
    await assertOneSvgPerSurface()
  }
})

test("tilt responds to pointer movement and resets on leave", async ({
  page,
}) => {
  await page.goto("/")
  const profile = page.locator("[data-motion-profile]")
  await expect(profile).toBeVisible()
  const bounds = await profile.boundingBox()
  expect(bounds).toBeTruthy()
  if (!bounds) throw new Error("Profile surface should have a bounding box")
  const initialBounds = bounds

  await page.mouse.move(
    bounds.x + bounds.width - 2,
    bounds.y + bounds.height / 2,
  )
  await expect.poll(() => profile.boundingBox()).not.toEqual(initialBounds)

  const viewport = page.viewportSize()
  if (!viewport) throw new Error("Browser viewport should be configured")
  await page.mouse.move(viewport.width - 1, viewport.height - 1)
  await expect.poll(() => profile.boundingBox()).toEqual(initialBounds)
})

test("interactive dots repel the pointer and reset after it leaves", async ({
  page,
}) => {
  await page.goto("/")
  const dots = page.locator(".hero-dots")
  await expect(dots).toBeAttached()
  await expect(dots.locator("circle").first()).toBeAttached()
  const bounds = await dots.boundingBox()
  expect(bounds).toBeTruthy()
  if (!bounds) throw new Error("Hero dots should have a bounding box")

  await page.mouse.move(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2,
  )
  await expect.poll(() => hasDisplacedCircle(dots)).toBe(true)

  const viewport = page.viewportSize()
  if (!viewport) throw new Error("Browser viewport should be configured")
  await page.mouse.move(viewport.width - 1, viewport.height - 1)
  await expect.poll(() => circleTransformsAreIdentity(dots)).toBe(true)
})

test("initial reduced motion blocks tilt until no-preference enables it", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/")
  const profile = page.locator("[data-motion-profile]")
  const bounds = await profile.boundingBox()
  expect(bounds).toBeTruthy()
  if (!bounds) throw new Error("Profile surface should have a bounding box")
  const initialBounds = bounds
  await page.mouse.move(
    bounds.x + bounds.width - 2,
    bounds.y + bounds.height / 2,
  )
  await expect.poll(() => profile.boundingBox()).toEqual(initialBounds)

  await page.emulateMedia({ reducedMotion: "no-preference" })
  await page.mouse.move(
    bounds.x + bounds.width - 2,
    bounds.y + bounds.height / 2,
  )
  await expect.poll(() => profile.boundingBox()).not.toEqual(initialBounds)

  await page.emulateMedia({ reducedMotion: "reduce" })
  await expect.poll(() => profile.boundingBox()).toEqual(initialBounds)

  await page.mouse.move(
    bounds.x + bounds.width - 2,
    bounds.y + bounds.height / 2,
  )
  await expect.poll(() => profile.boundingBox()).toEqual(initialBounds)
})

test("reduced motion disables interactive dots movement", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" })
  await page.goto("/")
  const dots = page.locator(".hero-dots")
  const dotsBounds = await dots.boundingBox()
  expect(dotsBounds).toBeTruthy()
  if (!dotsBounds) throw new Error("Hero dots should have a bounding box")
  await expect(dots.locator("circle").first()).toBeAttached()
  await expect
    .poll(() =>
      page.evaluate(
        () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      ),
    )
    .toBe(false)
  await page.mouse.move(
    dotsBounds.x + dotsBounds.width / 2,
    dotsBounds.y + dotsBounds.height / 2,
  )
  await expect.poll(() => hasDisplacedCircle(dots)).toBe(true)

  await page.emulateMedia({ reducedMotion: "reduce" })
  await expect.poll(() => circleTransformsAreIdentity(dots)).toBe(true)

  await page.mouse.move(
    dotsBounds.x + dotsBounds.width / 2 + 5,
    dotsBounds.y + dotsBounds.height / 2 + 5,
  )
  await expect.poll(() => circleTransformsAreIdentity(dots)).toBe(true)
})

test("tags stay visible across a live reduced-motion preference change", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto("/blog")
  const tags = page.locator("[data-motion-tag]")
  await expect(tags.first()).toBeAttached()
  await expect
    .poll(() =>
      tags.evaluateAll((elements) =>
        elements.every((element) => getComputedStyle(element).opacity === "1"),
      ),
    )
    .toBe(true)

  await page.emulateMedia({ reducedMotion: "no-preference" })
  await expect
    .poll(() =>
      tags.evaluateAll((elements) =>
        elements.every((element) => getComputedStyle(element).opacity === "1"),
      ),
    )
    .toBe(true)
  await page.emulateMedia({ reducedMotion: "reduce" })
  await expect
    .poll(() =>
      tags.evaluateAll((elements) =>
        elements.every((element) => getComputedStyle(element).opacity === "1"),
      ),
    )
    .toBe(true)
})

test("theme toggle works when Toastify's CDN is unavailable", async ({
  page,
}) => {
  const pageErrors: string[] = []
  page.on("pageerror", (error) => pageErrors.push(error.message))
  await page.route("https://cdn.jsdelivr.net/**", (route) => route.abort())
  await page.goto("/")
  await page.evaluate(() => localStorage.setItem("theme", "light"))
  await page.reload()

  await page.locator("#theme-toggle-label").click()
  await expect(page.locator("body")).toHaveClass(/dark/)
  await page.keyboard.press("Shift+Semicolon")
  await expect.poll(() => pageErrors).toEqual([])
})

test("lightbox traps focus, closes on Escape, and restores its opener", async ({
  page,
}) => {
  await page.goto("/")
  const opener = page.locator('a[href="/lightbox"]')
  await opener.click()
  await expect(page).toHaveURL(/\/lightbox$/)

  const dialog = page.getByRole("dialog")
  await expect(dialog).toBeVisible()
  await expect(dialog).toHaveJSProperty("open", true)
  await expect
    .poll(() => dialog.evaluate((element) => element.matches(":modal")))
    .toBe(true)
  await expect(page.locator("body > header")).toHaveJSProperty("inert", true)
  await expect
    .poll(() =>
      page.locator("html").evaluate((element) => element.style.overflow),
    )
    .toBe("hidden")
  await expect
    .poll(() =>
      page.locator("body").evaluate((element) => element.style.overflow),
    )
    .toBe("hidden")
  const closeButton = page.getByRole("link", { name: "Close image" })
  await expect(closeButton).toBeFocused()
  await page.keyboard.press("Tab")
  await expect(dialog.locator(":focus")).toHaveCount(1)
  await page.keyboard.press("Shift+Tab")
  await expect(dialog.locator(":focus")).toHaveCount(1)

  await page.keyboard.press("Escape")
  await expect(page).toHaveURL(/\/$/)
  await expect(page.locator('a[href="/lightbox"]')).toBeFocused()
  await expectLightboxCleanup(page)
})

test("direct lightbox navigation supports focus containment and its close link", async ({
  page,
}) => {
  await page.goto("/lightbox")
  const dialog = page.getByRole("dialog")
  await expect(dialog).toBeVisible()
  await expect
    .poll(() => dialog.evaluate((element) => element.matches(":modal")))
    .toBe(true)
  await expect(dialog.locator(":focus")).toHaveCount(1)

  await page.keyboard.press("Tab")
  await expect(dialog.locator(":focus")).toHaveCount(1)
  await page.keyboard.press("Escape")
  await expect(page).toHaveURL(/\/$/)

  await page.goto("/lightbox")
  await expect(page.getByRole("dialog")).toBeVisible()
  await page.getByRole("link", { name: "Close image" }).click()
  await expect(page).toHaveURL(/\/$/)
  await expectLightboxCleanup(page)
})

test("repeated lightbox backdrop and close navigation release modal state", async ({
  page,
}) => {
  await page.goto("/")

  for (const closeWithBackdrop of [true, false, true]) {
    await page.locator('a[data-motion-profile][href="/lightbox"]').click()
    const dialog = page.getByRole("dialog")
    await expect(dialog).toBeVisible()
    await expect
      .poll(() => dialog.evaluate((element) => element.matches(":modal")))
      .toBe(true)

    if (closeWithBackdrop) {
      await page
        .locator('#lightbox a[aria-hidden="true"]')
        .click({ position: { x: 8, y: 8 } })
    } else {
      await page.getByRole("link", { name: "Close image" }).click()
    }

    await expect(page).toHaveURL(/\/$/)
    await expectLightboxCleanup(page)
  }
})

test("lightbox close and backdrop links work without JavaScript", async ({
  browser,
  baseURL,
}) => {
  if (!baseURL) throw new Error("Playwright baseURL should be configured")
  const page = await browser.newPage({ javaScriptEnabled: false })
  await blockExternalRequests(page, baseURL)
  const lightboxUrl = new URL("/lightbox", baseURL).href
  const homeUrl = new URL("/", baseURL).href

  const directResponse = await page.goto(lightboxUrl)
  expect(directResponse?.status()).toBe(200)
  await expect(page.locator("#lightbox")).toBeVisible()
  await page.getByRole("link", { name: "Close image" }).click()
  await expect(page).toHaveURL(homeUrl)

  const backdropResponse = await page.goto(lightboxUrl)
  expect(backdropResponse?.status()).toBe(200)
  await expect(page.locator("#lightbox")).toBeVisible()
  await page.mouse.click(8, 8)
  await expect(page).toHaveURL(homeUrl)
  await page.close()
})
