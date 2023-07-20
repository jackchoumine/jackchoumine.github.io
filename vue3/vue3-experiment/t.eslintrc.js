/*
 * @Description: eslint 规则
 * // NOTE 安装 eslint 扩展 、禁用 prettier，并把 vetur 设置为默认的格式化方式，否则可能有冲突
 * // NOTE 不要启用 .editorconfig 配置，否则此处的规则不生效
 * @Date: 2021-01-20 14:26:35 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-01-22 20:17:11 +0800
 * @LastEditors: JackChou
 */
/*
*  依赖安装
  "eslint": "^7.6.0",
  "eslint-plugin-vue": "^6.2.2",
  "babel-eslint": "^10.1.0",
*/
// NOTE 保留,后续可能需要
// "husky": {
//     "hooks": {
//       "pre-commit": "npm run lint-staged"
//     }
//   },

//   "lint-staged": {
//     "**/*.{js,vue}": [
//       "npm run lint"
//     ]
//   },
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', 'plugin:vue/vue3-recommended'],
  plugins: ['vue'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  // NOTE 异步加载路由报错：Parsing error: Unexpected token import
  parser: '@babel/eslint-parser',
  // parserOptions: {
  //   parser: 'babel-eslint',
  //   ecmaVersion: '2018',
  //   sourceType: 'module',
  //   requireConfigFile: false,
  // },
  rules: {
    quotes: [2, 'single', { allowTemplateLiterals: true }],
    semi: [2, 'never'],
    // 强制在关键字前后使用一致的空格 (前后腰需要)
    'keyword-spacing': 2,
    // 强制一行的最大长度
    'max-len': [1, 120],
    // 使用 === 替代 == allow-null允许null和undefined==
    eqeqeq: [2, 'allow-null'],
    // 禁止将变量初始化为 undefined
    'no-undef-init': 2,
    // 禁止将 undefined 作为标识符
    'no-undefined': 0,
    // 禁止出现未使用过的变量
    'no-unused-vars': [2, { vars: 'all', args: 'none' }],
    // 要求使用 const 声明那些声明后不再被修改的变量
    'no-var': 2,
    'prefer-const': 2,
    'spaced-comment': [2, 'always'],
    'vue/multiline-html-element-content-newline': 0,
    // 一行多少属性
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 4,
        multiline: {
          max: 4,
          allowFirstLine: true,
        },
      },
    ],
    'vue/html-indent': [
      2,
      2,
      {
        attribute: 1, // 属性缩进
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    // https://eslint.vuejs.org/rules/attributes-order.html
    'vue/attributes-order': [
      2,
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
        alphabetical: false,
      },
    ],
  },
}
