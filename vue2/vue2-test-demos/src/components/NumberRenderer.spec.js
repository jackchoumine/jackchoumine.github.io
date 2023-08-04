/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-04 15:21:19
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-04 15:34:44
 * @Description :
 */
import { shallowMount } from '@vue/test-utils'
import NumberRenderer from '@/components/NumberRenderer.vue'
describe('NumberRenderer', () => {
  it('when no props,should render 1,3,5', () => {
    const wrapper = shallowMount(NumberRenderer)

    expect(wrapper.text()).toMatch('1,3,5')
  })
  it('when props.even is true,should render 2,4,6', () => {
    const wrapper = shallowMount(NumberRenderer, {
      propsData: {
        even: true,
      },
    })

    expect(wrapper.text()).toMatch('2,4,6')
  })
  it('when props.even is false,should render 1,3,5', () => {
    const localThis = { even: false }

    expect(NumberRenderer.computed.numbers.call(localThis)).toMatch('1,3,5')
  })
})
