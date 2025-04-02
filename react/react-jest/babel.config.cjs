/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-02 15:09:47
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-02 15:12:01
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
// ./babel.config.cjs
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react', { runtime: 'automatic' }], // 自动导入react
    '@babel/preset-typescript',
  ],
}
