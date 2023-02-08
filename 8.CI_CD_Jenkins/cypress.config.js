const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "or8aez",
  e2e: {
    baseUrl: "http://qamid.tmweb.ru/",
    viewportWidth: 1080,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
