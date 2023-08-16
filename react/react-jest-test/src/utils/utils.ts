function isNon0Falsy(val?: any) {
  return Boolean(val) === false && val !== 0 && val !== '0'
  //   return [null, undefined, '', NaN].includes(val)
}

/**
 * 字符串零 '0'
 * @param val 判断的值
 */
function isStr0(val?: any) {
  return ['0', '-0', '+0'].includes(val)
}

export { isNon0Falsy, isStr0 }
