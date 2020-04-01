module.exports = {
  presets: [
    /**
     * useBuiltIns option
     *
     * @description:
     *  entry - option only include the polyfills your targets need.
     *  usage - Adds specific imports for polyfills when they are used in each file. We take advantage of the fact that a bundler will load the same polyfill only once.
     */
    [
      '@babel/preset-env',
      { useBuiltIns: 'entry', corejs: '3.6', modules: false },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],

  plugins: [
    [
      'babel-plugin-styled-components',
      {
        displayName: true,
        fileName: true,
        minify: false,
      },
    ],
  ],

  env: {
    development: {
      plugins: [
        [
          'babel-plugin-styled-components',
          {
            displayName: true,
            fileName: true,
            minify: false,
          },
        ],
      ],
    },

    production: {
      plugins: [
        [
          'babel-plugin-styled-components',
          {
            displayName: false,
            fileName: false,
            minify: true,
          },
        ],

        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-transform-react-constant-elements',
        [
          'transform-react-remove-prop-types',
          { mode: 'remove', ignoreFilenames: ['node_modules'] },
        ],
        [
          'transform-imports',
          {
            ramda: {
              transform: 'ramda/src/${member}',
              preventFullImport: true,
            },
          },
        ],
      ],
    },

    test: {
      plugins: [
        [
          'babel-plugin-styled-components',
          {
            displayName: false,
            fileName: false,
            minify: true,
          },
        ],
      ],
    },
  },
}
