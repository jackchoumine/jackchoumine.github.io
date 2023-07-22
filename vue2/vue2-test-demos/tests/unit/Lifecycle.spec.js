/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-23 01:40:03
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-23 04:08:11
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
  // it('test call start when mounted', () => {
  //   // Matcher error: received value must be a mock or spy function ❌
  //   jest.spyOn(CounterDemo.methods, 'start')
  //   const wrapper = shallowMount(CounterDemo)
  //   expect(wrapper.vm.start).toHaveBeenCalledTimes(1)
  // })
  let wrapper = null
  beforeEach(() => {
    wrapper = shallowMount(CounterDemo, {
      methods: {
        mounted: CounterDemo.mounted,
      },
    })
  })
  it('test call start when mounted', () => {
    jest.spyOn(wrapper.vm, 'start')
    wrapper.vm.mounted()
    expect(wrapper.vm.start).toHaveBeenCalledTimes(1)
  })
  it('test call stop when destroy', () => {
    // works well ✅
    const wrapper = shallowMount(CounterDemo)
    jest.spyOn(wrapper.vm, 'stop')
    wrapper.destroy()
    expect(wrapper.vm.stop).toHaveBeenCalledTimes(1)
  })
})
