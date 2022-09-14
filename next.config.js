// Sets a custom webpack configuration to use Next.js app with Sentry:
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs')

const moduleExports = {
  reactStrictMode: true,
  swcMinify: true,
  // https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files
  output: 'standalone',
  sentry: {
    // Sentry SDK creates sourcemaps and uploads them to its server to deminify errors
    // To prevent the original code to be visible in browser devtools in production, set hideSourceMaps to true
    // https://webpack.js.org/configuration/devtool/
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    hideSourceMaps: true
  }
}

const sentryWebpackPluginOptions = {
  silent: true // Suppresses all logs
}

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
