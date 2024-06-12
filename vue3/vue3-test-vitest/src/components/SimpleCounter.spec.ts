/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-06-13 00:50:52
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-13 01:59:52
 * @Description :
 */
import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SimpleCounter from './SimpleCounter.vue'

// NOTE: 通过测试自定义事件

describe('SimpleCounter.vue', () => {
  it('自定义事件 add', async () => {
    const wrapper = shallowMount(SimpleCounter)
    const addBtn = wrapper.find('[role="add"]')

    await addBtn.trigger('click')
    const emits = wrapper.emitted('add') as number[][]

    expect(emits).toHaveLength(1)
    expect(emits[0]).toEqual([2])
  })

  it('自定义事件 minus', () => {
    const wrapper = shallowMount(SimpleCounter)

    wrapper.vm.onMinus()
    const emits = wrapper.emitted('minus') as number[][]

    expect(emits[0]).toEqual([0])
  })

  it('第三种测试自定义事件的方式', () => {
    const count = 10
    const emits = emitOnCall(SimpleCounter, 'onMinus', { count })
    expect(emits.minus).toEqual([count - 1])
  })
})

function emitOnCall(Com: any, method: string, data: any) {
  const emits: any = {}
  // 重写了 this.$emit 方法
  // @ts-ignore
  const $emit = (eventName: string, ...params) => {
    emits[eventName] = [...params]
  }
  Com.methods[method].call({ $emit, ...data })
  return emits
}
