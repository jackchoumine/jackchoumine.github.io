/* eslint-disable quotes */
/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-20 19:28:34
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-03 00:14:34
 * @Description :
 */
import { shallowMount, createLocalVue } from '@vue/test-utils'
import ContractList from './ContractList.vue'
import ContractItem from './ContractItem.vue'
import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)
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
  /**
   * 
   propsData = {
      persons: richFriends,
    }
   */
  function createWrapper({ store } = {}) {
    return shallowMount(ContractList, {
      // propsData,
      localVue,
      store,
    })
  }
  let wrapper = null
  let storeConfig = null
  let store = null
  beforeEach(() => {
    storeConfig = {
      getters: {
        persons: jest.fn(() => richFriends),
      },
      actions: {
        fetchPersons: jest.fn(),
      },
    }
    store = new Vuex.Store(storeConfig)
    wrapper = createWrapper({ store })
  })
  it("ContractItem's size", () => {
    // 这样不行
    // storeConfig.getters.persons.mockReturnValue(richFriends)
    expect(wrapper.findAllComponents(ContractItem)).toHaveLength(richFriends.length)
  })
  // it("ContractItem's actions", () => {
  //   // 这样不行
  //   // storeConfig.getters.persons.mockReturnValue(richFriends)
  //   expect(wrapper.findAllComponents(ContractItem)).toHaveLength(richFriends.length)
  // })
  it('测试 props', () => {
    const items = wrapper.findAllComponents(ContractItem)
    items.wrappers.forEach((wrapper, index) => {
      // console.log(wrapper.props())
      expect(wrapper.props()).toEqual(richFriends[index])
    })
  })
  it('should contain contract-list class in root ele', () => {
    expect(wrapper.classes()).toContain('contract-list')
  })
  it('test inline style', () => {
    // expect(wrapper.attributes('style')).toBe('color: red;')
    expect(wrapper.element.style.color).toBe('red')
    // console.log(
    //   wrapper.findComponent(ContractItem).element.style['margin-bottom'],
    //   'zqj log'
    // )
    // expect(wrapper.find(ContractItem).element.style['margin-bottom']).toBe('20px')
    expect(wrapper.findComponent(ContractItem).element.style['margin-bottom']).toBe(
      '20px'
    )
  })
})
