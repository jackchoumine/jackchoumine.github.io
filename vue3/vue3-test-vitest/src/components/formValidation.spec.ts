/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-07-29 09:53:45
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-29 10:16:32
 * @Description :
 */
import { describe, expect, it } from 'vitest'
import { isRequired, isBetween } from './formValidation'

describe('formValidation.isRequired', () => {
  it(`''非法`, () => {
    expect(isRequired('')).toEqual({
      valid: false,
      message: '请输入必填'
    })
  })
  it(` undefined 非法`, () => {
    expect(isRequired()).toEqual({
      valid: false,
      message: '请输入必填'
    })
  })
  it(`字符串合法`, () => {
    expect(isRequired('some value ')).toEqual({
      valid: true
    })
  })
})
describe('formValidation.isBetween', () => {
  it(`在最大最小之间，合法`, () => {
    expect(isBetween(4, { min: 2, max: 10 })).toEqual({
      valid: true
    })
  })
  it(`等于最小值，合法`, () => {
    expect(isBetween(2, { min: 2, max: 10 })).toEqual({
      valid: true
    })
  })
  it(`等于最大值，合法`, () => {
    expect(isBetween(10, { min: 2, max: 10 })).toEqual({
      valid: true
    })
  })
  it(`不是数字，非法`, () => {
    expect(isBetween(NaN, { min: 2, max: 10 })).toEqual({
      valid: false,
      message: '请输入数字'
    })
    // @ts-ignore
    expect(isBetween(void 0, { min: 2, max: 10 })).toEqual({
      valid: false,
      message: '请输入数字'
    })
    // @ts-ignore
    expect(isBetween(null, { min: 2, max: 10 })).toEqual({
      valid: false,
      message: '请输入数字'
    })
  })
  it(`大于最大值，非法`, () => {
    expect(isBetween(10.5, { min: 2, max: 10 })).toEqual({
      valid: false,
      message: '必须在2和10之间'
    })
  })
  it(`小于最小值，非法`, () => {
    expect(isBetween(1.9, { min: 2, max: 10 })).toEqual({
      valid: false,
      message: '必须在2和10之间'
    })
  })
})
