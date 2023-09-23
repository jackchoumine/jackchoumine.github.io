/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-09-21 15:27:41
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-09-21 16:25:11
 * @Description : 常用工具函数
 */
const randomNum = (min = 0, max = 10) => Math.floor(Math.random() * (max - min + 1)) + min

function randomStr(len = 7, maxLen) {
  const upperCaseLetters = 'ABCDEFGHJKMNPQRSTWXYZ'
  const number = '123456789'
  const chars = `${upperCaseLetters}${upperCaseLetters.toLowerCase()}${number}`
  let strLen = chars.length
  let randomStr = ''
  let size = len
  if (typeof maxLen === 'number' && len < maxLen) {
    size = Math.floor(Math.random() * (maxLen - len + 1)) + len
  }
  for (let i = 0; i < size; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * strLen))
  }
  return randomStr
}
const format = n => {
  let num = n.toString()
  let len = num.length
  if (len > 3) {
    let temp = ''
    let remainder = len % 3
    if (remainder > 0) {
      // 不是3的整数倍
      return (
        num.slice(0, remainder) +
        ',' +
        num.slice(remainder, len).match(/\d{3}/g).join(',') +
        temp
      )
    } else {
      // 3的整数倍
      return num.slice(0, len).match(/\d{3}/g).join(',') + temp
    }
  }
  return num
}

const arrScrambling = arr => {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = Math.round(Math.random() * (arr.length - 1 - i)) + i
    ;[arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
  }
  return arr
}

const telFormat = tel => {
  tel = String(tel)
  return tel.substr(0, 3) + '****' + tel.substr(7)
}

const toKebabCase = str => {
  return str.replace(/[A-Z]/g, item => '-' + item.toLowerCase())
}

const toCamelCase = str => {
  return str.replace(/-([a-z])/g, (i, item) => item.toUpperCase())
}
// 全角转半角
const toCDB = str => {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    code = str.charCodeAt(i)
    if (code >= 65281 && code <= 65374) {
      result += String.fromCharCode(str.charCodeAt(i) - 65248)
    } else if (code == 12288) {
      result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32)
    } else {
      result += str.charAt(i)
    }
  }
  return result
}

const toDBC = str => {
  let result = ''
  for (let i = 0; i < str.length; i++) {
    code = str.charCodeAt(i)
    if (code >= 33 && code <= 126) {
      result += String.fromCharCode(str.charCodeAt(i) + 65248)
    } else if (code == 32) {
      result += String.fromCharCode(str.charCodeAt(i) + 12288 - 32)
    } else {
      result += str.charAt(i)
    }
  }
  return result
}

const checkCardNo = value => {
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(value)
}

const hasCNChars = value => {
  return /[\u4e00-\u9fa5]/.test(value)
}

const isPostCode = value => {
  return /^[1-9][0-9]{5}$/.test(value.toString())
}

const isIPv6 = str => {
  return Boolean(
    str.match(/:/g)
      ? str.match(/:/g).length <= 7
      : false && /::/.test(str)
      ? /^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(str)
      : /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(str)
  )
}

const isEmail = value => {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
}

const isTel = value => {
  return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(value.toString())
}

const isEmoji = str =>
  str.replace(
    /[^\u4E00-\u9FA5|\d|\a-zA-Z|\r\n\s,.?!，。？！…—&$=()-+/*{}[\]]|\r\n\s/g,
    ''
  )

const dateFormat = (format, time) => {
  let date = time ? new Date(time) : new Date(),
    Y = date.getFullYear() + '',
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds()
  return format
    .replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substr(2, 2))
    .replace(/MM/g, (M < 10 ? '0' : '') + M)
    .replace(/DD/g, (D < 10 ? '0' : '') + D)
    .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
    .replace(/mm/g, (m < 10 ? '0' : '') + m)
    .replace(/ss/g, (s < 10 ? '0' : '') + s)
}
export {
  randomNum,
  randomStr,
  format,
  telFormat,
  arrScrambling,
  checkCardNo,
  toKebabCase,
  toCamelCase,
  toCDB,
  toDBC,
  hasCNChars,
  isPostCode,
  isIPv6,
  isEmail,
  isTel,
  isEmoji,
  dateFormat,
}
