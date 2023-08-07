/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-07 15:37:07
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-07 17:28:39
 * @Description :
 */
import { describe, it, expect } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import SquareButton from './SquareButton.vue'

describe('SquareButton', () => {
  it('custom events -- @squared', async () => {
    const wrapper = shallowMount(SquareButton)

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('squared')
    expect(wrapper.emitted().squared[0]).toEqual([100])
  })
  it('custom events -- @squared--payload', async () => {
    const count = 100
    // https://github.com/vuejs/test-utils/issues/539
    // 使用 setup  封装的组件，无法在挂载时传递时设置 data 和 使用 setData
    // const wrapper = shallowMount(SquareButton, {
    //   data: () => {
    //     return {
    //       count
    //     }
    //   }
    // })
    const wrapper = shallowMount(SquareButton)
    // console.log(wrapper.vm)
    // NOTE 可以这样设置，但是不推荐在外部改变组件内部 state
    wrapper.vm.count = 100

    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted().squared[0]).toEqual([count * count])
  })
})
