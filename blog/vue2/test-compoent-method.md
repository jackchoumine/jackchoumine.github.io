# 测试 vue 组件的方法

方法包含组件的逻辑，并且这些逻辑需要被测试。测试组件包含的方法并不复杂。但是现实世界的方法通常具有依赖项，而测试**有依赖的**方法，会引入一个更复杂的环境，需要**模拟**这些复杂的依赖。

> 私有方法

在组件内部使用的方法，不应该被测试，因为它们不是组件的公共 API。

如下的 onClick 在组件内部调用，就是私有方法，因为单机组件内部的按钮才调用。

```html
<template>
  <button @click="onClick">按钮</button>
</template>
<script>
  export default {
    methods: {
      onClick() {
        console.log('click')
      }
    }
  }
</script>
```

私有方法是实现细节的，不测试。

> 在组件生命周期中调用的方法，需要测试吗？

没看到权威的说法，我认为应该测试。

<!-- TODO -->

## 测试公有方法

暴露给组件外部的方法，是组件的 API （组件的契约），需要测试。

测试方法：调用方法，然后断言方法的**返回值**或者**副作用**是否符合预期。

```js
import {
  shallowMount
} from '@vue/test-utils'

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

## 测试定时器

定时器函数是实时运行的，这对于速度敏感的单元测试来说不是好消息，如果一个定时器函数需要 10 秒才能运行，那么测试就需要 10 秒才能完成，这太慢了。需要模拟这 10 秒的等待。

替换测试中现有的函数而创建的函数称为模拟函数。

Jest 有假定时器，它可以模拟定时器函数的行为，而不是等待实际的时间。

> jest 对象是 Jest 在运行测试时添加的全局对象。jest 对象包括许多测试实用方法，如假定时器。

用 advanceTimersByTime 推进假时间。

```js
it('test timer', () => {
  let count = 0
  jest.useFakeTimers()
  setInterval(() => {
    count += 1
  }, 1000)
  // 时间推进1秒，setInterval 回调执行一次
  jest.advanceTimersByTime(1000)
  expect(count).toBe(1)
  jest.advanceTimersByTime(3000)
  expect(count).toBe(4)
})
```

上面的 Demo 组件加上一个 start ，每秒钟加 1。

```js
import {
  shallowMount
} from '@vue/test-utils'

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

> 这个测试套件有多个测试用例，每个测试用例都需要使用假定时器，两个测试用例都需要使用假定时器，可以将 `jest.useFakeTimers()` 放在 `describe` 的 `beforeEach` 里执行，**确保每次测试之前都复位**。

完整的代码

```js
import {
  shallowMount
} from '@vue/test-utils'

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

> jest.advanceTimersByTime 用于推进时间， jest.setTimeout 是做什么用的？

<!-- TODO -->

还需要了解。

## 测试函数是否执行

希望添加一个 finish 函数，来重置 count，停止定时器。

```js
{
  finish() {
    this.count = 0
    this.stop()
  }
}
```

stop 方法，调用了 `clearInterval` ，接受一个参数，如何测试函数是否被调用呢？

`sypOn` 可以监视函数的调用情况。

`setInterval.mockReturnValue('mockID')` ，模拟 `setInterval` 的返回值为 `mockID` 。

`toHaveBeenCalled` 断言函数是否被调用。
`toHaveBeenCalledTimes` 断言函数的调用次数。
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

改进的用例：

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

## 测试 Vue 原型上的属性

开发中常常会在 Vue 的原型上添加属性和方法，比如把 axios 添加到原型上，希望测试这些属性和方法。就可以在挂载组件时，通过 `mocks` 模拟 Vue 原型上的属性。

```js
// 模拟 Vue.prototype.$bar = { start() {} }
shallowMount(VueComponent, {
  mocks: {
    $bar: {
      start() {}
    }
  }
})
```

测试 `$bar.start` 是否被调用。

> 如何记录一个函数是否被调用？

需要测试函数是否被调用，那么可使用能记录自身调用信息的模拟函数。

```js
const mock = function(...rest) {
  mock.calls.push(rest)
}
mock.calls = []
mock(1)
mock(2, 3)
mock.calls // [[1],[2,3]]
```

上面的是一个能记住调用情况的函数，jest 提供了更加强大的**模拟函数**，应该使用它。

```js
// jest.fn() 创建一个模拟函数
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

> `this.$bar.start` 是原型的方法，组件挂载时调用，要如何测试呢？

希望测试原型上的属性和方法，引入 Vue 的原型，就让测试变得复杂了，不希望引入负责的环境，而是希望在 VueDemo 组件挂载时，模拟出原型的属性和方法。

shallowMount 函数的第二个参数的选项 `mocks` 提供了这个功能。

```js
describe('mock ', () => {
  it('calls $bar.start on mounted', () => {
    const $bar = {
      start: jest.fn(),
      finish: () => {},
    }
    shallowMount(VueDemo, {
      mocks: {
        $bar
      }
    })
    expect($bar.start).toHaveBeenCalled()
    expect($bar.start).toHaveBeenCalledTimes(1)
  })
})
```

> 在 VueDemo 挂载时，调用了 $bar.start 用例通过测试。

## 测试生命周期钩子中调用的函数

没有找到官方的资料，哎，只能自己摸索了。

有一组件如下：

```js
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

测试组件**挂载时**是否执行了 `start`

<!-- TODO -->

```js
it('test call start when mounted', () => {
  // Matcher error: received value must be a mock or spy function ❌
  jest.spyOn(CounterDemo.methods, 'start')
  const wrapper = shallowMount(CounterDemo)
  expect(wrapper.vm.start).toHaveBeenCalledTimes(1)
})
```

> 测试代码报错。

搜索到这种解决方案：

```js
describe('CounterDemo', () => {
  let wrapper = null
  beforeEach(() => {
    wrapper = shallowMount(CounterDemo, {
      methods: {
        mounted: CounterDemo.mounted,
      },
    })
  })
  it('test call start when mounted', () => {
    jest.spyOn(wrapper.vm, 'start')
    wrapper.vm.mounted()
    expect(wrapper.vm.start).toHaveBeenCalledTimes(1)
  })
})
```

不行，因为传递 methods，替换组件内部的用法不再支持了。

> 上面的代码主动调用 mounted，在测试 Vue，而不是组件生命周期的里的方法。

测试组件**销毁时**是否执行了 `stop` ：

```js
import {
  shallowMount
} from '@vue/test-utils'

describe('CounterDemo', () => {
  it('测试 destroy 时的函数调用', () => {
    const wrapper = shallowMount(CounterDemo)
    expect(wrapper.vm.timer).not.toBe(null)
    jest.spyOn(wrapper.vm, 'stop')
    wrapper.destroy() // 手动销毁组件
    expect(wrapper.vm.stop).toHaveBeenCalled()
    expect(wrapper.vm.stop).toHaveBeenCalledTimes(1)
  })
})
```

相关问题:

[How to mock lifecycle hooks with vue-test-utils](https://stackoverflow.com/questions/51797466/how-to-mock-lifecycle-hooks-with-vue-test-utils)

[Unable to mock lifecycle hooks ](https://github.com/vuejs/vue-test-utils/issues/166)

[Add lifecycle hooks mocking](https://github.com/vuejs/vue-test-utils/pull/167)

[Unit Testing Vue Lifecycle Methods](https://grozav.com/unit-testing-vue-lifecycle-methods/)

### jest 测试异步函数

异步代码是指在未来某个时间点执行的代码，比如定时器、网络请求等。

* 回调函数类型的异步

```js
it('async function', () => {
  let finish = false
  setTimeout(() => {
    finish = true
    console.log('finish setTimeout callback', finish)
    expect(finish).toBe(true)
  }, 1000)
  console.log('finish', finish)
})
```

测试代码都执行完毕了，setTimeout 的回调都还没执行，就导致断言不会执行。

使用 `done` ，执行异步回调。

```js
it('async function', (done) => {
  let finish = false
  setTimeout(() => {
    finish = true
    console.log('finish setTimeout callback', finish)
    expect(finish).toBe(true)
    done()
  }, 1000)
  console.log('finish', finish)
})
```

> 先输出 `finish` ，再输出 `finish setTimeout callback` ，花了 2.7 秒 。

> 使用假定时器推进时间，不要测试代码真的等待 1 秒钟，这样会增加测试时间。如果测试需要的时间超过 5 秒，测试可能会失败。

```js
it('async callback function', done => {
  expect.assertions(1)
  let finish = false
  jest.useFakeTimers()
  setTimeout(() => {
    finish = true
    console.log('finish setTimeout callback', finish)
    expect(finish).toBe(true)
    done()
  }, 1000)
  jest.advanceTimersByTime(1000)
  console.log('finish', finish)
})
```

> 先输出 `finish setTimeout callback` ，再输出 `finish` ，花了 1.74 秒 。

测试异步代码，往往会忘记编写断言，导致测试误报，可使用 `expect.assertions` 指定断言数量。

```js
it('async callback function', (done) => {
  expect.assertions(1) // 必须执行一次断言
  let finish = false
  setTimeout(() => {
    finish = true
    console.log('finish setTimeout callback', finish)
    expect(finish).toBe(true)
    done()
  }, 1000)
  console.log('finish', finish)
})
```

* promise 类型的异步

```js
it('async promise function', done => {
  expect.assertions(1)
  jest.useFakeTimers()
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('finish setTimeout callback')
      resolve(100)
    }, 1000)
  })
  jest.advanceTimersByTime(1000)
  promise.then(res => {
    console.log('finish promise', res)
    expect(res).toBe(100)
    done()
  })
  console.log('finish')
})
```

> then 回调形式嵌套深，可读性差，希望使用 await。

```JS
it('async promise function', async () => {
  expect.assertions(1)
  const promiseFn = () => {
    return new Promise((resolve, reject) => {
      resolve(100)
    })
  }
  const res = await promiseFn()
  console.log('finish promise', res)
  expect(res).toBe(100)
  console.log('finish')
})
```

> async 和 done 不能同时使用。

### 模拟模块依赖

当一个 JavaScript 文件导入另一个模块时， 被导入的模块将成为一个依赖，比如 axios。 大多数情况下， 在单元测试中有模块依赖是好事， 但是如果该模块依赖有副作用， 比如发送 http 请求， 则可能会导致问题： 测试代码无法控制请求多久返回， 返回的状态也是多变的， 这样的测试代码是不可靠的。

但是这种模块依赖又是源代码里必须有的， 怎么办呢？

> 模块依赖的副作用是不可控的， 测试代码就不可靠， 所以需要模拟模块依赖， 即将依赖替换成一个对象。

有一个 `MockModule.vue`

```html
<template>
  <ul>
    <li v-for="item in todoList" :key="item.id">{{ item.title }}</li>
  </ul>
</template>

<script>
  import {
    getTodoList
  } from '@/api'
  // 从 api/index.js 导入依赖
  export default {
    name: 'MockModule',
    data() {
      return {
        todoList: [],
      }
    },
    created() {
      getTodoList().then(todos => {
        this.todoList = todos
      })
    },
  }
</script>
```

getTodoList 调用 http:

```js
function getTodoList() {
  return fetch('https://jsonplaceholder.typicode.com/todos').then(res => res.json())
}
export {
  getTodoList
}
```

组件的 http 接口在 created 里调用，如何测试呢？

在依赖的文件所在目录创建一个 `__mocks__` 目录，然后在该目录下创建一个与依赖模块同名的文件，这个文件就能模拟依赖的模块。

```bash
api/__mocks__/index.js # 模拟 api/index.js
```

在 `api/__mocks__/index.js` 中，导出 `getTodoList` ，该函数使用 `jest.fn` 模拟。

```js
const getTodoList = jest.fn(() => Promise.resolve([]))

export {
  getTodoList
}
```

> 默认情况下，使用 jest.fn 创建的函数是无操作函数，即它们不执行任何操作。你可以通过调用 jest.fn 将 mock 函数的实现设置成期望的函数实现。例如，创建一个始终返回 true 的 mock 函数。

```js
jest.fn(() => true)
```

getTodoList 返回 promise，所以模拟函数也返回 promise。

 `MockModule.spec.js`

```JS
import {
  shallowMount
} from '@vue/test-utils'
import flushPromises from 'flush-promises'
import {
  getTodoList
} from '@/api'

import MockModule from './MockModule.vue'

jest.mock('@/api') // 模拟 api 模块

describe('MockModule.vue', () => {
  it('测试异步接口', async () => {
    expect.assertions(1)
    const todos = [{
      id: '1',
      title: '测试'
    }]
    // 模拟 getTodoList 返回值
    getTodoList.mockResolvedValueOnce(todos)
    const todoList = await getTodoList()
    expect(todoList).toEqual(todos)
  })
  it('模拟模块依赖', async () => {
    const todos = [{
      id: '1',
      title: '测试'
    }]
    // 模拟 getTodoList 返回值
    getTodoList.mockResolvedValueOnce(todos)
    const wrapper = shallowMount(MockModule)
    await flushPromises()
    expect(wrapper.vm.todoList).toEqual(todos)
  })
})
```

::: tip
await flushPromises 的作用：flush-promises 会刷新所有处于 pending 状态或 resolved 状态的 promise。
:::

> 为何测试 `getTodoList` 不使用 `flushPromises` ?

因为能直接调用异步函数 `getTodoList` ，await 能拿到 resolved promise 的值。

> 为何第二个用例需要使用 `flushPromises` ?

因为不能直接拿到组件内部的 `getTodoList` ，就不能使用 await 来让异步函数结束，所以需要 `flushPromises` ，不使用会报错。

<!-- 模拟了包含了 getTodoList 的模块，getTodoList -->

> 有点绕。。。。。

修改上面的测试：

```js
import {
  shallowMount
} from '@vue/test-utils'
import flushPromises from 'flush-promises'
import {
  getTodoList
} from '@/api'

import MockModule from './MockModule.vue'

jest.mock('@/api') // 模拟 api 模块
describe('MockModule.vue', () => {
  const todos = [{
    id: '1',
    title: '测试'
  }]
  beforeEach(() => {
    // getTodoList.mockResolvedValueOnce(todos)
    getTodoList.mockResolvedValue(todos)
  })
  it('测试异步接口', async () => {
    expect.assertions(1)
    const res = await getTodoList()
    expect(res).toEqual(todos)
  })
  it('模拟模块依赖', async () => {
    const wrapper = shallowMount(MockModule)
    await flushPromises()
    expect(wrapper.vm.todoList).toEqual(todos)
  })
})
```

> 使用 flushPromises 刷新 resolved 的 promise，组件内才能拿到数据。

## 适度使用 mock

应适度使用 mock, 多一个 mock, 测试用例和源代码不同步的可能性就会增加一分，同时增加了测试用例和源代码的耦合，测试代码很容易变得脆弱。

模拟模块依赖是最复杂的 mock，应该尽量避免。

> 只模拟副作用会减慢测试速度的模块。

常见的会降低测试速度的副作用：

* http 请求；
* 数据库连接；
* 使用文件系统。

## 总结

* 只测试组件的共有方法：调用共有方法，断言输出。
* 使用 Jest 假定时器来测试定时器函数。
* 使用`mockResolvedValue` 或者 `mockResolvedValueOnce` 来模拟函数的返回值。
* `jet.fn` 来模拟函数。
* 使用 `jest.spyOn` 来监视函数的调用情况。
* shallowMount 的 mocks 选项，可模拟组件实例属性。
* `jest.mock` 模拟模块。
* 适度使用 mock。

## 参考

[Jest 单元测试环境搭建](https://www.aligoogle.net/pages/343eae/#%E4%B8%80-%E4%BE%9D%E8%B5%96%E8%AF%B4%E6%98%8E)

[Vue.js unit test cases with vue-test-utils and Jest](https://blog.octo.com/vue-js-unit-test-cases-with-vue-test-utils-and-jest/)

[](https://mayashavin.com/articles/testing-components-with-vitest)

[](https://blog.logrocket.com/guide-vitest-automated-testing-vue-components/)

[](https://vueschool.io/lessons/learn-how-to-test-vuejs-lifecycle-methods)

[](https://blog.canopas.com/vue-3-component-testing-with-jest-8b80a8a8946b)

[Guide to Unit Testing Vue Components](https://testdriven.io/blog/vue-unit-testing/)

[All Vue Content](https://fjolt.com/category/vue)
