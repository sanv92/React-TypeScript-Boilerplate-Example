const { resolve } = require('path')
const { LoaderOptionsPlugin, EnvironmentPlugin, HotModuleReplacementPlugin } = require('webpack')
const merge = require('webpack-merge')

const { config, DIST, PORT, MOCK_PORT } = require('./webpack.base.config')


module.exports = merge(config, {
  profile: true,
  devtool: 'eval-source-map',

  output: {
    filename: '[name].js',
    publicPath: '/',
    path: DIST,
    pathinfo: true,
  },

  performance: {
    hints: false,
  },

  module: {
    rules: [],
  },

  optimization: {
    minimize: false,
    namedModules: true,
    namedChunks: true,
    noEmitOnErrors: true,
    removeAvailableModules: false,
    removeEmptyChunks: false,
    mergeDuplicateChunks: false,
    flagIncludedChunks: false,
    occurrenceOrder: false,
    providedExports: false,
    usedExports: false,
    concatenateModules: false,
    sideEffects: false,
  },

  plugins: [
    new LoaderOptionsPlugin({
      debug: true,
      minimize: false,
    }),

    new EnvironmentPlugin({
      NODE_ENV: 'development',
    }),

    new HotModuleReplacementPlugin(),
  ],

  devServer: {
    contentBase: resolve(__dirname, '..', 'public'),
    hot: true,
    stats: 'normal',
    historyApiFallback: true,
    noInfo: true,
    inline: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true,
    },
    proxy: [{
      context: ['/mock', '/api'],
      target: `http://localhost:${MOCK_PORT || 3002}`,
      changeOrigin: true,
    }],
    port: PORT || 3001,
    host: 'localhost'
  },
})
