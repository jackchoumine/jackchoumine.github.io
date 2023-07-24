/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-24 17:53:11
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-24 18:31:01
 * @Description : 测试 ModalDemo.vue
 */
import { shallowMount } from '@vue/test-utils'
import ModalDemo from './ModalDemo.vue'
describe('ModalDemo.vue', () => {
  let wrapper = null
  beforeEach(() => {
    // const onClose = () => {}
    const onClose = jest.fn()
    wrapper = shallowMount(ModalDemo, {
      propsData: {
        onClose,
      },
    })
  })
  it('test native event click', () => {
    jest.spyOn(wrapper.vm, 'onClose')
    wrapper.find('.btn-close').trigger('click')
    expect(wrapper.vm.onClose).toHaveBeenCalledTimes(1)
  })
})
