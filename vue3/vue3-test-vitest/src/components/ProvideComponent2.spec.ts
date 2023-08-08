import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, inject } from 'vue'

import ProvideComponent2 from './ProvideComponent2.vue'

describe('ProvideComponent2', () => {
  it('provide data from parent component to child', () => {
    const ChildComponent = defineComponent({
      template: '<div class="provide-value">{{theme}}</div>',
      setup() {
        const theme = inject('theme')
        return {
          theme
        }
      }
    })

    const wrapper = mount(ProvideComponent2, {
      global: {
        stubs: {
          ChildCom: ChildComponent
        }
      }
    })

    expect(wrapper.find('.provide-value').text()).toBe('dark')
  })
})
