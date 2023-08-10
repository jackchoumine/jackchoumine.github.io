# vue2 组件测试总结

自动化测试可防止意外引入 BUG，提高代码质量，减少重复工作，并鼓励编写可测试、可维护和可扩展的代码。

> 何时测试？

越早越好。根据经验，很多公司并不要求前端进行自动化测试，因为业务往往频繁变化，导致代码变化很快，此时编写测试，工作量大收益低，但是在封装通用的组件或者组件库时，测试是必不可少的。

> 测试类型

单元测试：检测函数、类或者模块的输入是否生产预期的输出和副作用。

组件测试：检测组件是否渲染正确，用户交互是否正确，异步代码是否正确，是特殊的单元测试。

集成测试：检测多个组件是否正确协同工作。

端到端测试：检测整个应用是否正确工作，要在模拟用户使用软件的实际方式(实际的环境、实际的交互、实际的数据)，检测应用的功能是否符合预期，会涉及到数据库和后端。

> 不追求 100%覆盖率

对 UI 组件的测试，不追求 100% 的覆盖率，否则会导致测试代码的维护成本过高，而且测试代码的维护成本往往比实现代码的维护成本高。

> 测试中的模拟

模拟是测试中的重要概念，模拟是一种测试技术，用于在测试中替换或模拟依赖项，以便在测试中对其进行控制，保证测试代码的健壮。模拟可以是手动的，也可以是自动的。比如模拟定时器、http 接口。**模拟越少越好，因为模拟越多，对实现细节的假设越多，当实现发生变化，测试用例就很可能失败。测试越接近用户的使用方式，测试越能给人信心。**

## 组件测试应该测试什么？

从粒度的角度来看，组件测试位于单元测试之上，可以被认为是集成测试的一种形式。Vue 应用中大部分内容都应该由组件测试来覆盖。

组件测试主要需要关心组件的**公开接口**而不是内部实现细节。对于大部分的组件来说，公开接口包括触发的**事件**、**prop** 和**插槽**。当进行测试时，测试**组件做了什么**，而不是测试它是怎么做到的。测试实现，会让测试用例和实现细节耦合，当实现发生变化时，测试用例就很可能失败。

> 推荐的做法

* 测试视图：根据 props 和插槽，测试组件**渲染输出**是否正确。
* 测试交互：测试用户交互是否正确。

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

使用 `attributes('style')` 获取内联样式结合 `toMatch` 匹配某个样式s属性。

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

使用 `trigger` 触发原生事件，比如 `trigger('click')` ，返回断言视图是否正确或者是否触发自定义事件等。 

trigger 方法的第二个参数是 `事件对象` ，可以模拟点击位置等。

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

emitted 方法返回一个对象，key 触发的事件，value 是一个数组，数组的每一项是事件的参数。

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

## 参考

[一个关于如何测试 vue 组件的技术演讲--YouTube](https://www.youtube.com/watch?v=OIpfWTThrK8)

## 小结

* 组件测试应该关注组件的公开接口，而不是内部实现细节。
* 组件测试应该测试组件的**渲染输出**和**用户交互**。
* 模拟依赖关系是测试中保证用例健壮的关键。
* 测试异步代码时，需要等待异步代码执行完毕后再断言。
