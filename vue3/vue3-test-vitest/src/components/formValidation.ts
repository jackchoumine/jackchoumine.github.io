import { isNumerical } from 'petite-utils'

/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-07-29 09:53:45
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-29 10:07:35
 * @Description :
 */
export interface ValidationResult {
  valid: boolean
  message?: string
}
export interface Between {
  min: number
  max: number
}
function isRequired(value?: string): ValidationResult {
  if (value === undefined) {
    return {
      valid: false,
      message: '请输入必填'
    }
  }
  if (value.trim() === '') {
    return {
      valid: false,
      message: '请输入必填'
    }
  }
  return {
    valid: true
  }
}

function isBetween(input: number, between: Between): ValidationResult {
  if (!isNumerical(input)) {
    return {
      valid: false,
      message: '请输入数字'
    }
  }
  if (input < between.min || input > between.max) {
    return {
      valid: false,
      message: `必须在${between.min}和${between.max}之间`
    }
  }
  return {
    valid: true
  }
}

export { isRequired, isBetween }
