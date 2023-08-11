/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-23 01:40:03
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-11 10:30:04
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
  let wrapper = null
  beforeEach(() => {
    jest.useFakeTimers('legacy')
    wrapper = shallowMount(CounterDemo)
  })
  it('test call start when mounted', () => {
    expect(wrapper.vm.timer).not.toBeNull()

    jest.advanceTimersByTime(1000)
    expect(wrapper.vm.count).toBe(1)

    jest.advanceTimersByTime(9_000)
    expect(wrapper.vm.count).toBe(10)
  })
  it('test call stop when destroy', () => {
    // works well ✅
    jest.spyOn(wrapper.vm, 'stop')

    wrapper.destroy()

    expect(wrapper.vm.stop).toHaveBeenCalledTimes(1)
  })
})
