/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-08 12:16:37
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-08 14:37:46
 * @Description : 测试 inject
 */
import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import ChildCom from './ChildCom.vue'

describe('ChildCom', () => {
  it('inject data from parent component', () => {
    const wrapper = shallowMount(ChildCom, {
      global: {
        // NOTE 模拟父组件提供的数据
        provide: {
          theme: 'dark'
        }
      }
    })

    expect(wrapper.text()).toBe('dark')
  })
})
