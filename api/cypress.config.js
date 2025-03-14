const dotenv = require("dotenv");
const { defineConfig } = require("cypress");
const registerCypressGrep = require("cypress-grep/src/plugin");

dotenv.config();

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://serverest.dev",
    setupNodeEvents(on, config) {
      config.env.email_admin = process.env.EMAIL_ADMIN;
      config.env.password_admin = process.env.PASSWORD_ADMIN;

      registerCypressGrep(config);
      return config;
    },
    env: {
      grepFilterSpecs: true,
    },
  },
});
