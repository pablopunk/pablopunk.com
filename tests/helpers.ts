import type { Page } from "@playwright/test"

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
