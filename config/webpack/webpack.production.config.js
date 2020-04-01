const { LoaderOptionsPlugin, EnvironmentPlugin } = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')

const { config } = require('./webpack.base.config')

module.exports = merge(config, {
  devtool: 'hidden-source-map',

  output: {
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    crossOriginLoading: 'anonymous',
  },

  module: {
    rules: [],
  },

  optimization: {
    minimize: true,
    namedModules: false,
    namedChunks: false,
    noEmitOnErrors: true,
    removeAvailableModules: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    flagIncludedChunks: true,
    occurrenceOrder: true,
    providedExports: true,
    usedExports: true,
    concatenateModules: true,
    sideEffects: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        extractComments: true,
      }),
    ],
    splitChunks: {
      cacheGroups: {
        default: false,

        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          filename: '[name]-[chunkhash].js',
          chunks: 'initial',
          enforce: true,
        },

        ui: {
          test: /src\/ui/,
          name: 'ui',
          filename: '[name]-[chunkhash].js',
          chunks: 'initial',
          enforce: true,
        },
      },
    },
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),

    new LoaderOptionsPlugin({
      debug: false,
      minimize: true,
    }),

    new EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
})
