/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-24 17:53:11
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-24 20:33:19
 * @Description : 测试 ParentModal.vue
 */
import { shallowMount } from '@vue/test-utils'
import ParentModal from './ParentModal.vue'
import ModalDemo from './ModalDemo.vue'
describe('ParentModal.vue', () => {
  let wrapper = null
  // let onCloseModal = jest.fn()
  beforeEach(() => {
    wrapper = shallowMount(ParentModal, {
      // mocks: {
      //   methods: {
      //     onCloseModal, //: jest.fn(),
      //   },
      // },
    })
  })
  it('test close-modal event handler', () => {
    jest.spyOn(wrapper.vm, 'onCloseModal')
    wrapper.find(ModalDemo).vm.$emit('close-modal')
    expect(wrapper.vm.onCloseModal).toHaveBeenCalledTimes(1)
  })
})
