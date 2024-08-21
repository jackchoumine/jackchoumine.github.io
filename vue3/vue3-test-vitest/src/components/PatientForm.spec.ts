/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-21 20:56:09
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-21 22:04:30
 * @Description : 表单测试
 */
import { shallowMount, type VueWrapper } from '@vue/test-utils'
import { beforeEach, expect, describe, it } from 'vitest'
import PatientForm from './PatientForm.vue'

describe('PatientForm', () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    wrapper = shallowMount(PatientForm)
  })
  it('合法表单', async () => {
    // 3A 法则
    // Arrange 设置用例
    const nameInput = wrapper.find('#name')
    const ageInput = wrapper.find('#age')

    // Act 采取行动：调用函数、赋值和模拟交互等
    await nameInput.setValue('some value')
    await ageInput.setValue(10)
    const nameError = wrapper.find('.name')
    const ageError = wrapper.find('.age')
    const btn = wrapper.find('button')

    // Assert 断言结果
    expect(nameError.exists()).toBe(false)
    expect(ageError.exists()).toBe(false)
    expect(btn.attributes('disabled')).toBe(undefined)
    // NOTE 通过 PatientForm.vue
    // 学习了如何将 表单验证逻辑 业务员逻辑 和 UI 层分离
    // 表单验证逻辑往往是通用的逻辑，能在其他地方复用，设置跨框架使用
    // 而业务逻辑和 UI 层是紧密相关的，不能复用到其他地方
  })
})
