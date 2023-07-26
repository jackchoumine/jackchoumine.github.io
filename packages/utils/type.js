/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-29 23:59:27
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-26 14:36:12
 * @Description :
 */

/**
 * 获取类型
 * @param {any} value 需要检查类型的值
 * @returns {string} 返回类型的小写字符串
 */
function type(value) {
  const typeStr = Object.prototype.toString.call(value)
  return typeStr.slice(8, -1).toLowerCase()
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null
}

function isPrimitive(arg) {
  return (
    arg === null ||
    typeof arg === 'boolean' ||
    typeof arg === 'number' ||
    typeof arg === 'string' ||
    typeof arg === 'symbol' || // ES6 symbol
    typeof arg === 'undefined'
  )
}

function isError(e) {
  return type(e) === 'error' || e instanceof Error
}

function isDate(d) {
  return type(d) === 'date'
}

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg)
  }
  return type(arg) === 'array'
}

function isBoolean(arg) {
  return typeof arg === 'boolean'
}

function isNull(arg) {
  return arg === null
}

function isNullOrUndefined(arg) {
  return arg == null
}

function isNumber(arg) {
  return typeof arg === 'number'
}

function isString(arg) {
  return typeof arg === 'string'
}

function isSymbol(arg) {
  return typeof arg === 'symbol'
}

function isUndefined(arg) {
  return arg === void 0
}

function isRegExp(re) {
  return type(re) === 'regexp'
}

export {
  type,
  isObject,
  isArray,
  isBoolean,
  isDate,
  isError,
  isNull,
  isNullOrUndefined,
  isNumber,
  isString,
  isSymbol,
  isUndefined,
  isRegExp,
  isPrimitive,
}
