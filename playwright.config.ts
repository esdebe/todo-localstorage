import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

const envPort = 3000

const baseURL = `http://localhost:${envPort}`

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
  webServer: {
    command: `npx vite build && npx vite preview --port ${envPort}`,
    port: envPort,
  },
}

export default config
