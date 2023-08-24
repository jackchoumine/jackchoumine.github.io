/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-11 21:38:06
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-24 09:19:36
 * @Description : jest 配置
 */
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.jsx?$': 'babel-jest',
    // axios: 'babel-jest',
  },
  setupFilesAfterEnv: ['./tests/jest-setup.js'],
  moduleNameMapper: {
    axios: 'axios/dist/node/axios.cjs',
  },
}
