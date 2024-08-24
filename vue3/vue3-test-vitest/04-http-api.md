# 测试 http 请求

哪里会发起 http 请求？

* 组件内部
* pinia actions
* 自定义 hook

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

## 参考

* [stop mocking fetch](https://kentcdodds.com/blog/stop-mocking-fetch)
* [how-to-mock-fetch-api-with-vites](https://runthatline.com/how-to-mock-fetch-api-with-vitest)
* [testing-components-with-vitest](https://mayashavin.com/articles/testing-components-with-vitest)
