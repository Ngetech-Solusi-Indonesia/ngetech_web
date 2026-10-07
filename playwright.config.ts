import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  webServer: {
    command: 'pnpm build:preview && pnpm preview --port 4322 --ignore-lock',
    url: 'http://localhost:4322',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  use: {
    baseURL: 'http://localhost:4322',
    launchOptions: { executablePath: process.env.CHROMIUM_PATH || undefined },
  },
});
