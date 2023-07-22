/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-23 01:40:03
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-23 02:55:42
 * @Description : 测试在生命周期中调用的方法
 */
import { shallowMount } from '@vue/test-utils'

const CounterDemo = {
  template: '<div>{{count}}</div>',
  data: () => ({
    count: 0,
    timer: null,
  }),
  mounted() {
    this.start()
  },
  destroyed() {
    this.stop()
  },
  methods: {
    start() {
      this.timer = setInterval(() => {
        this.count += 1
      }, 1000)
    },
    stop() {
      clearInterval(this.timer)
    },
  },
}
describe('CounterDemo', () => {
  it('测试 mounted', () => {
    const wrapper = shallowMount(CounterDemo)
    // expect(wrapper.vm.start).not.toHaveBeenCalled()
    jest.spyOn(wrapper.vm, 'stop')
    wrapper.destroy()
    expect(wrapper.vm.stop).toHaveBeenCalledTimes(1)
  })
})
