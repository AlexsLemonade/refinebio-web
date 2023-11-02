// Custom webpack configuration for Next.js app with Sentry:
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
// Vercel for GitHub:
// https://vercel.com/docs/concepts/git/vercel-for-github#configuring-for-github

const { withSentryConfig } = require('@sentry/nextjs')

const moduleExports = () => {
  const isProduction = process.env.VERCEL_GIT_COMMIT_REF === 'main'

  // Set the env variables for 'staging' if not 'production'
  const env = {
    API_PATH: isProduction ? process.env.API_PATH : process.env.STAGE_API_PATH,
    API_VERSION: isProduction
      ? process.env.API_VERSION
      : process.env.STAGE_API_VERSION,
    SENTRY_DSN: isProduction
      ? process.env.SENTRY_DSN
      : process.env.STAGE_SENTRY_DSN,
    SENTRY_ENV: isProduction
      ? process.env.SENTRY_ENV
      : process.env.STAGE_SENTRY_ENV
  }

  return {
    compiler: {
      // https://nextjs.org/docs/advanced-features/compiler#styled-components
      styledComponents: true
    },
    env,
    experimental: { scrollRestoration: true },
    output: 'standalone',
    // https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files
    sentry: {
      // Sentry SDK creates sourcemaps and uploads them to its server to deminify errors
      // To prevent the original code to be visible in browser devtools in production, set hideSourceMaps to true
      // https://webpack.js.org/configuration/devtool/
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
      hideSourceMaps: true
    },
    swcMinify: true,
    webpack(config) {
      // eslint-disable-next-line no-param-reassign
      // config.infrastructureLogging = { debug: /PackFileCache/ }
      return config
    }
  }
}

const sentryWebpackPluginOptions = {
  dryRun: process.env.VERCEL_ENV !== 'production', // TEMPORARY until add required env variables in Vercel (env names were already added to Vercel w/o values)
  silent: true // Suppresses all logs
}

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
