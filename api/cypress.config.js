const { defineConfig } = require("cypress");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "api/cypress/reports",
    overwrite: false,
    html: false,
    json: true,
    charts: true,
    reportFilename: "mochawesome-[name]",
    reportPageTitle: "Test Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveJson: true
  },
  env: {
    grepFilterSpecs: true,
    grepOmitFiltered: true,
  },
  e2e: {
    baseUrl: "https://serverest.dev",
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      config.env.email_admin = process.env.EMAIL_ADMIN;
      config.env.password_admin = process.env.PASSWORD_ADMIN;
      require('cypress-grep/src/plugin')(config);
      return config;
    },
  },
});