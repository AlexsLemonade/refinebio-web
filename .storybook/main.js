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
  webpackFinal: async (config) => {
    // (resource) 'configType' https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config

    config.resolve.modules.push(path.resolve(__dirname, './../src'))
    config.resolve.alias['utils'] = path.resolve(__dirname, './utils')
    // Return the altered config
    return config
  }
}
