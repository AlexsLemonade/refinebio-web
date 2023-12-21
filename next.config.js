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
    API_HOST: isProduction ? process.env.API_HOST : process.env.STAGE_API_HOST,
    API_VERSION: isProduction
      ? process.env.API_VERSION
      : process.env.STAGE_API_VERSION,
    GA4_MEASUREMENT_ID: isProduction
      ? process.env.GA4_MEASUREMENT_ID
      : process.env.STAGE_GA4_MEASUREMENT_ID,
    GITHUB_TOKEN: isProduction
      ? process.env.GITHUB_TOKEN
      : process.env.STAGE_GITHUB_TOKEN,
    GITHUB_ENDPOINT: isProduction
      ? process.env.GITHUB_ENDPOINT
      : process.env.STAGE_GITHUB_ENDPOINT,
    HUBSPOT_ACCESS_TOKEN: isProduction
      ? process.env.HUBSPOT_ACCESS_TOKEN
      : process.env.STAGE_HUBSPOT_ACCESS_TOKEN,
    HUBSPOT_ILS_LIST_ID: process.env.HUBSPOT_ILS_LIST_ID,
    SENTRY_DSN: isProduction
      ? process.env.SENTRY_DSN
      : process.env.STAGE_SENTRY_DSN,
    SENTRY_ENV: isProduction
      ? process.env.SENTRY_ENV
      : process.env.STAGE_SENTRY_ENV,
    SLACK_HOOK_URL: isProduction
      ? process.env.SLACK_HOOK_URL
      : process.env.STAGE_SLACK_HOOK_URL
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
  // TEMPORARY until add required env variables in Vercel
  // (env names were already added to Vercel w/o values)
  dryRun: true,
  silent: true // Suppresses all logs
}

module.exports = withSentryConfig(moduleExports, sentryWebpackPluginOptions)
