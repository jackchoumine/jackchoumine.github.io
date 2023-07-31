# 更好地组织测试代码

随着测试用例的增加，你会发现存在很多重复代码，避免这种情况的方法之一就是使用工厂函数（factory function）。

> 工厂函数：执行时返回新对象或者新实例的函数。

工厂函数可让让代码易于阅读和理解，是一种常见的代码组织**模式**。

本文将介绍如何使用工厂函数来组织测试代码，以减少重复，以及如何更好的组织代码。

## 1. 重复代码

`ContractList.vue` 的测试用例如下：

```js
import {
  shallowMount
} from '@vue/test-utils'
import ContractList from './ContractList.vue'
import ContractItem from './ContractItem.vue'

describe('ContractList.vue', () => {
  const richFriends = [{
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
  it('should contain contract-list class in root ele', () => {
    const wrapper = shallowMount(ContractList, {
      propsData: {
        persons: richFriends,
      },
    })
    expect(wrapper.classes()).toContain('contract-list')
  })
  it('test inline style', () => {
    const wrapper = shallowMount(ContractList, {
      propsData: {
        persons: richFriends,
      },
    })
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
```

你会发现，每个用例在断言之前，我们都需要挂载组件，创建一个 `wrapper` 。

可将这部分代码提取成工厂函数：

```JS
function createWrapper(propsData = {
  persons: richFriends
}) {
  return shallowMount(ContractList, {
    propsData,
  })
}
```

重构后的测试用例如下：

```js
import {
  shallowMount
} from '@vue/test-utils'
import ContractList from './ContractList.vue'
import ContractItem from './ContractItem.vue'

describe('ContractList.vue', () => {
  const richFriends = [{
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

  function createWrapper(
    propsData = {
      persons: richFriends,
    }
  ) {
    return shallowMount(ContractList, {
      propsData,
    })
  }
  it("ContractItem's size", () => {
    const wrapper = createWrapper()
    expect(wrapper.findAllComponents(ContractItem)).toHaveLength(richFriends.length)
  })
  it('测试 props', () => {
    const wrapper = createWrapper()
    const items = wrapper.findAllComponents(ContractItem)
    items.wrappers.forEach((wrapper, index) => {
      expect(wrapper.props()).toEqual(richFriends[index])
    })
  })
  it('should contain contract-list class in root ele', () => {
    const wrapper = createWrapper()
    expect(wrapper.classes()).toContain('contract-list')
  })
  it('test inline style', () => {
    const wrapper = createWrapper()
    expect(wrapper.element.style.color).toBe('red')
    expect(wrapper.findComponent(ContractItem).element.style['margin-bottom']).toBe(
      '20px'
    )
  })
})
```

使用工厂函数的两大好处：
* 减少重复代码，`DRY(Don't repeat yourself)`是编写代码的编程原则
* 提供了一种可沿用的模式

通过重构，把重复创建包装起的代码放在了工厂函数中，保证了代码的简洁和可读性。

> DRY原则：多次编写**相似**或者**相同**的代码，应该把这些代码抽取出来，放在一个函数或文件中，以便复用，而不是在各个地方重复编写。

## 沿用相同的模式提高代码的质量

在编写测试时，大部分人不考虑代码模式。但是，随着测试用例越来越多，同一份代码被不同的人修改后，代码很快变得乱成一团，难以维护。

> 规模较大的开发人员流动性大的或者维护周期长的项目，非常容易出现这种情况，代码质量会越来越差，最终导致项目维护不下去。为了避免这种问题，除了遵循相同的代码规范外，沿用相同的模式也是一种有效的方法。

通常，大型代码库都会出现计划外的模式，这些模式可能是由于开发人员的个人喜好，也可能是由于项目的历史原因。这些模式会导致代码难以理解，也会导致代码质量下降。

起先，某个函数的参数只有2个，某天，一个开发A，希望增加一个参数a, 但是，另一个开发B，希望增加一个参数b。

```js
function foo(msg, age， a, b) {
  // ...
}
```

慢慢地，foo 函数的参数越来越多，10个参数，15个参数，导致代码难以理解，也会导致代码质量下降。

> 我在最近的项目中，看到同一个人写的函数，使用了 12 个参数，我那时的心情就是想骂娘。

> 不沿用相同的模式，每个人就会创造自己的模式，代码质量就会越来越差，甚至差到无法维护，也就是所谓的 `代码腐化` 。

上面的测试用中，在每个测试用例执行之前，都是创建了一个 `wrapper` ，其实可以在 `beforeEach` 中创建 `wrapper` ，这样可以避免重调用工厂函数。

```js
/* eslint-disable quotes */
import {
  shallowMount
} from '@vue/test-utils'
import ContractList from './ContractList.vue'
import ContractItem from './ContractItem.vue'

describe('ContractList.vue', () => {
  const richFriends = [{
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

  function createWrapper(
    propsData = {
      persons: richFriends,
    }
  ) {
    return shallowMount(ContractList, {
      propsData,
    })
  }
  let wrapper = null
  beforeEach(() => {
    wrapper = createWrapper()
  })
  it("ContractItem's size", () => {
    expect(wrapper.findAllComponents(ContractItem)).toHaveLength(richFriends.length)
  })
  it('测试 props', () => {
    const items = wrapper.findAllComponents(ContractItem)
    items.wrappers.forEach((wrapper, index) => {
      expect(wrapper.props()).toEqual(richFriends[index])
    })
  })
  it('should contain contract-list class in root ele', () => {
    expect(wrapper.classes()).toContain('contract-list')
  })
  it('test inline style', () => {
    expect(wrapper.element.style.color).toBe('red')
    expect(wrapper.findComponent(ContractItem).element.style['margin-bottom']).toBe(
      '20px'
    )
  })
})
```

> beforeEach 会在每个测试用例执行之前执行。

<!-- TODO 其他常见的钩子 -->

## 工厂函数的缺点

不管是工厂函数还是beforeEach，为了减少重复代码，都对代码进行了封装和抽象，虽然维护性增加了，但是可理解性却下降了。新来的开发人员可能难以理解这些代码，除非他深入到代码中。

> 通常情况下，代码的封装和抽象程度越高，复用和维护性越好，但是可理解性越差，这是一个矛盾的问题。好的设计或者经常需要修改的代码，应该要很好的平衡这个矛盾。
