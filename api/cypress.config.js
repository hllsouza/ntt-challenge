const { defineConfig } = require("cypress");
const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
    charts: true,
    reportPageTitle: 'Test Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveJson: true,
    reportFilename: '[name]-report'
  },
  e2e: {
    baseUrl: "https://serverest.dev",
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      config.env.email_admin = process.env.EMAIL_ADMIN;
      config.env.password_admin = process.env.PASSWORD_ADMIN;
      return config;
    }
  }
});