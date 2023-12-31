import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'hyexer',
  viewportWidth: 1366,
  viewportHeight: 768,
  chromeWebSecurity: false,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  pageLoadTimeout: 30000,
  defaultCommandTimeout: 10000,
  env: {
    GLOB: 'cypress/e2e/**/*.feature',
    TAGS: 'not @ignore'
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: require('./webpack.config.js')
      };
      const webpack = require('@cypress/webpack-preprocessor');
      on('file:preprocessor', webpack(options));
    },
    baseUrl: 'https://calendar-challenge-six.vercel.app/',
    specPattern: 'cypress/e2e/**/*.feature',
  },
})
