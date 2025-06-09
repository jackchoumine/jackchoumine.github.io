/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-06-09 09:51:22
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-06-09 10:31:21
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */

declare global {
  //interface GloalTis {
  //  myGlobalFn: () => void
  //}
  interface Window {
    myGlobalFn: () => void
    age: number
    userName: string
  }
}

// 确保文件是一个模块文件,export {} 不导出任何内容
// 只要文件中有 import 或 export，它就会被 TypeScript 识别为“模块文件”。
export {}
