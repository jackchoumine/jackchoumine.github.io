/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-10 08:55:51
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-10 11:24:11
 * @Description :
 */
import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Foo from './Foo.vue'

jest.mock('axios')

describe('Foo.vue', () => {
  it('fetches async when a button is clicked', async () => {
    const wrapper = shallowMount(Foo)

    // await
    wrapper.find('button').trigger('click')

    await flushPromises()

    expect(wrapper.text()).toBe('value')
  })
})
