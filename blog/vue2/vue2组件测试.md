# vue2 组件测试

## 前端测试

软件测试：检查软件是否按照预期工作的过程。

测试分类：

从是否需要手动测试来分：

- 手动测试：需要人工操作，比如点击按钮，输入文字等。
- 自动测试：写代码测试其他代码，不需要人亲自手动测试每一个功能。

前端测试，从测试的范围来分：

1. 端到端测试

测试整个应用，从用户角度出发，**浏览器自动**测试整个应用是否按照预期工作。是自动执行的手动测试，加快手动测试的速度。

- 优点：测试全面，测试结果可靠。
- 缺点：① 测试速度慢 ② 调试困难 ③ 可能成为 flakey 测试 ④ 编写测试代码的成本高。

> flakey 测试：即使程序没有问题，测试也会失败。

2. 单元测试

对应用的小部分进行的测试。比如测试一个函数，一个组件等。

- 优点：① 测试速度快 ② 调试方便 ③ 编写测试代码的成本低 ④ 提供文档功能，可通过测试用例了解代码的行为 ⑤ 稳定，有助于重构。
- 缺点：测试范围小，测试结果不可靠。

> 重构：不改变代码的功能，但是改变代码的结构，目的是为了提高代码质量。

3. 快照测试

快照测试会给运行中的应用程序拍一张图片，并将其与以前保存的图片进行比较。如果图像不同，则测试失败。这种测试方法对确保应用程序代码变更后是否仍然可以正确渲染很有帮助。

各种测试在前端测试中的占比

![](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/front-end-test.png)

> 为何没有集成测试？

前端的集成测试，难以定义、编写和调试，通常认为端到端测试就是集成测试。

> 什么时候不需要自动化测试？

自动化测试的目的是为了节省时间和精力，**长期开发**的**规模较大**的项目自动化测试才会带来巨大的收益。如果项目只是一个小项目，或者是一个短期项目，那么自动化测试可能会带来负担，即编写测试代码会比直接编写应用代码更花时间。

实际上，在我的工作中，前端进行自动化测试的团队都很少，大部分都是手动测试。

> 不必追求 100% 的测试覆盖率

除非一个 bug 导致了严重的后果，比如损失几百万元，否则不必追求 100% 的测试覆盖率。因为测试代码也是需要维护的，测试代码的维护成本也是需要考虑的。

### 组件测试

组件有很多属性，决定测试哪些属性很重要，能帮助编写高效的测试代码。

> 如何决定测试哪些属性？

**组件的输入和输出**（有人叫组件契约或者组件接口）可帮助决定测试哪些属性。

从开发人员使用组件但又不了解组件具体实现的角度来编写测试，好的组件单元测试应该始终可触发一个输入，并断言一个输出。

常见的组件输入：

1. 用户操作，比如点击按钮，输入文字等；
2. props；
3. 组件事件；
4. vuex store 中的数据。

常见的输出：

1. 触发的事件；
2. 外部调用函数；
3. 渲染结果。

## vue 组件测试

### 第一个测试

已经存在一个使用`vue-cli`创建的项目，希望添加测试。

1. 安装 vue 测试插件：

```bash
vue add @vue/cli-plugin-unit-jest
```

2. 编写 HelloWorld.vue 组件：

安装完毕会自动配置测试环境，并创建了一个测试`HelloWorld.vue`的用例，但是项目里没有 HelloWorld.vue，在`tests/unit`就近新建一个。

```html
<script>
  export default {
    name: 'HelloWorld',
    props: {
      msg: {
        type: String,
        default: '',
      },
    },
    data() {
      return {}
    },
  }
</script>

<template>
  <div>{{ msg }}</div>
</template>
```

然后引入组件：

```js
import HelloWorld from './HelloWorld.vue'
```

3. 运行测试

执行`npm run test:unit`，测试环境是否配置成功。

> 可用性（sanity）测试

搭建测试系统的第一步是编写一个简单的测试来检查系统是否配置正确。这被称为**可用性（sanity）测试**。

在排查复杂问题或者配置环境时，可用性测试应该成为第一个测试用例，因为它能检查环境是否配置正确。

> 就近放置测试文件

将单元测试放置在尽可能接近被测代码的位置，会更容易被其他开发人员找到。

### 避免误报

误报：测试始终通过，但是实际上程序有 bug。

> 测试通过，是因为源代码按照预期工作，而不是编写始终通过测试的测试代码。

异步代码经常出现误报，因为测试代码没有等待异步代码执行完毕，就开始断言。

```js
test('始终通过的测试', () => {
  // TODO 如何编写 runner
  // runner.start()
  // setTimeout(() => {
  //   expect(runner.finished).toBe(true)
  // }, 1000)
})
```

### 如何组织测试代码

`describe`函数用于组织测试代码，describe 用于定义一组测试用例，每个测试用例都是一个`test`函数。

```js
describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    })
    expect(wrapper.text()).toMatch(msg)
  })
  test('始终通过的测试', () => {
    // TODO 如何编写 runner
    // runner.start()
    // setTimeout(() => {
    //   expect(runner.finished).toBe(true)
    // }, 1000)
  })
})
```

当运行测试时，会在控制台**格式化输出** describe 和 test 的一个参数，方便查看测试结果。

一个文件可写多个 describe，describe 可嵌套，

> 推荐的做法是一个文件只写一个 describe，describe 不嵌套。

否则会降低测试代码的可读性和新加的测试用例的不知道放在哪个 describe 里面。

> 测试代码和源代码挨近，方便他人查看。

### 挂载组件

vue 单文件组件经过编译后，是一个**有渲染函数的对象**，要测试组组件是否正确，需要开启渲染过程，这个过程称为挂载。

```js
new Vue({
  render: h => h(App),
}).$mount('#app')
```

使用`new`新建一个 vue 实例，然后调用`$mount`方法，传入一个 DOM 元素，vue 会将组件渲染到这个 DOM 元素中。

希望挂载组件，就需要将**组件对象**转成构造函数，组件对象无法直接挂载。

```js
const Ctor = Vue.extend(HelloWorld) // 使用 Vue.extend 将组件对象转成构造函数
const vm = new Ctor({
    propsData: { msg },
})
vm.$mount() // 挂载组件
expect(vm.$el.textContent).toMatch(msg)
```

> jest 在 jsdom 环境中运行，jsdom 是一个模拟浏览器环境的库，它提供了一些浏览器环境的全局变量，比如 window、document 等。
> 所以能直接挂载组件。

jsdom 实现了**大多数 DOM API**，它完全是由运行在 DOM 中的 JavaScript 编写。使用 jsdom 替代真正的浏览器可以使测试运行变得更快。

### vue-test-utils

手动挂载组件，代码量较多，vue-test-utils 提供了一些 API，方便测试 vue 组件。

mount 方法，该方法在接收一个组件后，会将其挂载并返回一个包含被挂载组件实例（vm）的**包装器对象**。

> 知道为什么 mount 不直返回 Vue 实例（vm）而是返回包装器?

mount 返回的包装器不仅包含 Vue 实例，还包括一些辅助方法，你可以使用它们来**设置 props**，**检查实例属性**以及**操作实例**。

常用的包装器方法：

1. text 方法：返回包装器的文本内容。
2. html 方法：返回包装器的 HTML 内容。
3. find 方法：返回包含指定选择器的第一个 DOM 元素的包装器。
4. findAll 方法：返回包含指定选择器的所有 DOM 元素的包装器。
5. setData 方法：设置组件的 data 属性。
6. setProps 方法：设置组件的 props 属性。
7. trigger 方法：触发指定的事件。
8. vm 属性：返回包装器的 Vue 实例。

shallowMount 方法，该方法与 mount 方法类似，但是它不会渲染组件的子组件。

### 如何调试测试用例

1. 在 chrome 浏览器调试

开启 jest 调试模式，新加一个脚本：

```bash
"test:debug": "node --inspect-brk node_modules/.bin/vue-cli-service test:unit",
```

<!-- TODO 没成功 https://weread.qq.com/web/reader/d013215071ff30aad01f5e4kd9d320f022ed9d4f495e456  -->

2. 在 vscode 中调试

### 测试组件输出

希望开发一个类似如下的通讯录组件：

![](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/contract-list.png)

每个卡片是一个人的信息，包括姓名、电话、职位、头像、社交账号。

1. 渲染文本

测试渲染文本，通常需要测试两种情况：

- 渲染文本是否包含某些文字，即测试内容；

`text()`

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

- 渲染文本是否正确德渲染在某些 DOM 内部，即测试位置。

需要查找 DOM，使用 `find` 方法，返回第一个匹配的节点。

```js
expect(wrapper.find('h1').text()).toMatch(msg)
```

希望名字渲染类为 header 的 div 中，测试用例：

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

2. DOM 属性

`attributes()`方法返回一个对象，包含 DOM 元素的所有属性。

```js
expect(wrapper.attributes('id')).toBe('app')
```

希望`props.twitter`设置到 a 标签的 href 属性上，`props.img`设置到 img 的 src 上。

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

3. 测试组件的数量

`findAll` 在渲染输出中搜索与选择器匹配的节点，并返回一个包含匹配节点的包装器的类数组对象。

`findAllComponents` 获取渲染的子组件。

`ContractList.spec.js`

```js
expect(wrapper.findAll('li').length).toBe(3)
expect(wrapper.findAll('li')).toHaveLength(10)
```

```js
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

> 用 toBeTruthy() 代替 toBe(true)

> 模拟最小环境的原则

通常在测试环境中，你需要将模拟数据传递给组件或函数。而在生产环境中，这个数据可能是具有许多属性的庞大对象。庞大对象使得测试更复杂难读，你应始终传递测试所需的最少数据。

4. 测试 props

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
  const richFriends = [
    {
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

> 最好别这样做，否则人家不知道的组件 props 到底是什么。

传递为声明的 prop，会怎样？

删除`ContractItem` 的 `city`，而仍然传递`city`，看看效果。

`it('测试 props')` 用例失败，提示 props 缺少 city。

![](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/no-prop.png)

> 多传递 prop 是一个陷阱，需要格外小心。

5. 测试 class

`classes` 返回组件根元素的 class，是一个数组。

可使用`toContain`断言某个 class 是否存在。

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

### 测试样式

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

### 何时测试组件的输出

测试代码应该遵循使用最小的代码来测试最小的功能的原则，即**测试代码应该尽可能简单**，再能覆盖所有功能的情况，用例要最少。

> 额外的测试代码会增加和源代码的耦合，增加维护成本。修改一处源代码，可能需要修改多处测试代码。这很需要经验和对源代码的理解。

测试组件的输出的原则：

- 仅测试动态输出，不测试静态输出；

比如，索引为 2 的组件，有一个为`item-2`的 class，就应该测试。

- 仅测试组件契约部分的输出。

## 测试组件的方法

方法包含为 Vue 组件添加功能的逻辑，并且这些逻辑需要被测试。测试自包含的方法并不复杂。但是现实世界的方法通常具有依赖项，而测试有依赖的方法，会引入一个更复杂的环境。

> 私有方法

在组件内部使用的方法，不应该被测试，因为它们不是组件的公共 API。

如下的 onClick 在组件内部调用，就是私有方法，因为单机组件内部的按钮才调用。

```html
<template>
  <button @click="onClick">按钮</button>
</template>
<script>
  export default {
    methods:{
      onClick(){
        console.log('click')
      }
    }
  }
</script>
```

私有方法是实现细节的，不测试。

### 测试公有方法

暴露给组件外部的方法，是组件的 API （组件契约），需要测试。

测试方法：调用方法，然后断言方法的返回值或者副作用是否符合预期。

```js
import { shallowMount } from '@vue/test-utils'

const Demo = {
  template: '<div>{{count}}</div>',
  data: () => ({
    count: 0,
  }),
  methods: {
    publicMethod() {
      this.count += 1
    },
  },
}
describe('Demo', () => {
  it('test public method', () => {
    const wrapper = shallowMount(Demo)
    wrapper.vm.publicMethod()
    expect(wrapper.vm.count).toBe(1)
    wrapper.vm.publicMethod()
    wrapper.vm.publicMethod()
    expect(wrapper.vm.count).toBe(3)
  })
})
```

> 测试方法的复杂性在于方法有依赖，比如定时器、网络请求等，需要模拟这些依赖。

### 测试定时器

定时器函数是实时运行的，这对于速度敏感的单元测试来说不是好消息，如果一个定时器函数需要 10 秒才能运行，那么测试就需要 10 秒才能完成，这太慢了。需要模拟这 10 秒的等待。

替换测试中现有的函数而创建的函数称为模拟函数。

jest 有假定时器，它可以模拟定时器函数的行为，而不是等待实际的时间。

> jest 对象是 Jest 在运行测试时添加的全局对象。jest 对象包括许多测试实用方法，如你在本章使用的假定时器。

用 runTimersToTime 推进假时间。

```js
it('test timer', () => {
  let count = 0
  jest.useFakeTimers()
  setInterval(() => {
    count += 1
  }, 1000)
  jest.advanceTimersByTime(1000)
  expect(count).toBe(1)
  jest.advanceTimersByTime(3000)
  expect(count).toBe(4)
})
```

上面的 Demo 组件加上一个 start ，每秒钟加 1。

```js
import { shallowMount } from '@vue/test-utils'

const Demo = {
  template: '<div>{{count}}</div>',
  data: () => ({
    count: 0,
    timer: null,
  }),
  methods: {
    start() {
      this.timer = setInterval(() => {
        this.count += 1
      }, 1000)
    },
  },
}
describe('Demo', () => {
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
    jest.useFakeTimers()
    wrapper.vm.start()
    jest.advanceTimersByTime(1000)
    expect(wrapper.vm.count).toBe(1)
    jest.advanceTimersByTime(2000)
    expect(wrapper.vm.count).toBe(3)
    jest.advanceTimersByTime(7000)
    expect(wrapper.vm.count).toBe(10)
  })
})
```

希望有一个 stop，停止定时器，测试用例：

```js
it('test stop', () => {
  const wrapper = shallowMount(Demo)
  jest.useFakeTimers()
  wrapper.vm.start()
  jest.advanceTimersByTime(1000)
  expect(wrapper.vm.count).toBe(1)
  wrapper.vm.stop()
  wrapper.vm.start() // 重新开始，再推进 3 秒
  jest.advanceTimersByTime(3000)
  expect(wrapper.vm.count).toBe(4)
})
```

Demo 组件：

```js
{
  // 其他代码
  stop() {
    clearInterval(this.timer)
  },
},
```

> 这个测试套件有多个测试用例，每个测试用例都需要使用假定时器，两个测试用例都需要使用假定时器，可以将`jest.useFakeTimers()`放在`describe`的 `beforeEach`里执行，**确保每次测试之前都复位**。

完整的代码

```js
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
```

> 把挂载组件的代码放在 beforeEach 里，可以避免重复代码，这里就不改了。

### 测试函数是否执行

希望添加一个 finish 函数，来重置 count，停止定时器。

```js
{
  finish(){
    this.count = 0
    this.stop()
  }
}
```

stop 方法，调用了`clearInterval`，接受一个参数，如何测试使用了某个参数调用了某个函数呢？

`sypOn` 可以监视函数的调用情况。

`setInterval.mockReturnValue('mockID')`，设置`setInterval`的返回值为`mockID`。

`toHaveBeenCalled`断言函数是否被调用。
`toHaveBeenCalledWith` 断言函数是否被调用，并且使用了指定的参数。

```js
it('test finish', () => {
  jest.spyOn(window, 'clearInterval')
  const timer = 10
  setInterval.mockReturnValue(timer)
  const wrapper = shallowMount(Demo)
  wrapper.vm.start()
  wrapper.vm.finish()
  expect(window.clearInterval).toHaveBeenCalled() // 断言函数是否被调用
  expect(window.clearInterval).toHaveBeenCalledTimes(1) // 断言函数被调用的次数
  expect(window.clearInterval).toHaveBeenCalledWith(timer) // 断言函数被调用，并且使用了指定的参数
})
```

Demo

```js
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
```

> 测试 clearInterval 被调用的方式，是在控制 finish 的具体实现了，意味着对 finish 的实现做了假设，如果 finish 的实现改变了，测试用例也要改变，测试代码很容易变得脆弱。

> 测试中假设越多，测试代码越脆弱。要保持测试代码的健壮性，需要尽可能少的假设。

改进测试 finish 的方法，不假设具体的实现，测试 finish 的副作用。

```js
it('better test finish', () => {
  const wrapper = shallowMount(Demo)
  wrapper.vm.start()
  jest.advanceTimersByTime(3000)
  expect(wrapper.vm.count).toBe(3)
  wrapper.vm.finish()
  expect(wrapper.vm.count).toBe(0)
})
```

> 无法 mock setInterval 可能是版本问题。[jest-using-jest-usefaketimers-not-working](https://stackoverflow.com/questions/68552571/attempting-to-mock-setinterval-in-jest-using-jest-usefaketimers-not-working)

### 测试 Vue 原型上的属性

开发中常常会在 Vue 的原型上添加属性和方法，比如 axios，希望测试这些属性和方法。就可以在挂载组件时，模拟原型的属性。

```js
shallowMount(VueComponent,{
  mocks:{
    $bar:{
      start(){}
    }
  }
})
```

下面就是测试 `$bar.start` 是否被调用。

需要测试函数是否被调用，那么可使用能记录自身调用信息的模拟函数。

```js
const mock = function(...rest){
  mock.calls.push(rest)
}
mock.calls = []
mock(1)
mock(2,3)
mock.calls // [[1],[2,3]]
```

jest 提供了更加强大的模拟函数。

```js
const fnMock = jest.fn()
fnMock('a', 'b')
fnMock('c', 'd')
expect(fnMock.mock.calls).toEqual([
  ['a', 'b'],
  ['c', 'd'],
])
expect(fnMock).toHaveBeenCalledTimes(2)
```

> 在底层实现中，jest.spyOn 和 jest.useFakeTimers 都使用了 jest.fn()。

```js
const VueDemo = {
  template: '<div>{{count}}</div>',
  data: () => ({}),
  methods: {},
  mounted() {
    this.$bar.start()
  },
}
```

`this.$bar.start`是原型的方法，组件挂载时调用，要如何测试呢？

希望测试原型上的属性和方法，引入 Vue 的原型，就让测试变得负责了，而是希望在 VueDemo 组件挂载时，模拟出原型的属性和方法。

shallowMount 函数的第二个参数的选项`mocks`提供了这个功能。

```js
describe('mock ', () => {
  it('calls $bar.start on mounted', () => {
    const $bar = {
      start: jest.fn(),
      finish: () => {},
    }
    shallowMount(VueDemo, { mocks: { $bar } })
    expect($bar.start).toHaveBeenCalled()
    expect($bar.start).toHaveBeenCalledTimes(1)
  })
})
```

> 在 VueDemo 挂载时，调用了 $bar.start 用例通过测试。

### 测试生命周期钩子中调用的函数

没有找到官方的资料，哎，只能自己摸索了。

[HOW TO MOCK LIFECYCLE HOOKS WITH VUE-TEST-UTILS-VUE.JS](https://www.appsloveworld.com/vuejs/100/8/how-to-mock-lifecycle-hooks-with-vue-test-utils)

[Unable to mock lifecycle hooks ](https://github.com/vuejs/vue-test-utils/issues/166)

[Add lifecycle hooks mocking](https://github.com/vuejs/vue-test-utils/pull/167)

## 参考

[Jest 单元测试环境搭建](https://www.aligoogle.net/pages/343eae/#%E4%B8%80-%E4%BE%9D%E8%B5%96%E8%AF%B4%E6%98%8E)

[Vue.js unit test cases with vue-test-utils and Jest](https://blog.octo.com/vue-js-unit-test-cases-with-vue-test-utils-and-jest/)

[Unit Testing Vue Lifecycle Methods](https://grozav.com/unit-testing-vue-lifecycle-methods/)

[](https://mayashavin.com/articles/testing-components-with-vitest)

[](https://blog.logrocket.com/guide-vitest-automated-testing-vue-components/)

[](https://vueschool.io/lessons/learn-how-to-test-vuejs-lifecycle-methods)

[](https://blog.canopas.com/vue-3-component-testing-with-jest-8b80a8a8946b)

[Guide to Unit Testing Vue Components](https://testdriven.io/blog/vue-unit-testing/)

[All Vue Content](https://fjolt.com/category/vue)
