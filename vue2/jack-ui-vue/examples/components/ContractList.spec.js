/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-20 19:28:34
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-20 20:57:08
 * @Description :
 */
import { shallowMount } from '@vue/test-utils'
import ContractList from './ContractList.vue'
import ContractItem from './ContractItem.vue'

describe('ContractList.vue', () => {
  const richFriends = [
    {
      name: '马爸爸',
      city: '杭州',
      img: 'https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/ma-yun.png',
      phone: '123456789',
      position: 'CEO',
      company: '阿里巴巴',
      twitter: 'https://twitter.com/jack-ma',
      // fortune: '400亿美元',
    },
    {
      name: '麻花藤',
      city: '深圳',
      img: 'https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/pony-ma.png',
      phone: '99988123',
      position: 'CTO',
      company: '腾讯',
      twitter: 'https://twitter.com/pony-ma',
      // fortune: '600亿美元',
    },
  ]
  it("ContractItem's size", () => {
    const wrapper = shallowMount(ContractList, {
      propsData: {
        persons: richFriends,
      },
    })
    expect(wrapper.findAllComponents(ContractItem)).toHaveLength(richFriends.length)
  })
  it('测试 props', () => {
    const wrapper = shallowMount(ContractList, {
      propsData: {
        persons: richFriends,
      },
    })
    const items = wrapper.findAllComponents(ContractItem)
    items.wrappers.forEach((wrapper, index) => {
      // console.log(wrapper.props())
      expect(wrapper.props()).toEqual(richFriends[index])
    })
  })
})
