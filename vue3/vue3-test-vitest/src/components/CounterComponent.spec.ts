/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-25 01:25:52
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-03-22 19:30:46
 * @Description : 测试含有 pinia store 的 CounterComponent 组件
 */
import { shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import CounterComponent from './CounterComponent.vue'

describe('CounterComponent.', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('组件初始状态', async () => {
    const wrapper = shallowMount(CounterComponent)
    const countH3 = wrapper.findAll('h3').at(0)
    const doubleCountH3 = wrapper.findAll('h3').at(1)

    expect(countH3?.text()).contains('0')
    expect(doubleCountH3?.text()).contains('0')
  })

  it('调用 increment(2) 函数后的状态', async () => {
    const wrapper = shallowMount(CounterComponent)
    const countH3 = wrapper.findAll('h3').at(0)
    const doubleCountH3 = wrapper.findAll('h3').at(1)

    expect(countH3?.text()).contains('0')
    expect(doubleCountH3?.text()).contains('0')

    const btn = wrapper.find('button')
    await btn.trigger('click')

    expect(countH3?.text()).contains('2')
    expect(doubleCountH3?.text()).contains('4')
  })
})
