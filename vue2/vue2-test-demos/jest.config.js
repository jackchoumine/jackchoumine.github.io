/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-23 03:23:18
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-10 09:32:21
 * @Description : jest 配置文件
 */
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: ['./**/*.spec.{j,t}s?(x)', './**/*.test.{j,t}s?(x)'],
  // transform: {
  //   '.*\\.(vue)$': 'vue-jest',
  //   '^.+\\.js$': 'node_modules/babel-jest',
  // },
}
