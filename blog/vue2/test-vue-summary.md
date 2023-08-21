# vue2 组件测试总结

自动化测试可防止意外引入 BUG，提高代码质量，减少重复工作，并鼓励编写可测试、可维护和可扩展的代码。

> 何时测试？

越早越好。根据经验，很多公司并不要求前端进行自动化测试，因为业务往往频繁变化，导致代码变化很快，此时编写测试，工作量大收益低，但是在封装通用的组件或者组件库时，测试是必不可少的。

> 测试类型

单元测试：检测函数、类或者模块的输入是否生产预期的输出和副作用。

组件测试：检测组件是否渲染正确，用户交互是否正确，异步代码是否正确执行，是特殊的单元测试。

集成测试：检测多个组件是否正确地协同工作。

端到端测试：检测整个应用是否正确工作，要按照用户使用软件的**实际方式**(实际的环境、实际的交互、实际的数据)，检测应用的功能是否符合预期，会涉及到数据库和后端。

> 不追求 100%覆盖率

对 UI 组件的测试，不追求 100% 的覆盖率，否则会导致测试代码的维护成本过高(测试代码的维护成本往往比实现代码的维护成本高)。

> 测试中的模拟

模拟是测试中的重要概念，模拟是一种测试技术，用于在测试中替换或模拟依赖项，以便在测试中对其进行控制，保证测试代码的健壮。模拟可以是手动的，也可以是自动的。比如模拟定时器、http 接口。**模拟越少越好，因为模拟越多，对实现细节的假设越多，当实现发生变化，测试用例就很可能失败。测试越接近用户的使用方式，测试越能给人信心。**

## 组件测试应该测试什么？

从粒度的角度来看，组件测试位于单元测试之上，可以被认为是集成测试的一种形式。Vue 应用中大部分内容都应该由组件测试来覆盖。

组件测试主要需要关心组件的**公开接口**而不是内部实现细节。对于大部分的组件来说，公开接口包括触发的**事件**、**prop** 和**插槽**。当进行测试时，测试**组件做了什么**，而不是测试它怎么做的。测试实现，会让测试用例和实现细节耦合，当实现发生变化时，测试用例就很可能失败。

> 推荐的做法

* 测试视图：根据 props 和插槽，测试组件**渲染输出**是否正确。
* 测试交互：测试用户交互是否正确。
* 公开方法：测试公开的方法是否正确执行。

> 测试视图时，动态内容才是有意义的，静态内容，快照测试更加合适。

## 测试渲染输出

测试渲染输出，主要是通过挂载函数返回的 `wrapper` 对象，访问它的方法和属性来获取到 DOM，然后断言 DOM 元素是否正确。

`shallowMount` 和 `mount` 返回的 `wrapper` 对象，常用大部分方法和属性：

* `vm`：组件实例，可以访问组件的属性和方法；
* `element`: 组件根元素；
* `html`：组件渲染的 HTML；
* `text`：组件渲染的文本；
* `find`：根据选择器查找 DOM，DOM 可能不存在；
* `findAll`：根据选择器查找所有 DOM；
* `get`：根据选择器获取 DOM，一定存在使用使用；
* `exists`：是否存在 DOM，测试`v-if`；
* `isVisible`：是否可见，测试`display: none`、`visibility: hidden`、`opacity`和`v-show`；
* `contains`：是否包含 DOM 或者组件；
* `classes`： DOM 的类名或者是否包含类型的布尔值；
* `attributes`：DOM 的属性对象或者特性对象值；

* `props`：组件的 props 对象或者某个 prop；
* `setProps`：设置 props；
* `setData`：设置 data；
* `setValue`：设置 input[type="text"]或者`select`的值，更新`v-model`绑定的变量；
* `setChecked`：设置 input[type="checkbox"]或者 input[type="radio"]的值，更新`v-model`绑定的变量；
* `setSelected`：选择一个 option 元素并设置 select 的值，更新`v-model`绑定的变量；
* `trigger`：触发事件；
* `emitted`： 触发的自定义事件；
* `destroy`：销毁组件；

`shallowMount` 和 `mount` 的第二个参数是一个选项对象，可以设置：

* `propsData`：设置 props；
* `data`：设置 data，一个函数；
* `attrs`：设置 DOM 的属性；
* `slots`：设置插槽；
* `scopeSlots`：设置作用域插槽；
* `stubs`：替换子组件；
* `mocks`：为实例添加额外属性，模拟全局属性时有用，比如`$store`和`$route`；
* `localVue`：替换 Vue 构造函数；
* `listeners`：设置事件监听器；
* `provide`：替换 provide/inject；
* `attachTo`：挂载到 DOM 元素上；
* `context`：设置上下文，只用于函数式组件；

### 测试 DOM 存在和可见

有一组件如下：

```html
<template>
  <button type="button">all</button>
  <button v-if="admin" type="button" id="admin">admin</button>
  <button v-show="dev" type="button" id="dev">dev</button>
  <button type="button" id="opacity" :style="{ opacity: opacity }">opacity</button>
</template>
<script>
  export default {
    name: 'Condition',
    data() {
      return {
        admin: true,
        dev: false,
        opacity: 0
      }
    },
  }
</script>
```

测试用例：

```JS
import {
  shallowMount
} from '@vue/test-utils'
import Condition from './Condition.vue'

describe('Condition.vue', () => {
  it('admin 存在', () => {
    const wrapper = shallowMount(Condition)

    expect(wrapper.find('#admin').exists()).toBe(true)
  })

  it('admin 不存在', () => {
    const wrapper = shallowMount(Condition, {
      data() {
        return {
          admin: false,
        }
      },
    })

    expect(wrapper.find('#admin').exists()).toBe(false)
  })

  it('dev 不可见', () => {
    const wrapper = shallowMount(Condition)

    expect(wrapper.find('#dev').isVisible()).toBe(false)
  })
  it('dev 可见', () => {
    const wrapper = shallowMount(Condition, {
      data() {
        return {
          dev: true
        }
      },
    })

    expect(wrapper.find('#dev').exists()).toBe(true)
    expect(wrapper.find('#dev').isVisible()).toBe(true)
  })
  it('opacity 0 不可见', () => {
    const wrapper = shallowMount(Condition)

    expect(wrapper.find('#opacity').exists()).toBe(true)
    expect(wrapper.find('#opacity').isVisible()).toBe(false)
  })
  it('opacity 非 0  可见', () => {
    const wrapper = shallowMount(Condition, {
      data: () => {
        return {
          opacity: 0.1,
        }
      },
    })

    expect(wrapper.find('#opacity').exists()).toBe(true)
    expect(wrapper.find('#opacity').isVisible()).toBe(true)
  })
})
```

> 存在性，测试的是 `v-if` ，使用 `exists` 。

> 测试可见性，测试的是 `v-show` 、 `display` 、 `visibility` 、 `opacity` ，使用 `isVisible` 。

[visibility:hidden vs display:none vs opacity:0](https://stackoverflow.com/questions/14731049/visibilityhidden-vs-displaynone-vs-opacity0)

> find 获取元素，可能不存在，get 一定存在，推荐使用 find 。

### 测试渲染文本

使用 `wrapper.text()` 测试渲染文本，即 `textContent` ，两种测试方式。

1. 测试包含某些文本

```js
toMatch(msg)
toContain(msg)
```

2. 测试某个 DOM 的 textContent

```js
toMatch(msg)
toEqual(msg)
```

### 测试 DOM 属性

```js
attributes() // 所有属性 key-value 对象
attributes('key') // value
```

```js
it('attributes()', () => {
  const wrapper = shallowMount(Condition, {
    data: () => {
      return {
        opacity: 0.1,
      }
    },
  })

  // NOTE 技巧：使用 expect.objectContaining() 匹配对象的部分属性
  expect(wrapper.find('#opacity').attributes()).toEqual(
    expect.objectContaining({
      style: 'opacity: 0.1;',
    })
  )
  expect(wrapper.find('#opacity').attributes('style')).toBe('opacity: 0.1;')
})
```

### 测试样式

1. 测试类名

使用 `classes` 获取全部类名， `classes('className')` 获取某个类名是否存在。

```js
it('classes()', () => {
  const wrapper = shallowMount(Condition, {
    data: () => {
      return {
        opacity: 0.1,
      }
    },
  })

  expect(wrapper.find('#opacity').classes()).toContain('opacity-button')
  expect(wrapper.find('#opacity').classes().toString()).toMatch('hello')
  expect(wrapper.find('#opacity').classes('hello')).toBe(true)
})
```

2. 测试内联样式

使用 `attributes('style')` 获取内联样式结合 `toMatch` 匹配某个样式属性。

### 测试插槽

有一组件 `TestSlots` 如下：

```html
<template>
  <div>
    <h1>TestSlots</h1>
    <slot name="header"></slot>
    <slot :jack="jack"></slot>
    <slot name="footer" :age="jack.age"></slot>
  </div>
</template>

<script>
  export default {
    name: 'TestSlots',
    data: () => {
      return {
        jack: {
          name: 'slot',
          age: 19
        }
      }
    }
  }
</script>
```

`HelloSlot.vue` ：

```html
<template>
  <footer>this is footer</footer>
</template>

<script>
  export default {
    name: 'HelloSlot'
  }
</script>
```

测试用例：

```JS
import {
  shallowMount
} from '@vue/test-utils'
import TestSlots from './TestSlots.vue'
import {
  h
} from 'vue'
import HelloSlot from './HelloSlot.vue'
describe('TestSlots.vue', () => {
  it('test slots', () => {
    const wrapper = shallowMount(TestSlots, {
      slots: {
        header: '<div>header</div>',
        footer: '<HelloSlot />',
      },
      scopedSlots: {
        default: props => {
          return h(
            'p', {
              attrs: {
                'data-p': 'p',
              },
            },
            `${props.jack.name}, this is default scopedSlot`
          )
          // return <p>{props.jack.name}, this is default scopedSlot</p>
        },
      },
      stubs: {
        HelloSlot,
      },
    })

    expect(wrapper.find('div').text()).toMatch('header')
    expect(wrapper.findComponent(HelloSlot).exists()).toBe(true)
    expect(wrapper.find('[data-p=p]').text()).toMatch('slot, this is default scopedSlot')
  })
})
```

> 测试插槽，使用 `slots` 、 `scopedSlots` 、 `stubs` 。
> 然后断言视图是否渲染正确。

## 测试用户交互

测试用户交互的关键是模拟用户交互， vue-test-utils 提供了一系列方法模拟用户交互。

`trigger` 触发事件， `setValue` 设置表单值， `setChecked` 设置 checkbox 选中状态， `setChecked` 设置 radio 选中状态， `setSelected` 设置 select 选中状态。

### 测试原生事件

使用 `trigger` 触发原生事件，比如 `trigger('click')` ，然后断言视图是否正确或者是否触发自定义事件等。

trigger 方法的第二个参数是 `事件对象` ，用于模拟 event。

事件对象的属性有：

```JS
wrapper.find('button').trigger('submit', {
  customKeyInEvent: 'hello',
  pageX: 100,
  pageY: 200,
})
```

### 测试用户输入

使用 `setValue` 设置表单值， `setChecked` 设置 checkbox 选中状态， `setChecked` 设置 radio 选中状态， `setSelected` 设置 select 选中状态。

### 测试自定义事件

`trigger` 也可以触发自定义事件， `trigger('custom-event')` 。

emitted 方法返回一个对象，key 是触发的事件名称，value 是一个数组，数组的每一项是事件触发时抛出的数据。

## 测试公共方法

有时候组件会暴露一些公共方法供外部调用，会改变组件的状态，进而影响视图，需要测试这些方法。

测试方案：监听某个方法，然后断言是否执行，执行次数和参数。

有一组件如下：

```JS
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
      console.log(this.timer, 'zqj log')
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

测试用例：

```JS
import {
  shallowMount
} from '@vue/test-utils'
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

    // 重新开始计时
    wrapper.vm.start()
    jest.advanceTimersByTime(3000)

    expect(wrapper.vm.count).toBe(4)
  })

  it('test finish', () => {
    jest.spyOn(global, 'clearInterval')
    // TODO 无法 mock setInterval 可能是版本问题
    // https://stackoverflow.com/questions/68552571/attempting-to-mock-setinterval-in-jest-using-jest-usefaketimers-not-working
    const timer = 10
    const wrapper = shallowMount(Demo)
    wrapper.vm.start()
    jest.advanceTimersByTime(10_000)
    setInterval.mockReturnValue(timer)

    wrapper.vm.finish()

    // console.log(wrapper.vm.timer, wrapper.vm.count)

    expect(global.clearInterval).toHaveBeenCalled()
    expect(global.clearInterval).toHaveBeenCalledTimes(1)
    // expect(global.clearInterval).toHaveBeenCalledWith(timer)
  })

  it('better test finish', () => {
    const wrapper = shallowMount(Demo)
    wrapper.vm.start()
    jest.advanceTimersByTime(3000)

    expect(wrapper.vm.count).toBe(3)

    wrapper.vm.finish()

    expect(wrapper.vm.count).toBe(0)

    // 手动编写一个能记住调用次数和参数的 mock 函数
    const mock = function(...rest) {
      mock.calls.push(rest)
    }
    mock.calls = []
    mock('a', 'b')
    mock('c', 'd')
    expect(mock.calls).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ])

    const fnMock = jest.fn()
    fnMock('a', 'b')
    fnMock('c', 'd')
    expect(fnMock.mock.calls).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ])

    expect(fnMock).toHaveBeenCalledTimes(2)
  })
})
```

> jest.spyOn 用于监听某个方法， jest.fn 用于创建一个 mock 函数，可以监听函数的调用次数、参数等。

> 不能监听实际的函数，比如 `jest.spyOn(Demo.methods, 'start')` 。

再看一个监听函数执行的例子：

```JS
const CallVuePrototypePropDemo = {
  template: '<div>{{count}}</div>',
  data: () => ({
    count: 0,
  }),
  mounted() {
    this.$bar.start()
  },
}
```

> this.$bar.start 是 Vue 原型的一个方法。

测试用例：

```JS
import {
  shallowMount
} from '@vue/test-utils'
describe('CallVuePrototypePropDemo.vue', () => {
  it('calls $bar.start on mounted', () => {
    const $bar = {
      start: jest.fn(),
    }
    shallowMount(CallVuePrototypePropDemo, {
      mocks: {
        $bar
      }
    })
    expect($bar.start).toHaveBeenCalled()
    expect($bar.start).toHaveBeenCalledTimes(1)
  })
})
```

> mocks 选项用于注入一个对象，对象的属性会被添加到 Vue 实例上。

> 通过 `jest.fn()` 创建的 mock 函数，可以监听函数的调用次数、参数等。

## 测试生命周期中调用的函数

有一组件 `CounterDemo` ，在 `mounted` 中调用 `start` ，在 `destroyed` 中调用 `stop` 。

```JS
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
```

> 组件一挂载就执行 mounted，是自动执行的，因此无法监听 start 的执行。往往通过挂载后的组件视图或者状态来断言 start 是否执行。

比如下面的测试用例无法通过：

```JS
it('test call start when mounted', () => {
  // NOTE 监听组件的方法无效，是直觉上想到的，但是不行
  jest.spyOn(CounterDemo.methods, 'start')
  const wrapper = shallowMount(CounterDemo)

  expect(wrapper.vm.start).toHaveBeenCalledTimes(1)
})
```

或者这样，也不行

```JS
it('test call start when mounted', () => {
  const wrapper = shallowMount(CounterDemo)
  jest.spyOn(wrapper.vm, 'start')

  expect(wrapper.vm.start).toHaveBeenCalledTimes(1)
})
```

那如何测试 `mounted` 呢？通过断言组件的状态和方法的调用，这样测试 mounted：

```JS
it('test call start when mounted', () => {
  jest.useFakeTimers('legacy')
  const wrapper = shallowMount(CounterDemo)

  // mounted 之后，timer 不为 null
  expect(wrapper.vm.timer).not.toBeNull()

  // 向前推进 1 秒，count 为 1
  jest.advanceTimersByTime(1000)
  expect(wrapper.vm.count).toBe(1)

  // 再向前推进 9 秒，count 为 10
  jest.advanceTimersByTime(9_000)
  expect(wrapper.vm.count).toBe(10)
})
```

> 如何测试 destroyed, 测试中组件不会自动销毁，需要手动调用 `wrapper.destroy()` 销毁，因此可监听销毁时方法的执行。

```js
it('test call stop when destroy', () => {
  const wrapper = shallowMount(CounterDemo)
  jest.spyOn(wrapper.vm, 'stop')

  wrapper.destroy()

  expect(wrapper.vm.stop).toHaveBeenCalledTimes(1)
})
```

`CounterDemo.spec.js` 的完整代码：

```JS
import {
  shallowMount
} from '@vue/test-utils'

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
```

> 把组件挂载和定时器的模拟放在 `beforeEach` 中，简化代码。

> 其他生命周期如何测试呢？

还是通过断言组件的状态， `不要测试生命周期的调用，否则就是在测试 vue` 。

## 测试异步代码

jest 测试代码是同步的， 在断言之前需要等待异步代码之前完， vue 组件中的异步代码有两种：

1. vue 异步更新 DOM，比如 setValue 更新表单值
2. 外部函数的异步调用，比如 http 调用

### vue 异步更新 DOM

当一个响应式数据变化后， 要断言这个变化， 需要等待 DOM 更新后才能断言。 可使用 `vm.$nextTick` 、 `Vue.nextTick` ，更加简洁明了的方式是 `await` 更新状态的方法， 比如 `await input.setValue('update input')` 。

可以被 `await ` 的方法有：

* setProps
* setDate
* trigger
* setValue
* setChecked
* setSelected

### 外部函数的异步调用

常见是的 http 调用， 比如 fetch、 axios、 vuex 的 action 等。 这种情况下， 需要使用 `mock`

模拟外部调用， 而不是真的让异步调用执行， 比如 `jest.mock('axios')` 。

使用 `flush - promises` 包， flushPromises 会刷新所有处于 pending 状态或 resolved 状态的 Promise。

有组件 `Foo.vue` :

```html
<template>
  <button @click="fetchResults">{{ value }}</button>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        value: null
      }
    },
    methods: {
      async fetchResults() {
        const response = await axios.get('mock/service')
        this.value = response.data
      }
    }
  }
</script>
```

测试代码：

```js
import {
  shallowMount
} from '@vue/test-utils'
import flushPromises from 'flush-promises'
import Foo from './Foo.vue'

jest.mock('axios')

describe('Foo.vue', () => {
  it('fetches async when a button is clicked', async () => {
    const wrapper = shallowMount(Foo)

    wrapper.find('button').trigger('click')

    await flushPromises()

    expect(wrapper.text()).toBe('value')
  })
})
```

`axios` 模块的模拟： `__mocks__/axios.js`

```js
const axios = {
  get: jest.fn(() => Promise.resolve({
    data: 'value'
  })),
}

export default axios
```

下面的模拟，报错: `SyntaxError: Cannot use import statement outside a module` 。

```JS
import {
  shallowMount
} from '@vue/test-utils'
import flushPromises from 'flush-promises'
import axios from 'axios'
import Foo from './Foo.vue'

jest.mock('axios')

describe('Foo.vue', () => {
  it('fetches async when a button is clicked', async () => {
    axios.get.mockResolvedValue({
      data: 'value'
    })
    const wrapper = shallowMount(Foo)

    wrapper.find('button').trigger('click')

    await flushPromises()

    expect(wrapper.text()).toBe('value')
  })
})
```

> 不知道是版本问题还是什么原因。

参考:

[How do I test axios in Jest?](https://stackoverflow.com/questions/45016033/how-do-i-test-axios-in-jest)

[如何模拟 fetch](https://www.leighhalliday.com/mock-fetch-jest)

> 为何不使用 `await trigger('click')` 或者 `await Vue.$nextTick()` ？

Vue 更新组件和完成 Promise 对象的时机不同。

> 最佳实践：在诸如 trigger 或 setProps 的变更时始终使用 await。如果你的代码依赖一些诸如 axios 的异步操作，使用 `flushPromise` 。

## 测试组件协同工作是否正确

有时候，组件之间会有协同工作，比如一个组件触发事件，另一个组件监听事件，这时候需要测试这种协同工作是否正确。

## 如何更好的组织测试代码

一个测试套件随着用例的增多，会变得越来越难维护。可以使用 `describe` 分组， `beforeEach` 和 `afterEach` ，在用例执行之前和之后执行同一个操作，比如模拟定时器、挂载组件等。善用工厂函数，减少重复代码。

### 测试用例代码三步走

1. 准备测试环境，比如挂载组件、模拟定时器、测试数据等。
2. 执行相关操作，比如点击按钮、输入表单等。
3. 断言结果。
4. 以上代码，使用`空行`分割，保证可读性。

比如：

```js
it('fetches async when a button is clicked', async () => {
  // 1. 准备测试环境
  axios.get.mockResolvedValue({
    data: 'value'
  })
  const wrapper = shallowMount(Foo)

  // 2. 执行相关操作
  wrapper.find('button').trigger('click')
  await flushPromises()

  // 3. 断言结果
  expect(wrapper.text()).toBe('value')
})
```

再比如：

```js
it('test call stop when destroy', () => {
  // 1. 准备测试环境
  const wrapper = shallowMount(CounterDemo)
  jest.spyOn(wrapper.vm, 'stop')

  // 2. 执行相关操作
  wrapper.destroy()

  // 3. 断言结果
  expect(wrapper.vm.stop).toHaveBeenCalledTimes(1)
})
```

### 使用 describe 分组

对于一般的组件，可把测试分为三类： `渲染输出` 、 `用户交互` 和 `公共方法` ，可使用 describe 对这三类测试分组。

```js
describe('DemoVue.vue', () => {
  describe('渲染输出', () => {
    it('test render', () => {
      // ...
    })
  })
  describe('用户交互', () => {
    it('test click', () => {
      // ...
    })
  })
  describe('公共方法', () => {
    it('test add', () => {
      // ...
    })
  })
})
```

> 对于生命周期钩子函数，可放在渲染输出来分组里，也可再添加一组。

> store 和 router 的测试，也可使用 describe 分组。

### 测试代码应该放在哪儿

同一放在 `tests/units` 下或者就近放在被测试代码的旁边，比如 `component/HelloSlot.vue` 、 `component/HelloSlot.spec.js` ，在编辑器中使挨着的，方便查看。

## 参考

[一个关于如何测试 vue 组件的技术演讲--YouTube](https://www.youtube.com/watch?v=OIpfWTThrK8)

[vue 文档关于如何测试](https://cn.vuejs.org/guide/scaling-up/testing.html)

## 小结

* 组件测试应该关注组件的公开接口，而不是内部实现细节。
* 组件测试应重点测试组件的**渲染输出**和**用户交互**。
* 模拟依赖关系是测试中保证用例健壮的关键。
* 测试异步代码时，需要等待异步代码执行完毕后再断言。
