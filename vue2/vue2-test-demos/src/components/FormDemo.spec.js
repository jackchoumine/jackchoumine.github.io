/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-26 21:37:02
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-04 17:25:10
 * @Description : 测试表单
 */
import { shallowMount } from '@vue/test-utils'
import FormDemo from './FormDemo.vue'
import flushPromises from 'flush-promises'

describe('FormDemo.vue', () => {
  const res = { code: 0 }
  let wrapper = null
  const $http = {
    post: jest.fn(() => Promise.resolve(res)),
  }
  beforeEach(() => {
    wrapper = shallowMount(FormDemo, {
      mocks: {
        $http,
      },
    })
  })
  it('test custom form-submit event', async () => {
    wrapper.find('button').trigger('submit')
    // console.log(wrapper.emitted('form-submit'), 'zqj log')
    await flushPromises()
    expect(wrapper.emitted('form-submit')).toBeTruthy()
  })
  it('test input field', async () => {
    const input = wrapper.find('input')
    const email = 'hello@163.com'

    await input.setValue(email)

    expect(wrapper.vm.email).toBe(email)
    expect(wrapper.find('p').text()).toBe(email)
  })
  it('test radio field', async () => {
    const radio = wrapper.find('input[value="true"]')

    await radio.setChecked()

    expect(wrapper.vm.join).toBe('true')
    expect(wrapper.find('span').text()).toBe('true')
  })
  it('test radio field false', async () => {
    const radio = wrapper.find('input[value="false"]')
    radio.setChecked()
    expect(wrapper.vm.join).toBe('false')
    await wrapper.vm.$nextTick()
    expect(wrapper.find('span').text()).toBe('false')
  })
  it('test http post', () => {
    // 设置表单值
    const input = wrapper.find('input')
    const email = 'hello@163.com'
    input.setValue(email)
    const radio = wrapper.find('input[value="false"]')
    radio.setChecked()

    wrapper.find('button').trigger('submit')
    expect($http.post).toHaveBeenCalled()
    const data = expect.objectContaining({
      email,
      join: false,
    })
    expect($http.post).toHaveBeenCalledWith('test', data)
  })
  it('test http post response', async () => {
    wrapper.find('button').trigger('submit')
    // expect($http.post).toHaveBeenCalled()
    await flushPromises()
    expect(wrapper.emitted('success')[0][0]).toEqual(res)
  })
})
