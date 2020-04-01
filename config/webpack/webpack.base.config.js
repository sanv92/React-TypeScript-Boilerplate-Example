const { cpus } = require('os')
const { resolve } = require('path')

const { EnvironmentPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HappyPack = require('happypack')

const { NODE_ENV, PORT, MOCK_PORT } = process.env
const IS_PROD = NODE_ENV === 'production'
const IS_DEV = NODE_ENV === 'development'
const IS_TEST = NODE_ENV === 'test'
const API_URL = NODE_ENV.API_URL || `http://localhost:${MOCK_PORT || 8080}`

const PUBLIC = resolve(__dirname, '..', '..', 'public')
const DIST = resolve(__dirname, '..', '..', 'dist')
const SRC = resolve(__dirname, '..', '..', 'src')

const mode = IS_DEV || IS_TEST ? 'development' : 'production'

const config = {
  mode,
  context: SRC,
  target: 'web',

  entry: {
    // polyfill: ['core-js', 'whatwg-fetch'],
    polyfill: ['@babel/polyfill', 'whatwg-fetch'],
    ui: ['@sander/ui'],
    index: ['./index.tsx'],
  },

  resolve: {
    alias: {
      '@api': 'api',
      '@features': 'features',
      '@lib': 'lib',
      '@sander/ui': 'ui',
    },
    extensions: ['.ts', '.tsx', '.jsx', '.js'],
    modules: [SRC, 'node_modules'],
  },

  output: {
    path: DIST,
  },

  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'happypack/loader',
            options: {
              id: 'ts',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          IS_PROD ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: IS_DEV },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.css$/,
        use: [
          IS_PROD ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: IS_DEV },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: IS_DEV },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: '@svgr/webpack',
      },
    ],
  },

  plugins: [
    new HappyPack({
      id: 'ts',
      threads: cpus().length,
      loaders: ['babel-loader'],
    }),

    new EnvironmentPlugin({
      NODE_ENV: NODE_ENV || 'development',
      API_URL: API_URL,
    }),

    new HtmlWebpackPlugin({
      title: 'Todo Users with Posts',
      description: 'Todo Users with Posts',
      filename: 'index.html',
      template: `${PUBLIC}/index.html`,
      env: NODE_ENV || 'development',
    }),
  ],

  stats: {
    colors: true,
    children: false,
  },
}

module.exports = {
  config,

  PORT,
  MOCK_PORT,

  IS_DEV,
  IS_PROD,
  IS_TEST,

  PUBLIC,
  DIST,
  SRC,
}
