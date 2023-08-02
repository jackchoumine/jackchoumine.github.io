# 测试 vuex

vuex 是 vue 推荐的状态管理库，它可以帮助我们管理组件的状态，让组件之间的状态共享变得更加容易。如何测试它，也是测试 vue 项目的一部分。

## 测试 mutation

编写测试用例

```js
import {
  mutations
} from './mutations'

describe('mutations', () => {
  it('addTodos mutations', function() {
    const todos = [{
      done: true,
      content: '起床'
    }]
    const state = {
      todos: [],
    }
    mutations.addTodos(state, todos)
    expect(state.todos).toEqual(todos)
  })
})
```

编写 `mutations.js` 让测试用例通过

```js
const mutations = {
  addTodos(state, todos) {
    state.todos = todos
  },
}

export {
  mutations
}
```

## 测试 getter

用例

```JS
import {
  getters
} from './getters'

describe('getters', () => {
  it('getTodos', () => {
    const todos = [{
        done: true,
        content: '起床'
      },
      {
        done: false,
        content: '吃法'
      },
    ]
    const state = {
      todos,
    }
    expect(getters.getTodos(state)).toEqual(todos)
  })
})
```

编写 `getters.js` 让测试用例通过

```js
const getters = {
  getTodos(state) {
    return state.todos
  },
}
export {
  getters
}
```

增加一个获取已经完成的 todo 的 getter

```js
const getters = {
  getTodos(state) {
    return state.todos
  },
  getDoneTodos(state) {
    return state.todos.filter(todo => todo.done)
  },
}
```

测试 `getDoneTodos`

```js
it('getDoneTodos', () => {
  const state = {
    todos,
  }
  expect(getters.getDoneTodos(state)).toEqual([todos[0]])
})
```

## 测试 action

action 使你能够异步提交 mutation。通常，action 会进行 API 调用并提交结果。因为 action 可以是异步的，并且可以发送 HTTP 请求，所以同 mutation 或 getter 相比，为 action 编写单元测试要更复杂

要测试 action，你可以按照 Vuex 调用它的方式调用该函数，并断言该 action 是否按你的期望执行。通常，这意味着要利用模拟避免产生 HTTP 调用。

> 绝对不要在你的单元测试中进行 HTTP 调用。HTTP 调用会使单元测试运行时间更长，并且使测试变得不稳定。

需要调用 http 接口时，使用模拟代替。

编写 actions.js

```js
import {
  getTodos
} from '../api'

function fetchTodos({
  commit
}, {
  type
}) {
  return getTodos(type).then(todos => {
    commit('addTodos', todos)
  })
}

const actions = {
  fetchTodos,
}
export {
  actions
}
```

> action 需要通过 commit 来提交 mutation ，所以需要传入一个 context 对象，包含 commit 方法。

`fetchTodos` 有一个 getTodos 的依赖，所以需要模拟 `getTodos` 。

测试用例

```js
import {
  actions
} from './actions'
import {
  getTodos
} from '../api'
import flushPromises from 'flush-promises'

jest.mock('../api')

describe('actions', () => {
  it('fetchTodos calls commit with the result of getTodos', async () => {
    expect.assertions(1)
    const todos = [{}, {}]
    const type = 'add'
    getTodos.mockImplementation(calledWith => {
      return calledWith === type ? Promise.resolve(todos) : Promise.resolve()
    })
    const context = {
      commit: jest.fn(),
    }
    actions.fetchTodos(context, {
      type
    })
    await flushPromises()
    expect(context.commit).toHaveBeenCalledWith('addTodos', todos)
  })
})
```

在 `__mocks__/api.js` 文件中模拟 `getTodos`

```js
const getTodos = jest.fn(() => Promise.resolve([]))
export {
  getTodos
}
```

用例中使用 `getTodos.mockImplementation` 模拟 `getTodos` ，并且在 `__mocks__/api.js` 中模拟 `getTodos` 的返回值。

如果是正确的 type ，返回 `Promise.resolve(todos)` ，否则返回 `Promise.resolve()` 。

> 用例中模拟越多，测试越难以理解和维护，所以，尽量少模拟。

mock 越多，你的测试就越不准确。**mock 不测试实际的功能，它们只是在测试假设的功能**。你模拟的越多，意味着你做出的假设就越多。

当你的模拟假设不正确时，可以会引入 bug。没有什么比调试失败的单元测试并且发现问题是出在 mock 自身时，更令人沮丧！

同时 mock 也会使测试更难以理解和维护，测试也将变得更加昂贵。你需要确保编写和维护 mock 所需的额外时间可以被运行单元测试节省下来的时间平衡。

## 测试 vuex store 实例

单独测试 action ，mutation 和 getter 是很有用的，可以避免模拟 Vuex 函数， 但是，你也需要测试它们在 store 实例中的组合。

一个好的单元测试是如何提供输入和断言输出的。在测试一个 Vuex store 时你可以应用相同的原则。

mutation 和 action 是一个 store 的输入。你可以通过提交一个 mutation 或分发一个 action 来触发一个 Vuex store 中的更改。store 的输出是 store state 或 getter 的结果。

### 测试 state.count + 1

修改 `store/index.js`

```js
import Vue from 'vue'
import Vuex from 'vuex'
import {
  mutations
} from './mutations'
import {
  actions
} from './actions'
import {
  getters
} from './getters'

Vue.use(Vuex)

export const storeConfig = {
  state: {
    todos: [],
    count: 0,
  },
  mutations,
  actions,
  getters,
}

export default new Vuex.Store(storeConfig)
```

mutations.js 中增加 `increment` mutation

```js
const mutations = {
  addTodos(state, todos) {
    state.todos = todos
  },
  // 需要测试的 mutation
  increment(state, payload = 1) {
    state.count += payload
  },
}

export {
  mutations
}
```

测试用例

```js
import {
  storeConfig
} from './index'
import Vue from 'vue'
import Vuex from 'vuex'
describe('store', () => {
  it('state.count + 1', () => {
    Vue.use(Vuex)
    const store = new Vuex.Store(storeConfig)
    expect(store.state.count).toBe(0)
    store.commit('increment')
    expect(store.state.count).toBe(1)
  })
})
```

> 在 Vue 基础构造函数上安装 Vuex 插件，新建了 store 实例。

> 一个 Vuex store 中的 state 对象是对 store 配置对象中定义的 state 对象的引用。Vuex store state 的任何更改都将改变 store 配置中的 state。

解决方案是通过克隆 store 配置对象删除任何对象引用。这样你可以继续使用基础的 store 配置对象，并且每次测试时都会有一个全新的 store。

使用 lodash-es 的 cloneDeep 方法来克隆 store 配置对象。

```js
const store = new Vuex.Store(cloneDeep(storeConfig))
```

vuex 被安装到 Vue 构造函数上，这会污染其他测试用例，引入复杂的环境。

解决方案是使用 `createLocalVue` 构造函数保证单元测试的隔离性。

```js
import {
  createLocalVue
} from '@vue/test-utils'
import {
  storeConfig
} from './index'
import {
  getTodos
} from '../api'

import flushPromises from 'flush-promises'

jest.mock('../api')

const localVue = createLocalVue()
import Vuex from 'vuex'
localVue.use(Vuex)

describe('store', () => {
  let store = null
  beforeEach(() => {
    store = new Vuex.Store(storeConfig)
  })
  it('state.count', () => {
    expect(store.state.count).toBe(0)
    store.commit('increment')
    expect(store.state.count).toBe(1)
    store.commit('increment', 2)
    expect(store.state.count).toBe(3)
  })
  it('test actions.fetchTodos', async () => {
    expect.assertions(1)
    const todos = [{
        done: true,
        content: '吃饭'
      },
      {
        done: false,
        content: '睡觉'
      },
    ]
    const type = 'add'
    getTodos.mockImplementation(calledWith => {
      return calledWith === type ? Promise.resolve(todos) : Promise.resolve()
    })
    store.dispatch('fetchTodos', {
      type
    })
    await flushPromises()
    expect(store.getters.getTodos).toEqual(todos)
  })
})
```

> 并非所有插件都需要使用 localVue，但为了安全起见，我建议你使用 localVue 进行所有的插件安装。

## 组件中的 vuex

组件中不使用 vuex，那么 vuex 并没有什么用处。

当组件连接到一个 vuex store 时，该 store 将成为组件的一个依赖。

两种方法测试组件中的 vuex store

* 使用 mocks 模拟 store

```js
const mocks = {
  actions: {
    fetchTodos: jest.fn(),
  },
}
shallowMount(ContractList, {
  mocks,
})
```

> 简单的 store，可胜任，复杂的 store，就推荐这种方式。

* 通过 vuex 和假数据创建真实的 store

我们把之前 `ContractList.vue` 的数据放在 store 里。

```js
/* eslint-disable quotes */
/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-20 19:28:34
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-03 00:14:34
 * @Description :
 */
import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils'
import ContractList from './ContractList.vue'
import ContractItem from './ContractItem.vue'
import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)
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

  function createWrapper({
    store
  } = {}) {
    return shallowMount(ContractList, {
      localVue,
      store,
    })
  }
  let wrapper = null
  let storeConfig = null
  let store = null
  beforeEach(() => {
    storeConfig = {
      getters: {
        persons: jest.fn(() => richFriends),
      },
      actions: {
        fetchPersons: jest.fn(),
      },
    }
    store = new Vuex.Store(storeConfig)
    wrapper = createWrapper({
      store
    })
  })
  it("ContractItem's size", () => {
    // NOTE 这样不行
    // storeConfig.getters.persons.mockReturnValue(richFriends)
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

关键代码：

```js
shallowMount(ContractList, {
  localVue,
  store,
})
```

> 挂载组件时，传递 store 和本地 Vue。

重构 `ContractList.vue` 从 store 中获取 persons，让测试用例通过。

```HTML
<script>
  import ContractItem from './ContractItem.vue'
  export default {
    name: 'ContractList',
    components: {
      ContractItem,
    },
    // props: {
    //   persons: {
    //     type: Array,
    //     default: () => [],
    //   },
    // },
    data() {
      return {
        bgColor: 'green',
      }
    },
  }
</script>

<template>
  <section class="contract-list" :style="{ color: 'red', 'background-color': bgColor }">
    <ContractItem style="margin-bottom: 20px" v-for="item in $store.getters.persons" :key="item.img" :name="item.name" :company="item.company" :city="item.city" :twitter="item.twitter" :position="item.position" :phone="item.phone" :img="item.img" />
  </section>
</template>
```

> 通过 `$store.getters.persons` 获取 persons

其他 mutations 和 actions 就不再测试了，因为都是类似的。

## 小结

* 可分别测试 store 各个部分
* 使用`createLocalVue` 创建 vue 实例，保证单元测试的隔离性
* 插件使用 `localVue` 安装，避免污染其他测试用例
* 测试 store，也是挺麻烦的, 需要各种模拟
