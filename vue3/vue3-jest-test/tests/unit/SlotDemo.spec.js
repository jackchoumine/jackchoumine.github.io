/*
 * @Description :
 * @Date        : 2023-01-12 00:31:13 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-12 00:55:49 +0800
 * @LastEditors : JackChou
 */
import { shallowMount } from '@vue/test-utils'
import SlotDemo from './SlotDemo.vue'
// NOTE 测试插槽
describe('测试插槽', () => {
  test('测试默认插槽', () => {
    const wrapper = shallowMount(SlotDemo)
    expect(wrapper.find('.left').text()).toBe('插槽后备内容')
  })
  it('测试传递的插槽', () => {
    const defaultSlot = `<h2>默认插槽</h2>`
    const wrapper = shallowMount(SlotDemo, {
      slots: {
        default: defaultSlot,
      },
    })
    // console.log(wrapper.html())
    expect(wrapper.find('h2').html()).toContain(defaultSlot)
  })

  it('作用域插槽', () => {
    const wrapper = shallowMount(SlotDemo, {
      slots: {
        // 传递 html
        /*html*/
        // right: `<template #right="{msg}">
        //           <p class="right">hello, {{msg}}</p>
        //         </template>`,
        // 传递 jsx
        right: ({ msg }) => <div class='right'>hello,{msg}</div>,
      },
    })
    // console.log(wrapper.html())
    expect(wrapper.find('.right').text()).toContain('hello')
  })
})
