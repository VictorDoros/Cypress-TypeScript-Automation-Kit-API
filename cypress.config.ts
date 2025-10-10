import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/tests/**/*.cy.ts',
    env: {
      env: 'staging', // default environment (can be overridden via CLI, e.g. env=staging)
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
