/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-02 15:14:19
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-02 15:14:25
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
// svg-transform.js
export default {
  process() {
    return { code: 'module.exports = {};' }
  },
  getCacheKey() {
    return 'svgTransform' // SVG固定返回这个字符串
  },
}
