import * as path from 'path'

export default {
  stories: ['./stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  staticDirs: ['../public'],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  core: {
    builder: '@storybook/builder-webpack5'
  },
  docs: {
    autodocs: true
  },
  webpackFinal: async (config, { presets }) => {
    // (resource) 'configType' https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
    const webpack = await presets.apply('webpackInstance')
    config.resolve.modules.push(path.resolve(__dirname, './../src'))
    config.resolve.alias['utils'] = path.resolve(__dirname, './utils')
    config.resolve.alias['unfetch'] = path.resolve(
      __dirname,
      './../node_modules/unfetch/dist/unfetch.mjs'
    )
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, '')
      })
    )

    // Return the altered config
    return config
  }
}
