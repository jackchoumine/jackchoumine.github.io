/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-21 10:47:25
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-22 11:34:21
 * @Description : 测试共有方法
 */

import { shallowMount } from '@vue/test-utils'

const Demo = {
  template: '<div>{{count}}</div>',
  data: () => ({
    count: 0,
    timer: null,
  }),
  methods: {
    publicMethod() {
      this.count += 1
    },
    start() {
      this.timer = setInterval(() => {
        this.count += 1
      }, 1000)
    },
    stop() {
      clearInterval(this.timer)
      this.timer = null
    },
    finish() {
      this.count = 0
      this.stop()
    },
  },
}
describe('Demo', () => {
  beforeEach(() => {
    jest.useFakeTimers('legacy')
  })
  it('test public method', () => {
    const wrapper = shallowMount(Demo)
    wrapper.vm.publicMethod()
    expect(wrapper.vm.count).toBe(1)
    wrapper.vm.publicMethod()
    wrapper.vm.publicMethod()
    expect(wrapper.vm.count).toBe(3)
  })
  it('test start', () => {
    const wrapper = shallowMount(Demo)
    wrapper.vm.start()
    jest.advanceTimersByTime(1000)
    expect(wrapper.vm.count).toBe(1)
    jest.advanceTimersByTime(2000)
    expect(wrapper.vm.count).toBe(3)
    jest.advanceTimersByTime(7000)
    expect(wrapper.vm.count).toBe(10)
  })
  it('test stop', () => {
    const wrapper = shallowMount(Demo)
    wrapper.vm.start()
    jest.advanceTimersByTime(1000)
    expect(wrapper.vm.count).toBe(1)
    wrapper.vm.stop()
    wrapper.vm.start()
    jest.advanceTimersByTime(3000)
    expect(wrapper.vm.count).toBe(4)
  })
  it('test finish', () => {
    jest.spyOn(window, 'clearInterval')
    // TODO 无法 mock setInterval 可能是版本问题
    // https://stackoverflow.com/questions/68552571/attempting-to-mock-setinterval-in-jest-using-jest-usefaketimers-not-working
    const timer = 10
    setInterval.mockReturnValue(timer)
    const wrapper = shallowMount(Demo)
    wrapper.vm.start()
    wrapper.vm.finish()
    expect(window.clearInterval).toHaveBeenCalled()
    expect(window.clearInterval).toHaveBeenCalledTimes(1)
    expect(window.clearInterval).toHaveBeenCalledWith(timer)
  })
  it('better test finish', () => {
    const wrapper = shallowMount(Demo)
    wrapper.vm.start()
    jest.advanceTimersByTime(3000)
    expect(wrapper.vm.count).toBe(3)
    wrapper.vm.finish()
    expect(wrapper.vm.count).toBe(0)
  })
})
