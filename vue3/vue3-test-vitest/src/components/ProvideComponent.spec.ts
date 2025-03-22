/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-08 11:26:53
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-03-22 19:25:31
 * @Description : 测试 provide
 */
import { describe, it, expect } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import { defineComponent, h, inject } from 'vue'

import ProvideComponent from './ProvideComponent.vue'

describe('ProvideComponent', () => {
  it('provide data from parent component', () => {
    const TestComponent = defineComponent({
      template: '<div class="provide-value">{{theme}}</div>',
      setup() {
        const theme = inject('theme')
        return {
          theme
        }
      }
    })

    const wrapper = mount(ProvideComponent, {
      slots: {
        default: () => h(TestComponent)
      }
    })

    expect(wrapper.find('.provide-value').text()).toBe('dark')
  })
})
