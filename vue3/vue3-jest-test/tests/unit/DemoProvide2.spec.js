/*
 * @Description : 使用 reactive 提供 store
 * @Date        : 2022-10-29 20:42:35 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-10-29 20:58:35 +0800
 * @LastEditors : JackChou
 */
import { mount } from '@vue/test-utils'
import DemoProvide2 from './DemoProvide.vue'
import { reactive } from 'vue'

function factory() {
  // NOTE 只有个组件使用了 provide 和 inject
  // 不想在全局注册，app.provide('store',store)
  // 可使用 reactive 模拟 store
  const state = reactive({ count: 0 })
  return mount(DemoProvide2, {
    global: {
      provide: {
        store: {
          state,
          commit: () => {
            state.count += 1
          },
        },
      },
    },
  })
}

describe('DemoProvide2', () => {
  it('使用 reactive 模拟 store', async () => {
    const wrapper = factory()
    const button = wrapper.find('button')
    await button.trigger('click')
    await button.trigger('click')
    expect(wrapper.find('button').text()).toBe('2')
  })
})
