/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-29 15:03:46
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-29 15:11:27
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
export default interface Disposable {
  /**
   * 释放资源，释放后不可重用。
   */
  dispose(): void
}
