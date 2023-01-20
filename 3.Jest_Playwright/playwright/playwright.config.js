const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  timeout: 60 * 1000,
  expect: {
    timeout: 4000
  },

  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    trace: 'on-first-retry',
		launchOptions: {
			headless: false,
			slowMo: 500,
			devtools: true
		}
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
};

module.exports = config;
