// Jest docs: https://jestjs.io/docs/configuration
// Next.js docs: https://nextjs.org/docs/testing
// React App docs: https://create-react-app.dev/docs/running-tests/

const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Path for loading next.config.js and .env files in the test environment
  dir: './'
})

/** @type {import('jest').Config} */
const customJestConfig = {
  testTimeout: 50000,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  // alias
  // moduleNameMapper: https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring
  moduleNameMapper: {
    '^pages(.*)$': '<rootDir>/src/pages/$1'
  },
  testEnvironment: 'jest-environment-jsdom'
}

// createJestConfig ensures that next/jest loads Next.js asynchronously
module.exports = createJestConfig(customJestConfig)
