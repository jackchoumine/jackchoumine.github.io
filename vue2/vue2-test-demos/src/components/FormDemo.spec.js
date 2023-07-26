import { shallowMount } from '@vue/test-utils'
import FormDemo from './FormDemo.vue'
describe('FormDemo.vue', () => {
  let wrapper = null
  beforeEach(() => {
    wrapper = shallowMount(FormDemo, {})
  })
  it('test custom form-submit event', () => {
    // wrapper.find('form').trigger('submit')
    wrapper.find('button').trigger('submit')
    expect(wrapper.emitted('form-submit')[0]).toEqual([])
  })
  it('test input field', async () => {
    const input = wrapper.find('input')
    const email = 'hello@163.com'
    input.setValue(email)
    expect(wrapper.vm.email).toBe(email)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('p').text()).toBe(email)
  })
  it('test radio field', async () => {
    const radio = wrapper.find('input[type="radio"]')
    radio.setChecked()
    expect(wrapper.vm.join).toBe(true)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('span').text()).toBe('true')
  })
})
