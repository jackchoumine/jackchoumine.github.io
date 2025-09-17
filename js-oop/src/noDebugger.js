/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-11-20 23:13:45
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-11-20 23:29:37
 * @Description : 禁止调试页面
 */
setInterval(() => {
  ;(function () {
    try {
      new Function('debugger')()
      arguments.callee()
    } catch (error) {}
  })()
}, 500)
