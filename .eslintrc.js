module.exports = {
  'parserOptions': {
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'plugins': [
    'react'
  ],
  'env': {
    'browser': true,
    'jest': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'globals': {
    'angular': true,
    '_': true
  },
  'rules': {
    'camelcase': [
      'error'
    ],
    'dot-notation': [
      'error'
    ],
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'max-len': [
      'error',
      100
    ],
    'no-multiple-empty-lines': [
      'error',
      {'max': 1}
    ],
    'no-trailing-spaces': [
      'error'
    ],
    'space-infix-ops': [
      'error'
    ],
    'no-use-before-define': [
      'error',
      {'functions': false}
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'react/prop-types': [
      'off'
    ]
  }
};
