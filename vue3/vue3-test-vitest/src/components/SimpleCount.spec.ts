/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-07-26 11:20:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-26 13:36:10
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

    await plusBtn.trigger('click')
    const count = wrapper.find('span').text()

    expect(count).toContain('1')
  })
})

function renderComponent(props?: any) {
  return shallowMount(SimpleCount, {
    props
  })
}
