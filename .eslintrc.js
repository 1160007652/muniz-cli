const path = require('path');

module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['plugin:react/recommended', 'airbnb', 'airbnb/hooks', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/button-has-type': 'never',
    'react/prop-types': 'never',
    'react/sort-comp': 'never',
    'import/extensions': 'never',
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],
    //  取消 .d.ts 声明文件中使用了 constructor 报错 问题
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
  },
  overrides: [
    {
      files: ['**/*.d.ts'],
      rules: {
        'import/no-duplicates': 0,
      },
    },
  ],
};
