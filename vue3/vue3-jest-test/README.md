# vue3-jest-test

vue3 + jest 测试学习。

## 学习笔记

### 触发事件

```js
import {
  mount
} from '@vue/test-utils'
const App = {
  data() {
    return {
      msg: 'hello',
      innerCount: 0
    }
  },
  methods: {
    add() {
      this.innerCount += 1
    },
  },
  /*html*/
  template: `
  <button @click="add">{{innerCount}}</button>
  `,
}

describe('App', () => {
  it('测试事件', async () => {
    const wrapper = mount(App)
    // NOTE 触发事件和检查页面更新
    // wrapper.find('button').trigger('click')
    // 等待视图更新
    // await nextTick()
    // await 的简写
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('button').text()).toBe('1')
  })
})
```

知识点：

1. `trigger('click')` 触发事件。

2. 使用`nextTick`等视图更新。

3. 可使用简写方式等视图更新。

> 测试自定义事件的触发

```js
function onClick() {
  emit('my-click', 'hello', 123)
}
```

测试 `my-click` ：

```js
it('测试自定义事件', () => {
  const wrapper = factory()
  const button = wrapper.find('button')
  button.trigger('click')
  console.log(wrapper.emitted()) // { 'my-click': [ [ 'hello', 123 ] ] }
  expect(wrapper.emitted()['my-click'][0][0]).toBe('hello')
})
```

<!-- TODO -->

> 如何触发和监听自定义事件呢？

### 使用工厂函数返回组件挂载

```js
import {
  mount
} from '@vue/test-utils'
const App = {
  props: {
    count: Number,
  },
  data() {
    return {
      msg: 'hello',
      innerCount: 0
    }
  },
  methods: {
    add() {
      this.innerCount += 1
    },
  },
  /*html*/
  template: `
  <div v-if="count % 2 === 0">count:{{count}}. count is even.</div>
  <div v-else>count:{{count}}. count is odd.</div>
  <button @click="add">{{innerCount}}</button>
  <h2>{{msg}}</h2>
  `,
}

// NOTE 提取工厂函数
function factory({
  props,
  data
}) {
  // const app =  createApp()
  // app.mount()
  return mount(App, {
    props,
    data() {
      return data
    },
  })
}

describe('App', () => {
  it('should render with odd', () => {
    const odd = 3
    const hello = 'hi'
    const wrapper = factory({
      props: {
        count: odd
      },
      data: {
        msg: hello
      },
    })
    // NOTE 输出一个对象
    // console.log(wrapper.vm)
    expect(wrapper.html()).toContain(`count:${odd}. count is odd`)
    expect(wrapper.find('h2').text()).toBe(hello)
  })
  // NOTE xit 跳过这个测试
  it('should render with even', () => {
    const evenNumber = 4
    const wrapper = factory({
      props: {
        count: evenNumber
      }
    })
    expect(wrapper.html()).toContain(`count:${evenNumber}. count is even`)
  })
})
```

提取工厂函数的目的：方便传递 data，但是使用 setup 函数不能传递 data。

### 提供 store

组件依赖 store:

```html
<template>
  <button @click="add">{{ count }}</button>
  <div>postId: {{ postId }}</div>
</template>

<script>
  import {
    computed
  } from 'vue'
  import {
    useStore
  } from 'vuex'
  export default {
    name: 'Counter',
    setup(props, {
      emit,
      attrs,
      slots
    }) {
      const store = useStore()
      const count = computed(() => {
        return store.state.count
      })

      function add() {
        store.commit('add')
      }
      return {
        count,
        add
      }
    },
  }
</script>
```

如何在测试代码不引入全局的 store，但是保证代码能测试呢？即如何在测试代码中模拟 store。

```js
import {
  mount
} from '@vue/test-utils'
import Counter from './Counter.vue'
import {
  createStore
} from 'vuex'

function createLocalStore() {
  const store = createStore({
    state() {
      return {
        count: 0
      }
    },
    mutations: {
      add(state) {
        state.count += 1
      },
    },
  })
  return store
}

function factory() {
  const store = createLocalStore()
  return mount(Counter, {
    global: {
      plugins: [store],
    },
  })
}

describe('Counter', () => {
  it('测试store', async () => {
    const wrapper = factory()
    const button = wrapper.find('button')
    await button.trigger('click')
    await button.trigger('click')
    expect(wrapper.find('button').text()).toBe('2')
  })

  it('测试本地store', async () => {
    const wrapper = factory()
    const button = wrapper.find('button')
    await button.trigger('click')
    await button.trigger('click')
    expect(wrapper.find('button').text()).toBe('2')
  })
})
```

使用 `global` 的 plugins 属性提供 store。

> 为何 store 要使用工厂函数返回？

保证个测试用例都返回新的 store。

### 如何测路由

有时候组件会使用到路由传递参数，如何在测试代码中模拟路由呢？

```html
<template>
  <div>postId: {{ postId }}</div>
</template>

<script>
  export default {
    name: 'Counter',
    computed: {
      postId() {
        return this.$router.params.postId
      },
    },
  }
</script>
```

使用 `mocks` 模拟

```js
import {
  mount
} from '@vue/test-utils'
import Counter from './Counter.vue'

function factory() {
  return mount(Counter, {
    global: {
      mocks: {
        $router: {
          params: {
            postId: '123',
          },
        },
      },
    },
  })
}

describe('Counter', () => {
  it('测试模拟路由', () => {
    const wrapper = factory()
    expect(wrapper.find('div').text()).toContain('postId: 123')
  })
})
```

> 如何测试点击是路径跳转呢？

### 测试 provide 和 inject

有一组件如下：

```html
<template>
  <button @click="add">{{ count }}</button>
</template>

<script>
  import {
    computed,
    defineComponent,
    inject
  } from 'vue'

  export default defineComponent({
    name: 'DemoProvide',
    setup(props, {
      emit,
      attrs,
      slots
    }) {
      const store = inject('store')
      const count = computed(() => {
        return store.state.count
      })

      function add() {
        store.commit('add')
      }
      return {
        count,
        add
      }
    },
  })
</script>
```

在 mount 中提供 provide:

```js
import {
  mount
} from '@vue/test-utils'
import DemoProvide from './DemoProvide.vue'
import {
  createStore
} from 'vuex'

function createLocalStore() {
  const store = createStore({
    state() {
      return {
        count: 0
      }
    },
    mutations: {
      add(state) {
        state.count += 1
      },
    },
  })
  return store
}

function factory() {
  const store = createLocalStore()
  return mount(DemoProvide, {
    global: {
      provide: {
        store,
      },
    },
  })
}

describe('DemoProvide', () => {
  it('测试inject', async () => {
    const wrapper = factory()
    const button = wrapper.find('button')
    await button.trigger('click')
    await button.trigger('click')
    expect(wrapper.find('button').text()).toBe('2')
  })
})
```

### 使用 reactive 对象模拟 store

有时候我们不想在测试代码里依赖 store，而是想使用 vue 的响应式系统来模拟 store。

可这样组织测试代码：

```js
import {
  mount
} from '@vue/test-utils'
import DemoProvide2 from './DemoProvide.vue'
import {
  reactive
} from 'vue'

function factory() {
  const state = reactive({
    count: 0
  })
  return mount(DemoProvide2, {
    global: {
      provide: {
        store: {
          state,
          commit: () => {
            state.count += 1
          },
        },
      },
    },
  })
}

describe('DemoProvide2', () => {
  it('使用 reactive 模拟 store', async () => {
    const wrapper = factory()
    const button = wrapper.find('button')
    await button.trigger('click')
    await button.trigger('click')
    expect(wrapper.find('button').text()).toBe('2')
  })
})
```

### 测试条件渲染

```html
<template>
  <button type="button">all</button>
  <button v-if="admin" type="button" id="admin">admin</button>
  <button v-show="dev" type="button" id="dev">dev</button>
</template>
<script>
  export default {
    name: 'Condition',
    data() {
      return {
        admin: true,
        dev: false
      }
    },
  }
</script>
```

测试代码

```js
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
})
```

> 测试条件渲染

1. v-if 使用 exists

2. v-show 使用 isVisible

### 测试 http 请求

比如在 `onMounted` 里自动执行 http 请求。

```html
<template>
  <button type="button" @click="onClick"></button>
</template>

<script>
  import {
    ref,
    onMounted,
    defineComponent
  } from 'vue'
  import axios from 'axios'

  export default defineComponent({
    name: 'HttpTest',
    setup(props, {
      emit,
      attrs,
      slots
    }) {
      onMounted(() => {
        axios.get('/')
      })
      return {
        onClick,
      }
    },
  })
</script>
```

如何测试在 onMounted 是时执行了 `axios.get` 呢？

jest 提供了模拟函数和模拟模块的功能：

```js
import {
  mount
} from '@vue/test-utils'
import HttpTest from './HttpTest.vue'

function factory() {
  return mount(HttpTest)
}

// NOTE  为何不再
let mockGet = '' //jest.fn()

// NOTE 模拟 axios 模块
jest.mock('axios', () => {
  return {
    get: () => mockGet()
  }
})
describe('HttpTest', () => {
  // 每个 it 都会执行
  beforeEach(() => {
    mockGet = jest.fn()
  })

  it('测试 http 请求', () => {
    const wrapper = factory()
    expect(mockGet).toHaveBeenCalled()
    expect(mockGet).toHaveBeenCalledTimes(1)
  })
})
```

`toHaveBeenCalled` 断言函数是否被调用。

`toHaveBeenCalledTimes(1)` 断言函数被调用的次数。

`beforeEach` 钩子函数在每个 `it` 用例浅都会执行。

### 指定子组件

有时组件使用到其他组件，我们不希望在组件中引入，给测试带来复杂性：比如传递组件的 props 等，可在测试模拟子组件。

```html
<template>
  <button type="button"></button>
  <subComponent />
  <HelloWorld />
</template>

<script>
  import {
    ref,
    onMounted,
    defineComponent
  } from 'vue'
  export default defineComponent({
    name: 'HttpTest',
    setup(props, {
      emit,
      attrs,
      slots
    }) {
      return {}
    },
  })
</script>
```

使用全局属性 `stubs` 模拟子组件。

```js
import {
  shallowMount
} from '@vue/test-utils'
import HttpTest from './HttpTest.vue'

function factory() {
  return shallowMount(HttpTest, {
    global: {
      stubs: {
        subComponent: {
          template: `<span></span>`,
        },
        HelloWorld: true,
      },
    },
  })
}

describe('HttpTest', () => {
  it('模拟子组件', () => {
    const wrapper = factory()
    console.log(wrapper.html())
  })
})
```

组件会被渲染成：

```html
<button type="button"></button>
<span></span>
<hello-world-stub></hello-world-stub>
```

## 参考

[youtube vue3 测试教程](https://youtube.com/playlist?list=PLC2LZCNWKL9ahK1IoODqYxKu5aA9T5IOA)

[Testing with Jest and React Testing Library](https://robertmarshall.dev/blog/testing-with-jest-and-react-testing-library/)

[A guide to module mocking with Jest](https://www.emgoto.com/mocking-with-jest/)

[How to mock imported functions with Jest](https://dev.to/dstrekelj/how-to-mock-imported-functions-with-jest-3pfl)
