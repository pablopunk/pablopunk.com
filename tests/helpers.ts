import type { Locator, Page } from "@playwright/test"

export const circleTransformsAreIdentity = (dots: Locator) =>
  dots.locator("circle").evaluateAll(
    (circles) =>
      circles.length > 0 &&
      circles.every((circle) => {
        const transform = getComputedStyle(circle).transform
        return (
          transform === "none" || new DOMMatrixReadOnly(transform).isIdentity
        )
      }),
  )

export const hasDisplacedCircle = (dots: Locator) =>
  dots.locator("circle").evaluateAll((circles) =>
    circles.some((circle) => {
      const transform = getComputedStyle(circle).transform
      if (transform === "none") return false

      const matrix = new DOMMatrixReadOnly(transform)
      return Math.hypot(matrix.m41, matrix.m42) > 0.1
    }),
  )

export const blockExternalRequests = async (page: Page, baseURL?: string) => {
  if (!baseURL) throw new Error("Playwright baseURL should be configured")
  const localOrigin = new URL(baseURL).origin

  await page.route("**/*", (route) => {
    const request = route.request()
    if (request.resourceType() === "image") return route.abort()
    if (new URL(request.url()).origin === localOrigin) {
      return route.continue()
    }
    return route.abort()
  })
}
