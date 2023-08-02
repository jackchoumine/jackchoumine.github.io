/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-03 00:43:02
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-03 00:44:47
 * @Description :
 */
import { shallowMount } from '@vue/test-utils'
import StaticComponent from './StaticComponent.vue'
describe('StaticComponent', () => {
  it('快照测试', () => {
    const wrapper = shallowMount(StaticComponent)
    expect(wrapper.element).toMatchSnapshot()
  })
})
