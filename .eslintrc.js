module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'import',
    'jsx-a11y',
    'unicorn',
    'prettier',
  ],
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/react',
    'prettier/standard',
    'prettier/@typescript-eslint',
  ],
  env: {
    es6: true,
    browser: true,
    node: false,
    jquery: false,
    jest: false,
  },
  rules: {
    /**
     * TypeScript
     */
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-use-before-define': 'off',

    /**
     * jsx-a11y
     */
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',

    /**
     * Unicorn
     */
    'unicorn/filename-case': ['error', { case: 'kebabCase' }],
    'unicorn/catch-error-name': ['error', { name: 'error' }],
    'unicorn/no-fn-reference-in-iterator': 'off',
    'unicorn/import-index': 'off',
    'unicorn/consistent-function-scoping': 'off',

    /**
     * Imports
     */
    'import/no-unresolved': 'off',
    'import/named': 'error',
    'import/default': 'error',
    'import/no-absolute-path': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/no-self-import': 'error',
    'import/no-cycle': 'error',
    'import/no-named-as-default': 'off',
    'import/no-deprecated': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-mutable-exports': 'error',
    'import/unambiguous': 'error',
    'import/no-commonjs': 'error',
    'import/no-amd': 'error',
    'import/no-nodejs-modules': 'error',
    'import/first': 'error',
    'import/exports-last': 'off',
    'import/no-duplicates': 'error',
    'import/no-namespace': 'off',
    'import/extensions': [
      'error',
      'never',
      [
        'json',
        'json5',
        'less',
        'css',
        'scss',
        'sass',
        'styl',
        'jpeg',
        'jpg',
        'png',
        'svg',
        'bmp',
        'gif',
      ].reduce((obj, ext) => Object.assign(obj, { [ext]: 'always' }), {}),
    ],
    'import/newline-after-import': ['error', { count: 1 }],
    'import/prefer-default-export': 'off',
    'import/max-dependencies': 'off',
    'import/no-unassigned-import': 'off',
    'import/no-named-default': 'error',
    'import/no-named-export': 'off',
    'import/no-default-export': 'error',
    'import/group-exports': 'off',
    'import/no-useless-path-segments': [
      'error',
      {
        noUselessIndex: true,
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always-and-inside-groups',
      },
    ],

    /**
     * React
     */
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/prop-types': [
      'error',
      {
        ignore: ['classes', 'theme', 'sheet', 'sheets'],
      },
    ],
    'react/no-access-state-in-setstate': 'error',
    'react/forbid-foreign-prop-types': 'error',
    'react/jsx-max-depth': ['error', { max: 7 }],
    'react/jsx-props-no-spreading': 'off',

    /**
     * React hooks
     */
    'react-hooks/exhaustive-deps': 'off',

    /**
     * javascript common settings
     */
    strict: 'off',
    'max-len': [
      'error',
      80,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],

    'vars-on-top': 'off',
    semi: ['error', 'never'],
    'no-confusing-arrow': 'off',
    'object-property-newline': [
      'error',
      {
        allowAllPropertiesOnSameLine: true,
      },
    ],

    'object-curly-newline': [
      'error',
      {
        ObjectExpression: { multiline: true, consistent: true },
        ObjectPattern: { multiline: true, consistent: true },
        ImportDeclaration: { multiline: true, consistent: true },
        ExportDeclaration: { multiline: true, consistent: true },
      },
    ],
    'object-curly-spacing': ['error', 'always'],

    'arrow-parens': ['error', 'always'],

    'id-match': [
      'error',
      '^(([A-Za-z0-9]+){2,})|([A-Z][A-Z_0-9]+)$',
      {
        properties: false,
        onlyDeclarations: true,
      },
    ],

    'no-magic-numbers': 'off',

    'operator-linebreak': [
      'error',
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before',
          '&&': 'before',
          '+': 'before',
          '||': 'before',
          '??': 'before',
        },
      },
    ],
    'brace-style': 'off',
    'quote-props': ['error', 'as-needed'],
    'no-plusplus': 'off',
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'implicit-arrow-linebreak': 'off',

    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
    ],

    'no-unused-vars': ['error', { varsIgnorePattern: '_$|^React$' }],
    'class-methods-use-this': [
      'error',
      {
        exceptMethods: [
          'componentDidCatch',
          'componentDidMount',
          'componentDidUpdate',
          'componentWillMount',
          'componentWillReceiveProps',
          'componentWillUnmount',
          'componentWillUpdate',
          'render',
          'shouldComponentUpdate',
        ],
      },
    ],

    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],

    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'ForOfStatement',
        message:
          'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],

    'no-await-in-loop': 'error',
    'no-return-await': 'off',
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state'] },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
      },
      typescript: {
        directory: ['./tsconfig.json'],
        alwaysTryTypes: true,
      },
    },
  },
}
