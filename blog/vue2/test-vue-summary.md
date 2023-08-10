# vue2 组件测试总结

## 测试异步代码

jest 测试代码是同步的，在断言之前需要等待异步代码之前完，vue 组件中的异步代码有两种：

* vue 异步更新 DOM；
* 外部函数的异步调用，比如 setTimeout、fetch 等。

### vue 异步更新 DOM

当一个响应式数据变化后，要断言这个变化，需要等待 DOM 更新后才能断言。可使用 `vm.$nextTick` 、 `Vue.nextTick` ，更加简洁明了的方式是 `await` 那个更新状态的方法，比如 `await input.setValue('update input')` 。

可以被 `await` 的方法有：

* setProps
* setDate
* trigger
* setValue
* setChecked
* setSelected

### 外部函数的异步调用

常见是的 http 调用，比如 fetch、axios、vuex 的 action 等。这种情况下，需要使用 `mock` 模拟外部调用，而不是真的让异步调用执行，比如 `jest.mock('axios')` 。

使用 `flush-promises` 包，flushPromises 会刷新所有处于 pending 状态或 resolved 状态的 Promise。

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

这样模拟，报错: `SyntaxError: Cannot use import statement outside a module` 。

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
