// Sets a custom webpack configuration to use Next.js app with Sentry:
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs')

const moduleExports = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN
  },
  sentry: {
    hideSourceMaps: true
  }
}

const sentryWebpackPluginOptions = {
  silent: true // Suppresses all logs
}

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
