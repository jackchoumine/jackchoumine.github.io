# 测试 http 请求

哪里会发起 http 请求？

* 组件内部
* 自定义 hook
* pinia store

需要如何测试它们呢？

## 组件内部

有如下一 `JokeContainer.vue` ，它会发起一个 http 请求，获取一个笑话。

```html
<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-22 21:45:45
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-22 22:02:40
 * @Description :
-->
<script setup>
  import {
    ref
  } from 'vue'

  const loading = ref(false)
  const joke = ref('')

  fetchJoke()

  function fetchJoke() {
    const headers = {
      accept: 'application/json'
    }
    loading.value = true
    fetch('https://icanhazdadjoke.com/hello', {
        headers
      })
      .then((res) => {
        // console.log(res)
        if (!res.ok) {
          return Promise.reject(new Error('获取笑话失败'))
        }
        return res.json()
      })
      .then((data) => {
        joke.value = data.joke
      })
      .catch((err) => {
        joke.value = err.message
      })
      .finally(() => {
        loading.value = false
      })
  }
</script>

<template>
  <div class="JokeContainer">
    <h3>笑话大全</h3>
    <p>{{ loading ? 'loading' : joke }}</p>
    <button @click="fetchJoke">获取笑话</button>
  </div>
</template>

<style scoped lang="scss">
  .JokeContainer {
    // scss code
  }
</style>
```

如何测试这个组件呢？

由于组件通过 fetch 发起了 http 请求，就通过 fetch 依赖了外部服务器，有外部依赖的测试是不可靠的，所以我们需要 mock 掉 fetch。

不可靠主要有以下几点：

* 依赖外部服务器，网络不稳定，可能会导致测试失败，比如网络超时
* 依赖外部服务器，可能会导致测试数据不稳定，比如数据变化

通过 `vi.fn` 来 mock 掉 fetch，即创建一个假的 fetch 代替真的。

当模拟 fetch 时，需要测试三点：

* 请求路径；
* 请求参数；
* 请求返回后对组件渲染的影响。

```ts
// JokeContainer.spec.ts
/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-22 22:04:39
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-23 00:53:15
 * @Description :
 */
import {
  flushPromises,
  shallowMount
} from '@vue/test-utils'
import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
  vi
} from 'vitest'
import JokeContainer from './JokeContainer.vue'

type Res = {
  joke: unknown
}
const mockFetchImplementation = (res: Res) => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(res)
  })
}

describe('JokeContainer.vue vi.fn', () => {
  let originalFetch: typeof global.fetch

  let joke = 'Why don’t scientists trust atoms? Because they make up everything!'
  beforeAll(() => {
    // 保存原始的 fetch 函数，以便在测试结束后恢复
    originalFetch = global.fetch
    global.fetch = vi.fn().mockImplementation(() => {
      return mockFetchImplementation({
        joke
      })
    })
  })

  afterAll(() => {
    global.fetch = originalFetch
  })

  it('fetch joke from http api is ok', async () => {
    const wrapper = shallowMount(JokeContainer)

    await flushPromises()

    expect(wrapper.text()).toContain(joke)
    expect(wrapper.find('p').text()).toEqual(joke)
    expect(global.fetch).toHaveBeenCalledTimes(1)

    joke = 'new joke'
    wrapper.find('button').trigger('click')

    await flushPromises()

    expect(wrapper.text()).toContain(joke)
    expect(wrapper.find('p').text()).toEqual(joke)
    expect(global.fetch).toHaveBeenCalledTimes(2)
  })

  it('fetch joke from http api is fail', async () => {
    global.fetch = vi.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: false
      })
    })

    const wrapper = shallowMount(JokeContainer)
    await flushPromises()

    expect(wrapper.text()).toContain('获取笑话失败')
    expect(wrapper.find('p').text()).toEqual('获取笑话失败')
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })
})
```

> 关键代码

```ts
type Res = {
  joke: unknown
}

const fakeFetch = (res: Res) => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(res)
  })
}

// 模拟 fetch
global.fetch =  vi.fn().mockImplementation(() => {
  return fakeFetch({
    joke
  })
})
```

创建一个假的 fetch 并赋值给真的 fetch。

> vi.fn 使用技巧

`vi.fn` 返回一个函数，参数一个假的目标函数实现，这样我就可以完全控制函数的参数、返回和调用次数。通常模拟产生随机数据的函数，比如生产随机字符串、日期和请求服务器的函数。

再看一个生产随机字符串的例子：

```ts
// vi.fn.spec.ts
import { expect, it, vi } from 'vitest'

function randomStr() {
  return Math.random().toString(36).slice(2)
}

it('randomStr', () => {
  const returnVal = 'abc1234'
  const mockRandomStr = vi.fn(() => returnVal)
  expect(mockRandomStr()).toBe(returnVal)
})
```

这个例子似乎和 `randomStr` 函数没有关联起来，可能不够恰到。

```ts
let originalFetch: typeof global.fetch

let joke = 'Why don’t scientists trust atoms? Because they make up everything!'

beforeAll(() => {
  // 保存原始的 fetch 函数，以便在测试结束后恢复
  originalFetch = global.fetch
  global.fetch = vi.fn().mockImplementation(() => {
    return fakeFetch({
      joke
    })
  })
})
afterAll(() => {
  global.fetch = originalFetch
})
```

> 在每个用例执行之前，记录真的 `fetch` ，在每个用例执行之后恢复真实的 fetch，这样做的目的避免之前的用例产生副作用，影响到之后的用例。

`flushPromises` 函数用于刷新所有处于 pending 状态或 resolved 状态的 Promise，再测试有异步行为的代码时格外有用，比如组件状态更新后，需要断言 dom 的情况，就需要调用它。

> 断言函数的调用情况

`toHaveBeenCalledTimes` 断言调用次数

`toBeCalledWith(someParams)` 断言调用时的参数

## 测试自定义 hook

上面的请笑话的函数，可以封装成 `useJoke` ，然后单独测试，这很符合分离关注点的原则。

```js
// useJoke.js
import {
  ref
} from 'vue'

export default function useJoke() {
  const loading = ref(false)
  const joke = ref('')

  fetchJoke()

  return {
    loading,
    joke,
    fetchJoke
  }

  function fetchJoke() {
    const headers = {
      accept: 'application/json'
    }
    loading.value = true
    fetch('https://icanhazdadjoke.com/hello', {
        headers
      })
      .then((res) => {
        // console.log(res)
        if (!res.ok) {
          return Promise.reject(new Error('获取笑话失败'))
        }
        return res.json()
      })
      .then((data) => {
        joke.value = data.joke
      })
      .catch((err) => {
        joke.value = err.message
      })
      .finally(() => {
        loading.value = false
      })
  }
}
```

测试代码：

```ts
// useJoke.spec.ts
import {
  expect,
  it,
  vi
} from 'vitest'
import {
  flushPromises
} from '@vue/test-utils'
import {
  createApp
} from 'vue'

import useJoke from './useJoke'

it('useJoke', async () => {
  const joke = 'this is a joke'
  // mock fetch
  global.fetch = vi.fn().mockImplementation(() => {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        joke
      })
    })
  })

  const {
    result
  } = setupHook(useJoke)
  await flushPromises()

  expect(result.loading.value).toBe(false)
  expect(result.joke.value).toBe(joke)
  expect(result.fetchJoke).instanceOf(Function)
})

function setupHook(hook: Function, params ? : any) {
  let result: any

  const app = createApp({
    setup() {
      result = hook(params)
      return () => null
    }
  })

  app.mount(document.createElement('div'))

  return {
    result,
    app
  }
}
```

由于 hook 的执行环境是组件，即 `setup` 内部，因此需要给 hook 提供执行环境 `setupHook` , 以确保 hook 内部的生命周期、watch 等顺利执行。

这个测试依然模拟了 `fetch` 。

上面的例子使用 createApp 创建 useJoke 的执行环境，还可以使用 `defineComponent` 和 `shallowMount` 创建执行环境。

```js
function setupHook(hook: Function, params ? : any) {
  let result: any

  const HelperComponent = defineComponent({
    setup() {
      result = hook(params)
      return () => null
    }
  })

  const wrapper = shallowMount(HelperComponent)

  return {
    result,
    wrapper
  }
}
```

使用 `axios` 调用 api，要如何测试呢？

需要模拟 axios 模块

vitest 模拟外部模块的方式：

先导入外部模块，再使用 `vi.mock` 模块外部模块依赖。

```js
vi.mock('path', factoryFunction)
```

第一个参数为模块的导入路径，第二个参数是一个模块对象的工厂函数，工厂函数返回的对象有一 `default` 属性，用于模拟模块的默认导出。

> 模拟模块，通常需要写在测试文件顶部。

模拟 axios:

```js
vi.mock('axios', () => {
  return {
    default: {
      get: vi.fn() // get 方法通过 vi.fn 模拟
    }
  }
})
```

修改测试 useJoke.spec.ts：

```ts
//...和之前一样
import axios from 'axios'
import useJoke from './useJoke'
// 模拟 axios
vi.mock('axios', () => {
  return {
    default: {
      get: vi.fn()
    }
  }
})

it('useJoke', async () => {
  const joke = 'this is a joke'
  const getRes = {
    data: {
      joke
    },
    status: 200
  }
  // @ts-ignore
  axios.get.mockResolvedValue(getRes)
  const { result } = setupHook(useJoke)
  await flushPromises()

  expect(result.loading.value).toBe(false)
  expect(result.joke.value).toBe(joke)
  expect(result.fetchJoke).instanceOf(Function)
})
```

> axios.get 返回的数据结构为 `{data,status}` ，是 `mockResolvedValue` 模拟接口的返回值。

修改 `useJoke.ts` ，让测试用例通过：

两处修改

```ts
// useJoke.ts
// 1. 导入外部依赖
import axios from 'axios'
import { ref } from 'vue'
export default function useJoke() {
  const loading = ref(false)
  const joke = ref('')

  fetchJoke()

  return {
    loading,
    joke,
    fetchJoke
  }

  function fetchJoke() {
    const headers = {
      accept: 'application/json'
    }
    loading.value = true
    // 2. 修改获取接口返回的方式
    axios
      .get('https://icanhazdadjoke.com', {
        headers
      })
      .then((res) => {
        // console.log(res)
        if (200 <= res.status && res.status < 299) {
          return res.data
        }
        return Promise.reject(new Error('获取笑话失败'))
      })
      .then((data) => {
        joke.value = data.joke
      })
      .catch((err) => {
        joke.value = err.message
      })
      .finally(() => {
        loading.value = false
      })
  }
}
```

对 axios 模块的模拟被放在 `it` 测试用例里面，其实可以放在 `beforeEach` 钩子中，当有多个测试用例时，特别有用，因为可通钩子函数清除模拟。

### 更好的组织模拟

希望在每个测试用例之前，设置 axios 模拟，在每个测试用例之后撤销模拟，可使用 `beforeEach` 和 `afterEach` ：

```ts
// useJoke.spec.ts

// ... 其他不变

let _app = null
const joke = 'this is a joke'

beforeEach(() => {
  // @ts-ignore
  axios.get.mockResolvedValue({ data: { joke }, status: 200 })
})

it('useJoke', async () => {
  const { result, app } = setupHook(useJoke)
  _app = app
  await flushPromises()

  expect(result.loading.value).toBe(false)
  expect(result.joke.value).toBe(joke)
  expect(result.fetchJoke).instanceOf(Function)
})

afterEach(() => {
  // @ts-ignore
  axios.get.mockReset()
  // @ts-ignore
  _app.unmount()
})
// ... 其他不变
```

## pinia

有一 `counterStore.ts` :

```ts
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  const doubleCount = computed(() => count.value * 2)

  function increment(amount = 1) {
    count.value += amount
  }

  return { count, doubleCount, increment }
})
```

如何单独测试这个 store 呢？

```ts
// counterStore.spec.ts
import { describe } from 'vitest'

import { setActivePinia, createPinia } from 'pinia'
import { useCounterStore } from './counterStore'
import { beforeEach, it, expect } from 'vitest'

describe('counterStore', () => {
  beforeEach(() => {
    // 创建一个新 pinia，并使其处于激活状态，这样它就会被任何 useStore() 调用自动接收
    // 而不需要手动传递： `useStore(pinia)`
    setActivePinia(createPinia())
    // 在 beforeEach 钩子中，创建并激活了一个 pinia 实例。没有它，商店就无法工作，抛出错误。
    // [🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
  })

  it('increment 没有参数，默认加 1', () => {
    const counter = useCounterStore()
    // store 状态
    expect(counter.count).toBe(0)

    counter.increment()

    expect(counter.count).toBe(1)
  })

  it('increment 有参数，使用参数修改状态', () => {
    const counter = useCounterStore()

    counter.increment(10)

    expect(counter.count).toBe(10)
  })

  it('doubleCount 是 count 的两倍', () => {
    const counter = useCounterStore()

    expect(counter.doubleCount).toBe(0)

    counter.increment()

    expect(counter.count).toBe(1)
    expect(counter.doubleCount).toBe(2)
  })
})
```

关键代码就是 `setActivePinia(createPinia())` ，在每个测试用例之前，创建一个新的 pinia 实例，并激活它，否则会报错。

###  counterStore 用到组件中，如何测试组件？

有一组件 `CounterComponent.vue` :

```html
<!-- CounterComponent.vue -->
<script setup>
  import {
    useCounterStore
  } from '@/stores/counterStore'
  const counterStore = useCounterStore()
</script>

<template>
  <div class="CounterComponent">
    <h3>count: {{ counterStore.count }}</h3>
    <h3>doubleCount: {{ counterStore.doubleCount }}</h3>
    <button @click="counterStore.increment(2)">Increment</button>
  </div>
</template>

<style scoped lang="scss">
  .CounterComponent {
    // scss code
  }
</style>
```

关键部分和上面一样：

```ts
/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-25 01:25:52
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-25 16:45:37
 * @Description : 测试含有 pinia store 的 CounterComponent 组件
 */
import { shallowMount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import CounterComponent from './CounterComponent.vue'

describe('CounterComponent.', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('测试组件初始状态', async () => {
    const wrapper = shallowMount(CounterComponent)
    const countH3 = wrapper.findAll('h3').at(0)
    const doubleCountH3 = wrapper.findAll('h3').at(1)

    expect(countH3?.text()).contains('0')
    expect(doubleCountH3?.text()).contains('0')
  })

  it('测试 调用 increment(2) 函数后的状态', async () => {
    const wrapper = shallowMount(CounterComponent)
    const countH3 = wrapper.findAll('h3').at(0)
    const doubleCountH3 = wrapper.findAll('h3').at(1)

    expect(countH3?.text()).contains('0')
    expect(doubleCountH3?.text()).contains('0')

    const btn = wrapper.find('button')
    await btn.trigger('click')

    expect(countH3?.text()).contains('2')
    expect(doubleCountH3?.text()).contains('4')
  })
})
```

测试组件 `CounterComponent.vue` ，使用的是真实的 `counterStore` , 有的文章说不应该使用真实的 store，而是使用模拟的 store，这样测试更加独立，不会受到 store 的影响。

> 我认为这不是问题，而是优点，因为完全按照使用组件的方式测试组件，这样更加真实使用这个组件的情况。

我模拟 store，并没有成功，有兴趣的可看看两篇参考文章，实现模拟 store。

* [store 测试](https://pinia.vuejs.org/zh/cookbook/testing.html#testing-stores)

* [Unit Testing a Pinia Component](https://fadamakis.com/unit-testing-a-pinia-component-37d045582aed)

### 含有异步操作的 store 如何测试？

有一 `jokeStore.ts` :

```ts
// jokeStore.ts
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useJokeStore = defineStore('jokeStore', () => {
  const joke = ref('')
  const jokeLetterCount = computed(() => {
    return joke.value?.length ?? 0
  })

  function fetchJoke() {
    const headers = {
      accept: 'application/json'
    }
    fetch('https://icanhazdadjoke.com', {
      headers
    })
      .then((res) => res.json())
      .then((data) => {
        joke.value = data.joke
      })
  }

  return {
    joke,
    jokeLetterCount,
    fetchJoke
  }
})
```

这里的关键是 `fetchJoke` 函数，它是一个异步函数，如何测试呢？

还是使用 `vi.fn` 模拟 `fetch` 函数。

```ts
/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-25 01:03:13
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-25 18:14:00
 * @Description : 使用 vitest 测试 store
 */
import { afterEach, describe, vi } from 'vitest'

import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, it, expect } from 'vitest'
import { useJokeStore } from './jokeStore'
import { flushPromises } from '@vue/test-utils'

let joke = 'joke'
let globalFetch: any

function mockFetch() {
  return Promise.resolve({
    json: () => Promise.resolve({ joke })
  })
}

describe('jokeStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    globalFetch = global.fetch
    global.fetch = vi.fn().mockImplementation(() => mockFetch())
  })
  afterEach(() => {
    global.fetch = globalFetch
  })

  it('joke 默认状态', () => {
    const jokeStore = useJokeStore()
    // store 状态
    expect(jokeStore.joke).toBe('')
    expect(jokeStore.jokeLetterCount).toBe(0)
  })

  it('请求接口后的状态', async () => {
    const jokeStore = useJokeStore()

    jokeStore.fetchJoke()

    await flushPromises()

    expect(jokeStore.joke).toBe(joke)
    expect(jokeStore.jokeLetterCount).toBe(joke.length)
  })
})
```

前面使用到 fetch 请求服务器数据时，都是使用了把 fetch 模拟掉的方式，但是模拟也是有代价的：

1. 模拟 fetch 代码量较大，需要模拟请求参数、返回值、调用次数等
2. 模拟 fetch 代码不够直观，不够真实
3. 不恰当的模拟，不能让代码更健壮，反而给人虚假的安全感

有没有更好的方式呢？ 直接使用真实的 fetch 请求**模拟的服务器**，这样测试更加真实 。

### 使用 `msw` 模拟服务器

[wms](https://mswjs.io/) 是 Mock Service Worker 的缩写，是一个用于模拟服务器的库，可以拦截请求，返回模拟数据。Service Worker 是浏览器的一个特性， WMS 实现了 node 环境下的 Service Worker。

在 `useJoke.spec.ts` 中使用 `msw` 模拟服务器：

安装依赖： `npm i -D msw`

> 此时版本为 2.3.5

修改 `useJoke.spec.ts` :

```ts
/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-23 02:01:25
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-27 09:50:07
 * @Description : 测试 useJoke
 */
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { flushPromises } from '@vue/test-utils'
import { createApp } from 'vue'
import type { App } from 'vue'
import { http, HttpResponse } from 'msw'
import { setupServer } from 'msw/node'
import type { SetupServer } from 'msw/node'
import useJoke from './useJoke'

let app: App | null = null
const joke = 'this is a joke'

let server: SetupServer

beforeEach(() => {
  // 创建一个模拟服务器
  server = setupServer(
    http.get('https://icanhazdadjoke.com', () => {
      return HttpResponse.json({
        joke
      })
    })
  )
  server.listen()
})

afterEach(() => {
  // 关闭服务器
  server.close()
  app!.unmount()
})

it('useJoke', async () => {
  const { result, app: _app } = setupHook(useJoke)
  app = _app as App

  expect(result.loading.value).toBe(true)
  expect(result.joke.value).toBe('')

  // 接口请求完成后
  await flushPromises()

  expect(result.loading.value).toBe(false)
  expect(result.joke.value).toBe(joke)
  expect(result.fetchJoke).instanceOf(Function)
})

function setupHook(hook: Function, params?: any) {
  let result: any

  const app = createApp({
    setup() {
      result = hook(params)
      return () => null
    }
  })

  app.mount(document.createElement('div'))

  return {
    result,
    app
  }
}
```

关键代码解读：

`setupServer` 的参数是一系列请求处理方法，返回一个模拟服务器。

`http.get` 拦截请求，返回模拟数据。

`HttpResponse.json()` 返回 json 数据， `HttpResponse.text()` 返回文本数据， `HttpResponse.formData` 返回表单数据。

`server.listen()` 启动服务器。

`server.close()` 关闭服务器。

[模拟响应 -- 官方文档](https://mswjs.io/docs/basics/mocking-responses)

## 参考

* [stop mocking fetch](https://kentcdodds.com/blog/stop-mocking-fetch)
* [how-to-mock-fetch-api-with-vites](https://runthatline.com/how-to-mock-fetch-api-with-vitest)
* [testing-components-with-vitest](https://mayashavin.com/articles/testing-components-with-vitest)
* [Guide to Unit Testing Vue Components](https://testdriven.io/blog/vue-unit-testing/)
