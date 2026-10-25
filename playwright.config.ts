import { defineConfig, devices } from "@playwright/test"

const baseURL = "http://127.0.0.1:4318"

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  workers: 1,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    reducedMotion: "no-preference",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "pnpm exec astro dev --host 127.0.0.1 --port 4318 --ignore-lock",
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
    // Astro 7 auto-backgrounds in agent sessions; --ignore-lock keeps this process in the foreground.
    // Browser tests use the dev server; the separate build gate checks production output.
  },
})
