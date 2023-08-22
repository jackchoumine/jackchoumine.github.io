/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-24 17:53:11
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-22 15:28:41
 * @Description : 测试 ParentModal.vue
 */
import { shallowMount } from '@vue/test-utils'
import ParentModal from './ParentModal.vue'
import ModalDemo from './ModalDemo.vue'
describe('ParentModal.vue', () => {
  let wrapper = null
  beforeEach(() => {
    wrapper = shallowMount(ParentModal)
  })
  it('test close-modal event handler', () => {
    jest.spyOn(wrapper.vm, 'onCloseModal')
    // FIXME 为什么这里不行
    const modalDemo = wrapper.findComponent(ModalDemo).vm
    // modalDemo.$emit('close-modal')
    wrapper.vm.onCloseModal()
    console.log(wrapper.vm.show, 'zqj log')
    expect(wrapper.findComponent(ModalDemo).exists()).toBe(false)
    // expect(wrapper.vm.onCloseModal).toHaveBeenCalled()
    // expect(wrapper.vm.onCloseModal).toHaveBeenCalledTimes(1)
  })
})
