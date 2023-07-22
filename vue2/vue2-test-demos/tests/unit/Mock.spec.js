/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-22 17:57:30
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-22 18:31:49
 * @Description : 测试原型上的方法
 */
import { shallowMount } from '@vue/test-utils'

const CallVuePrototypePropDemo = {
  template: '<div>{{count}}</div>',
  data: () => ({}),
  methods: {},
  mounted() {
    this.$bar.start()
  },
}
describe('CallVuePrototypePropDemo.vue', () => {
  it('calls $bar.start on mounted', () => {
    const $bar = {
      start: jest.fn(),
      finish: () => {},
    }
    shallowMount(CallVuePrototypePropDemo, { mocks: { $bar } })
    expect($bar.start).toHaveBeenCalled()
    expect($bar.start).toHaveBeenCalledTimes(1)
  })
})