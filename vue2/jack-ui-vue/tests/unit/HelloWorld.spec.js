/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-20 16:06:59
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-20 16:13:32
 * @Description : 测试 HelloWorld.vue
 */
import { shallowMount } from '@vue/test-utils'
import HelloWorld from './HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
