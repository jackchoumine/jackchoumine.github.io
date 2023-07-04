/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-29 23:59:27
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-04 19:38:34
 * @Description :
 */

/**
 * 获取类型
 * @param {any} value 需要检查类型的值
 * @returns {string} 返回类型
 */
function type(value) {
  const typeStr = Object.prototype.toString.call(value)
  return typeStr.slice(8, -1).toLowerCase()
}

function isEmptyObj(value) {
  return true
}

export { type, isEmptyObj }
