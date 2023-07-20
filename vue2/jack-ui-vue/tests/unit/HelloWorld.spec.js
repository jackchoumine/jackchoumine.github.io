/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-20 16:06:59
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-20 18:49:09
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
    expect(wrapper.text()).toBe(msg)
    expect(wrapper.text()).toEqual(msg)
    expect(wrapper.text()).toContain(msg)
  })
  test('始终通过的测试', () => {
    // TODO 如何编写 runner
    // runner.start()
    // setTimeout(() => {
    //   expect(runner.finished).toBe(true)
    // }, 1000)
  })
})
