# 测试 vue 组件输出

[[toc]]

希望开发一个类似如下的通讯录组件：

![](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/contract-list.png)

每个卡片是一个人的信息，包括姓名、电话、职位、头像、社交账号。

对组件进行测试，**提供输入，这里是props**，**测试输出**，这里是 DOM 结构。

## 测试渲染文本

测试渲染文本，通常需要测试两种情况：

* 渲染文本**是否包含某些文字**，即**测试内容**；

`text()` --- 包装器方法，返回节点的文本内容。

然后使用以下匹配器进行断言：

```js
toMatch(msg)
toBe(msg)
toEqual(msg)
toContain(msg)
```

测试用例

 `ContractItem.spec.js`

```js
describe('ContractItem.vue', () => {
  it('测试渲染文本', () => {
    const propsData = {
      name: '马云',
      city: '杭州',
      img: 'https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/ma-yun.png',
      phone: '123456789',
      position: 'CEO',
      company: '阿里巴巴',
      twitter: 'https://twitter.com/jack-ma',
    }
    const wrapper = shallowMount(ContractItem, {
      propsData,
    })

    expect(wrapper.text()).toMatch(propsData.name)
    expect(wrapper.text()).toMatch(propsData.city)
    expect(wrapper.text()).toMatch(propsData.phone)
    expect(wrapper.text()).toMatch(propsData.position)
    // expect(wrapper.text()).toContain(value)
  })
})
```

> shallowMount、mount 的第二个参数是一个对象 propsData，用于传递 props。

> wrapper 的 [setProps](https://v1.test-utils.vuejs.org/api/wrapper-array/#setprops) 也能指定 props。

* 渲染文本是否正确地渲染在某些 DOM 内部，即**测试位置**。

需要查找 DOM，使用 `find` 方法，返回第一个匹配的节点。

```js
expect(wrapper.find('h1').text()).toMatch(msg)
```

希望名字渲染在类为 header 的 div 中，测试用例：

```js
  it('测试 name 的位置', () => {
    const propsData = {
      name: '马云',
      city: '杭州',
      img: 'https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/ma-yun.png',
      phone: '123456789',
      position: 'CEO',
      company: '阿里巴巴',
      twitter: 'https://twitter.com/jack-ma',
    }
    const wrapper = shallowMount(ContractItem, {
      propsData,
    })

    expect(wrapper.find('.header').text()).toMatch(propsData.name)
  })
```

在个用例中用到了前一个用力 propsData，可以将其提取出来，放在 describe 中。

```js
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
  it('测试 name 的位置', () => {
    const wrapper = shallowMount(ContractItem, {
      propsData,
    })

    expect(wrapper.find('.header').text()).toMatch(propsData.name)
  })
})
```

## 测试 DOM 属性

`attributes()` 方法返回一个对象，包含 DOM 元素的所有属性。

```js
expect(wrapper.attributes('id')).toBe('app')
```

希望 `props.twitter` 设置到 a 标签的 href 属性上， `props.img` 设置到 img 的 src 上。

```js
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
```

## 测试子组件的数量

`findAll` 在渲染输出中搜索与选择器匹配的节点，并返回一个包含匹配节点的包装器的类数组对象。

`findAllComponents` 获取渲染的子组件。

 `ContractList.spec.js`

```js
expect(wrapper.findAll('li').length).toBe(3)
expect(wrapper.findAll('li')).toHaveLength(10)
```

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
    },
    {
      name: '麻花藤',
      city: '深圳',
      img: 'https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/pony-ma.png',
      phone: '99988123',
      position: 'CTO',
      company: '腾讯',
      twitter: 'https://twitter.com/pony-ma',
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
})
```

> 让断言失败时，输出更多信息的技巧

用例失败时，希望输出的信息足够具体，便于排查问题，如何让断言失败时，输出更多信息？

少用 Boolean 断言，因为 Boolean 断言失败时，输出的信息只有一个 true 或者 false。

> 用 toBeTruthy() 代替 toBe(true)，或者使用其他非 Boolean 断言。

比如 `except(wrapper.attributes().href===someValue).toBe(true)` , 当测试用例失败时，无法查看 href 的具体值，对排查问题不友好。改成这个断言，失败时会有更加的具体的信息。

 `except(wrapper.attributes().href).toBe(someValue)`

> 模拟最小环境的原则

通常在测试环境中，需要将**模拟数据**传递给组件或函数。而在生产环境中，这个数据可能是具有许多属性的庞大对象。庞大对象使得测试更复杂难读，你应始终传递测试所需的最少数据。

## 测试 props

希望 ContractList 里的 ContractItem 都正确渲染 props。

`props` 是包装器的一个方法，返回一个对象，包含组件的 props。

```js
  it('测试 props', () => {
    const wrapper = shallowMount(ContractList, {
      propsData: {
        persons: richFriends,
      },
    })

    const items = wrapper.findAllComponents(ContractItem)

    items.wrappers.forEach((wrapper, index) => {
      expect(wrapper.props()).toEqual(richFriends[index])
    })
  })
```

如果 props 多传一个字段，但是组件上不用呢？

```js
describe('ContractList.vue', () => {
  const richFriends = [{
      name: '马爸爸',
      city: '杭州',
      img: 'https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/ma-yun.png',
      phone: '123456789',
      position: 'CEO',
      company: '阿里巴巴',
      twitter: 'https://twitter.com/jack-ma',
      fortune: '400亿美元', // 多余的字段
    },
    {
      name: '麻花藤',
      city: '深圳',
      img: 'https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/pony-ma.png',
      phone: '99988123',
      position: 'CTO',
      company: '腾讯',
      twitter: 'https://twitter.com/pony-ma',
      fortune: '600亿美元',
    },
  ]
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
```

增加一个 fortune 字段，但是组件上没有用到，测试用例不通过，如何修改断言让它通过呢？

> 最好别这样做，否则你的队友不知道组件 props 到底是什么。

传递未声明的 prop，会怎样？

删除 `ContractItem` 的 `city` ，而仍然传递 `city` ，运行测试。

`it('测试 props')` 用例失败，提示 props 缺少 city。

![](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/no-prop.png)

> 多传递 prop 是一个陷阱，需要格外小心。

## 测试计算属性

有一个组件 `NumberRenderer.vue` ，传递 `props.even` 为true，渲染 `2,4,6` ，否则渲染 `1,3,5` ，默认为 false，用例 `NumberRenderer.spec.js` 如下：

```js
describe('NumberRenderer', () => {
  it('when no props,should render 1,3,5', () => {
    const wrapper = shallowMount(NumberRenderer)

    expect(wrapper.text()).toMatch('1,3,5')
  })
  it('when props.even is true,should render 2,4,6', () => {
    const wrapper = shallowMount(NumberRenderer, {
      propsData: {
        even: true,
      },
    })

    expect(wrapper.text()).toMatch('2,4,6')
  })
})
```

组件 `NumberRenderer.vue` 如下：

```HTML
<template>
  <span>{{ numbers }}</span>
</template>

<script>
  export default {
    name: 'NumberRenderer',
    props: {
      even: {
        type: Boolean,
        required: false
      }
    },
    computed: {
      numbers() {
        let i = 0
        const evens = []
        const odds = []
        while (i <= 6) {
          if (i % 2 === 0) {
            evens.push(i)
          } else {
            odds.push(i)
          }
          i++
        }
        return this.even ? evens.join(',') : odds.join(',')
      }
    }
  };
</script>
```

测试 `props.even` 为 false 的情况，用例如下：

```js
it('when props.even is false,should render 1,3,5', () => {
  const localThis = {
    even: false
  }

  expect(NumberRenderer.computed.numbers.call(localThis)).toMatch('1,3,5')
})
```

> 没有挂载组件，直接测试计算属性。 使用 `call` 方法，传递一个对象，作为 `this` ，这样就可以测试计算属性了。

> call vs shallowMount 

使用 call:

1. 组件中有耗时的操作，比如在 `mounted` 钩子中发起网络请求，或者在 `created` 钩子中执行复杂的计算。
2. 移除一些值，只测试计算属性和它的依赖。

使用 shallowMount:

1. 测试组件的渲染结果。
2. 测试组件的交互行为。

## 测试 class

`classes` 返回组件根元素的 class，是一个数组。

可使用 `toContain` 断言某个 class 是否存在。

```js
it('should contain contract-list class in root ele', () => {
  const wrapper = shallowMount(ContractList, {
    propsData: {
      persons: richFriends,
    },
  })

  expect(wrapper.classes()).toContain('contract-list')
})
```

> toContain 可用于数组和字符串。

## 测试样式

静态的样式不需要测试，因为它们不会改变，但是动态的样式需要测试。

样式往往需要手动测试。

1. 测试内联样式

直接获取 DOM 元素的 style 属性，然后断言。

每个包装器都包含一个 element 属性，它是对包装器包含的 DOM **根节点**的引用。

```js
it('test inline style', () => {
  const wrapper = shallowMount(ContractList, {
    propsData: {
      persons: richFriends,
    },
  })
  // expect(wrapper.attributes('style')).toBe('color: red;')
  expect(wrapper.element.style.color).toBe('red')
})
```

> attributes('style') 返回的是字符串，element.style 返回的是对象。

测试非根元素的内联样式，需要使用 find 或者 findComponent 方法。

```js
it('test inline style', () => {
  const wrapper = shallowMount(ContractList, {
    propsData: {
      persons: richFriends,
    },
  })
  expect(wrapper.find('h1').element.style.color).toBe('red')
})
```

> **只有**元素**有内联样式**，使用 `dom.style` 才能获取到 DOM 的样式属性，否则所有样式属性值为 `''` 。

## 何时测试组件的输出

测试代码应该遵循使用最小的代码来测试最小的功能的原则，即**测试代码应该尽可能简单**，再能覆盖所有功能的情况，用例要最少。

> 额外的测试代码会增加和源代码的耦合，增加维护成本。修改一处源代码，可能需要修改多处测试代码。这很需要经验和对源代码的理解。

测试组件的输出的原则：

* 仅测试动态输出，不测试静态输出；

比如，索引为 2 的组件，有一个为 `item-2` 的 class，就应该测试。

* 仅测试组件契约部分的输出

测试内容是契约的一部分，那么牺牲代码的耦合性也是值得的。

## 小结

1. vue-test-uitls 提供的方法，text、attributes、props、class 等可测试组件渲染文本、DOM 属性，props 和样式。

2. find 和 findAll 用于查找元素。

3. findComponent 和 findAllComponents 用于查找子组件。

4. 测试最小原则：仅测试动态内容和组件契约的输出，以减少代码耦合度和工作量。

5. 尽可能避免使用 toBe(Boolean)断言，因为它在测试失败时，无法给出明确的错误信息。
