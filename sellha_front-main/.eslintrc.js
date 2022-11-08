// const fs = require('fs');
// const path = require('path');

// const prettierOptions = JSON.parse(
//   fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
// );

module.exports = {
  env: {
    jest: true,
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  plugins: ['import', 'prettier', 'react', 'react-hooks', 'jsx-a11y'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/prop-types': 'off',
    'no-use-before-define': 'off',
    'no-alert': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*/sitemap-builder.js'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
};
