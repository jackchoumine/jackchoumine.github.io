/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-23 03:23:18
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-25 15:58:56
 * @Description : eslint配置
 */
module.exports = {
  root: false,
  // root: './',
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    quotes: [1, 'single'], //单引号
    'prettier/prettier': 'off',
    'no-unused-vars': 0,
    'no-undef': 0,
    'vue/no-unused-components': 0,
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
  ],
}
