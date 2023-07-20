/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-20 19:28:34
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-20 20:18:29
 * @Description :
 */
import { shallowMount } from '@vue/test-utils'
import ContractItem from './ContractItem.vue'

describe('ContractItem.vue', () => {
  const propsData = {
    name: '马云',
    city: '杭州',
    img: 'https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/ma-yun.png',
    phone: '123456789',
    position: 'CEO',
    company: '阿里巴巴',
    twitter: 'https://twitter.com/jack-ma',
  }
  it('测试渲染文本', () => {
    const wrapper = shallowMount(ContractItem, {
      propsData,
    })

    expect(wrapper.text()).toMatch(propsData.name)
    expect(wrapper.text()).toMatch(propsData.city)
    expect(wrapper.text()).toMatch(propsData.phone)
    expect(wrapper.text()).toMatch(propsData.position)
    // expect(wrapper.text()).toContain(value)
  })
  it('测试 props.name 的位置', () => {
    const wrapper = shallowMount(ContractItem, {
      propsData,
    })
    expect(wrapper.find('.header').text()).toMatch(propsData.name)
  })
  it('props.twitter should be a href', () => {
    const wrapper = shallowMount(ContractItem, {
      propsData,
    })
    expect(wrapper.find('a').attributes('href')).toBe(propsData.twitter)
  })
  it('props.img should be img src', () => {
    const wrapper = shallowMount(ContractItem, {
      propsData,
    })
    expect(wrapper.find('.header').find('img').attributes('src')).toBe(propsData.img)
  })
})
