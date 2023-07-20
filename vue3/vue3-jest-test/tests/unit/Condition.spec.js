import { shallowMount } from '@vue/test-utils'
import Condition from './Condition.vue'

// NOTE 测试条件渲染
// v-if 使用 exists
// v-show 使用 isVisible
// get 元素一定存在
// find 可能不存在
describe('Condition.vue', () => {
  it('admin 存在', () => {
    const wrapper = shallowMount(Condition)
    expect(wrapper.find('#admin').exists()).toBe(true)
  })

  it('admin 不存在', () => {
    const wrapper = shallowMount(Condition, {
      data() {
        return {
          admin: false,
        }
      },
    })
    expect(wrapper.find('#admin').exists()).toBe(false)
  })

  it('dev 不可见', () => {
    const wrapper = shallowMount(Condition)
    expect(wrapper.find('#dev').isVisible()).toBe(false)
  })
  it('dev 可见', () => {
    const wrapper = shallowMount(Condition, {
      data() {
        return { dev: true }
      },
    })
    expect(wrapper.find('#dev').exists()).toBe(true)
    expect(wrapper.find('#dev').isVisible()).toBe(true)
  })
})
