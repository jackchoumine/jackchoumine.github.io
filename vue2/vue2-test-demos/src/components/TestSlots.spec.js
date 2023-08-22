/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-10 16:28:09
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-10 17:02:17
 * @Description :
 */
import { shallowMount } from '@vue/test-utils'
import TestSlots from './TestSlots.vue'
import { h } from 'vue'
import HelloSlot from './HelloSlot.vue'
describe('TestSlots.vue', () => {
  it('test slots', () => {
    // const wrapper = mount(TestSlots, {
    const wrapper = shallowMount(TestSlots, {
      slots: {
        header: '<div>header</div>',
        footer: '<HelloSlot />',
      },
      scopedSlots: {
        default: props => {
          return h(
            'p',
            {
              attrs: {
                'data-p': 'p',
              },
            },
            `${props.jack.name}, this is default scopedSlot`
          )
          // return <p>{props.jack.name}, this is default scopedSlot</p>
        },
      },
      stubs: {
        HelloSlot,
      },
    })

    expect(wrapper.find('div').text()).toMatch('header')
    expect(wrapper.findComponent(HelloSlot).exists()).toBe(true)
    expect(wrapper.find('[data-p=p]').text()).toMatch('slot, this is default scopedSlot')
  })
})
