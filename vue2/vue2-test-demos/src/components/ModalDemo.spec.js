/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-24 17:53:11
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-22 14:56:51
 * @Description : 测试 ModalDemo.vue
 */
import { shallowMount } from '@vue/test-utils'
import ModalDemo from './ModalDemo.vue'
describe('ModalDemo.vue', () => {
  let wrapper = null
  beforeEach(() => {
    const onClose = () => {}
    // const onClose = jest.fn()
    wrapper = shallowMount(ModalDemo, {
      propsData: {
        onClose,
      },
    })
  })
  it('test native event click', async () => {
    jest.spyOn(wrapper.vm, 'onClose')

    await wrapper.find('.btn-close').trigger('click')

    expect(wrapper.vm.onClose).toHaveBeenCalledTimes(1)
  })
  it('test custom event', () => {
    // wrapper.find('.btn-close').trigger('click')
    wrapper.vm.closeModal()

    console.log(wrapper.emitted(), 'zqj log')
    console.log(wrapper.emitted('close-modal'), 'zqj log')

    expect(wrapper.emitted('close-modal')).toHaveLength(1)
    expect(wrapper.emitted()['close-modal']).toHaveLength(1)
  })
  it('test custom event  by call', () => {
    const events = {}
    const $emit = (event, ...args) => (events[event] = args)

    ModalDemo.methods.closeModal.call({ $emit })

    expect(events['close-modal']).toHaveLength(2)
  })
  it('test custom event payload', async () => {
    await wrapper.find('.btn-close').trigger('click')

    expect(wrapper.emitted('close-modal')).toHaveLength(1)
    expect(wrapper.emitted('close-modal')[0]).toEqual(['hello', 'modal'])
  })
  it('test custom event payload 2', async () => {
    await wrapper.find('.btn-close').trigger('click')
    expect(wrapper.emitted('close-modal')).toHaveLength(1)
    expect(wrapper.emitted('close-modal')[0]).toEqual(['hello', 'modal'])
    // expect(wrapper.emitted('my-event')).toBeUndefined()
    expect(wrapper.emitted('my-event')[0]).toEqual([])
  })
})
