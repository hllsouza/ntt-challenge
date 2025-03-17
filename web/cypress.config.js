const { defineConfig } = require("cypress");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

module.exports = defineConfig({
  reporter: require.resolve("mochawesome"),
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
    baseUrl: "https://front.serverest.dev",
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      config.env.email_admin = process.env.EMAIL_ADMIN;
      config.env.password_admin = process.env.PASSWORD_ADMIN;
      config.env.email_user = process.env.EMAIL_USER;
      config.env.password_user = process.env.PASSWORD_USER;
      require('cypress-grep/src/plugin')(config);
      return config;
    },
  },
});