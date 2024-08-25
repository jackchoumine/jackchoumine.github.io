/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-25 01:03:13
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-25 16:49:26
 * @Description : 使用 vitest 测试 store
 */
import { describe } from 'vitest'

import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from './counterStore'
import { beforeEach, it, expect } from 'vitest'

describe('counterStore', () => {
  beforeEach(() => {
    // 创建一个新 pinia，并使其处于激活状态，这样它就会被任何 useStore() 调用自动接收
    // 而不需要手动传递： `useStore(pinia)`
    setActivePinia(createPinia())
    // 在 beforeEach 钩子中，创建并激活了一个 pinia 实例。没有它，商店就无法工作，抛出错误。
    // [🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
  })

  it('increment 没有参数，默认加 1', () => {
    const counter = useCounterStore()
    // store 状态
    expect(counter.count).toBe(0)

    counter.increment()

    expect(counter.count).toBe(1)
  })

  it('increment 有参数，使用参数修改状态', () => {
    const counter = useCounterStore()

    counter.increment(10)

    expect(counter.count).toBe(10)
  })

  it('doubleCount 是 count 的两倍', () => {
    const counter = useCounterStore()

    expect(counter.doubleCount).toBe(0)

    counter.increment()

    expect(counter.count).toBe(1)
    expect(counter.doubleCount).toBe(2)
  })
})

// 主要代码来自： https://pinia.vuejs.org/zh/cookbook/testing.html
