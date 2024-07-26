/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-07-26 11:20:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-26 14:54:11
 * @Description :
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import type { VueWrapper } from '@vue/test-utils'
import SimpleCount from './SimpleCount.vue'

describe('SimpleCount.vue', () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    wrapper = renderComponent()
  })
  it('触发 submit 事件，参数为当前计数', async () => {
    const submitBtn = wrapper.find('button[role=submit]')

    await submitBtn.trigger('click')
    const emit = wrapper.emitted()

    expect(emit.submit[0]).toEqual([0])
  })
  it('测试原生事件', async () => {
    const plusBtn = wrapper.find('button[role=plus]')
    const span = wrapper.find('span')
    // 点击前的输出
    const text = span.text()
    expect(text).toContain('0')

    await plusBtn.trigger('click')

    // 点击后的输出
    const count = span.text()
    expect(count).toContain('1')
  })
})

function renderComponent(props?: any) {
  return shallowMount(SimpleCount, {
    props
  })
}
