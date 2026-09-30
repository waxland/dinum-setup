import { defineConfig, devices } from "@playwright/test";

// Locally, we only want to run chromium to avoid missing browser executables
// In CI, we run all cross-browser matrix checks (chromium, firefox, webkit)
const isCI = !!process.env.CI;

const projects = isCI
  ? [
      {
        name: "firefox",
        use: { ...devices["Desktop Firefox"] },
      },
      {
        name: "webkit",
        use: { ...devices["Desktop Safari"] },
      },
      {
        name: "chromium",
        use: { ...devices["Desktop Chrome"] },
      },
    ]
  : [
      {
        name: "chromium",
        use: { ...devices["Desktop Chrome"] },
      },
    ];

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 30000,
  fullyParallel: false,
  forbidOnly: isCI,
  retries: 0,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:5181",
    trace: "retain-on-failure",
    headless: true,
  },
  projects,
  webServer: {
    command: "npm --prefix ../../demo run dev -- --host 127.0.0.1 --port 5181 --strictPort",
    url: "http://127.0.0.1:5181",
    reuseExistingServer: false,
    timeout: 30000,
  },
});
