const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ey6z32",
  e2e: {
    baseUrl: "http://qamid.tmweb.ru/",
    viewportWidth: 1080,
    viewportHeight: 1080,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
