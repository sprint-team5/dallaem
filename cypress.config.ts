import { defineConfig } from "cypress"

const dotenv = require("dotenv")
dotenv.config({ path: "./.env.local" })

export default defineConfig({
  e2e: {
    baseUrl: process.env.TEST_URL,
    setupNodeEvents(on, config) {
      config.env = {
        TEST_ID: process.env.TEST_ID,
        TEST_PASSWORD: process.env.TEST_PASSWORD,
        BACKEND_API: process.env.BASE_URL,
        TEAM_ID: process.env.TEAM_ID,
      }

      return config
    },
  },
})
