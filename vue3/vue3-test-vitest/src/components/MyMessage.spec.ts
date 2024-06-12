/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-06-12 21:07:12
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-12 22:08:57
 * @Description : test MyMessage.vue
 */
import MyMessage, { validatorType } from './MyMessage.vue'

import { describe, it, expect } from 'vitest'
// import { shallowMount } from '@vue/test-utils'

describe('MyMessage.vue', () => {
  describe('测试 props -- type', () => {
    it('type 的值只能为 success info warning error', () => {
      ;['success', 'info', 'warning', 'error'].forEach((type) => {
        expect(() => validatorType(type)).not.toThrow()
      })
    })
    it('type 是必需的，否则报错', () => {
      expect(() => validatorType()).toThrow()
    })
    it('type 的值非法，报错', () => {
      expect(() => validatorType('invalid-type')).toThrow()
    })
  })
})

// describe('MyMessage.vue', () => {
//   it('type 的值只能为 success info warning error', () => {
//     ;['success', 'info', 'warning', 'error'].forEach((type) => {
//       const wrapper = renderMessage(type)
//       expect(wrapper.classes()).toContain(type)
//     })
//     // const wrapper = shallowMount(MyMessage, {
//     //   props: { type: 'success' }
//     // })
//     // expect(wrapper.classes()).toContain('success')
//   })
//   it('type 是必需的', () => {
//     const wrapper = renderMessage()
//     expect(wrapper.classes()).toContain('')
//   })
//   it('type 错误的路径', () => {
//     const wrapper = renderMessage('hello')
//     expect(wrapper.classes()).toContain('hello')
//   })
// })

// function renderMessage(type?: string) {
//   return shallowMount(MyMessage, {
//     props: { type }
//   })
// }
