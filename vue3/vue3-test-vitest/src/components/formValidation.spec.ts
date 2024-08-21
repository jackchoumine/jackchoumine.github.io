/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-07-29 09:53:45
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-21 22:29:07
 * @Description :
 */
import { describe, expect, it } from 'vitest'
import { isRequired, isBetween, isFormValid, patientForm } from './formValidation'

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

describe('formValidation.isFormValid', () => {
  it(`所有字段都合法才合法`, () => {
    expect(isFormValid({ name: { valid: true }, age: { valid: true } })).toEqual(true)
  })
  it(`有一字段不合法就不合法`, () => {
    expect(isFormValid({ name: { valid: false } })).toEqual(false)
  })
})

describe('patientForm', () => {
  const formValue = {
    name: 'some name',
    age: 10
  }
  it(`快乐路径`, () => {
    // 两个字段都是合法的
    const result = patientForm(formValue)
    expect(result.name).toEqual({ valid: true })
    expect(result.age).toEqual({ valid: true })
  })
  it(`name为空`, () => {
    const result = patientForm({ ...formValue, name: '' })
    expect(result.name).toEqual({ valid: false, message: '请输入必填' })
    expect(result.age).toEqual({ valid: true })
  })
  it(`age不是数字`, () => {
    const result = patientForm({ ...formValue, age: NaN })
    expect(result.name).toEqual({ valid: true })
    expect(result.age).toEqual({ valid: false, message: '请输入数字' })
  })
  it(`age小于最小值`, () => {
    const result = patientForm({ ...formValue, age: -1 })
    expect(result.name).toEqual({ valid: true })
    expect(result.age).toEqual({ valid: false, message: '必须在0和150之间' })
  })
  it(`age大于最大值`, () => {
    const result = patientForm({ ...formValue, age: 151 })
    expect(result.name).toEqual({ valid: true })
    expect(result.age).toEqual({ valid: false, message: '必须在0和150之间' })
  })
})
