/*
 * @Description : 测试 props
 * @Date        : 2023-01-12 00:12:23 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-01-12 00:24:01 +0800
 * @LastEditors : JackChou
 */
import { shallowMount } from '@vue/test-utils'
import MyInput from './MyInput.vue'

describe('测试 props', () => {
  test('测试默认的 props', async () => {
    const wrapper = shallowMount(MyInput)
    // NOTE 手动修改页面，vue的渲染是异步的
    await wrapper.find('input').setValue('123')
    expect(wrapper.find('.errror').exists()).toBe(false)
  })
  it('测试传递的 props', async () => {
    const wrapper = shallowMount(MyInput, {
      props: {
        minLength: 5,
      },
    })
    await wrapper.find('input').setValue('12')
    expect(wrapper.find('.error').exists()).toBe(true)
  })
  it('测试 setProps', async () => {
    const wrapper = shallowMount(MyInput)
    wrapper.setProps({ minLength: 5 })
    await wrapper.find('input').setValue('12')
    expect(wrapper.find('.error').exists()).toBe(true)
  })
})
