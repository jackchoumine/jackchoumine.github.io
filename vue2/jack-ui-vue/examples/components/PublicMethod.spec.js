/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-21 10:47:25
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-23 00:55:57
 * @Description : 测试公有方法
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
    },
  },
}
describe('Demo', () => {
  beforeEach(() => {
    jest.useFakeTimers()
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
})
