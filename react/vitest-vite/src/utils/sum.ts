/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-06 19:59:47
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-06 20:03:52
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
export function sum(...args: number[]) {
  return args.reduce((total, cur) => total + cur, 0)
}
