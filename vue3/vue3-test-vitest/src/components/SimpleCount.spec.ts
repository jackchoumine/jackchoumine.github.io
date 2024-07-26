/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-07-26 11:20:55
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-26 12:12:44
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

  // it('未登录', () => {
  //   const wrapper = renderComponent({ logined: false })

  //   expect(wrapper.text()).toContain('登录')
  // })
})

function renderComponent(props?: any) {
  return shallowMount(SimpleCount, {
    props
  })
}
