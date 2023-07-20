// 相关依赖
// npm install --save-dev eslint eslint-plugin-vue
// npm install --save-dev prettier eslint-plugin-prettier @vue/eslint-config-prettier
// eslint-disable-next-line max-len
// npm install --save-dev @vue/eslint-config-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser
module.exports = {
  parser: 'vue-eslint-parser',
  env: {
    node: true,
    browser: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'prettier',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      jsx: true,
      tsx: true, // Allows for the parsing of JSX
    },
  },
  globals: {
    // 用到的全局变量，eslint 会跳过检查
    defineProps: true,
  },
  rules: {
    'prettier/prettier': 0,
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    camelcase: [2, { properties: 'never' }],
    semi: [2, 'never'],
    indent: [2, 2, { SwitchCase: 1 }],
    'no-console':
      process.env.NODE_ENV === 'production'
        ? [2, { allow: ['warn', 'error'] }]
        : [2, { allow: ['warn', 'error', 'log'] }],
    // NOTE
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 1, // 生产环境进制在文件里 debugger
    'max-len': [
      1,
      {
        code: 100,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
        ignoreComments: true,
        ignoreTrailingComments: true,
      },
    ],
    'comma-dangle': 0, // 尾部逗号，不启用，使用 prettier 的
    // 'comma-dangle': [2, 'always-multiline'],
    'eol-last': 2,
    'no-trailing-spaces': 2,
    'comma-style': [2, 'last'],
    'spaced-comment': [2, 'always'],
    'object-curly-spacing': [2, 'always'],
    'comma-spacing': [2, { before: false, after: true }],
    'computed-property-spacing': [2, 'never'],
    // 字符串连接时 会启用字符模板优先，更加可读
    'prefer-template': 2,
    'prefer-const': 2,
    // ts 总是添加箭头函数的()   (a:string)=>{}
    'arrow-parens': [2, 'always'],
    'space-before-function-paren': 0, // function test(){}
    // NOTE 可读性好
    yoda: [2, 'never', { exceptRange: true }], // 犹大条件 变量在前 color === 'red'
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/member-delimiter-style': [
      2,
      {
        multiline: {
          delimiter: 'none',
          requireLast: false,
        },
        singleline: {
          delimiter: 'none',
          requireLast: true,
        },
      },
    ],
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-function': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    /** vue **/
    'vue/no-v-html': 0,
    'vue/singleline-html-element-content-newline': 0,
    // 自闭和标签
    'vue/html-self-closing': [
      2,
      {
        html: {
          void: 'always', // 通用的标签
          normal: 'never', // 知名的html元素
          component: 'always', // vue组件
        },
      },
    ],
    // 每行允许显示最大属性个数
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 3, // 开始标签在一行中时最大显示个数
        multiline: 1, // 位于多行时每行显示个数
      },
    ],
    //
    'vue/require-default-prop': 0,
    'vue/html-closing-bracket-spacing': 2,
    'vue/component-name-in-template-casing': [
      2,
      'PascalCase',
      {
        registeredComponentsOnly: false,
        ignores: ['/el-(.*)/', '/router(.*)/', 'component', 'keep-alive'],
      },
    ],
  },
}
