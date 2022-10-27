const path = require('path')

module.exports = {
  stories: [
    './stories/**/*.stories.mdx',
    './stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  staticDirs: ['../public'],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5'
  },
  webpackFinal: async (config, { configType }) => {
    // (resource) https://storybook.js.org/docs/react/builders/webpack
    //  Change the configuration based on `configType` which has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // 'PRODUCTION' is used when building the static version of storybook.

    config.resolve.modules.push(path.resolve(__dirname, './../src'))
    config.resolve.alias['utils'] = path.resolve(__dirname, './utils')
    // Return the altered config
    return config
  }
}
