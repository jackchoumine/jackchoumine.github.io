# pinia 使用教程（一）

pinia 是一个 Vue3 的状态管理库，它的 API 设计和 Vuex 有很大的相似之处，但是它的实现方式和 Vuex 完全不同，它是基于 Vue3 的新特性 `Composition API` 实现的，所以它的使用方式和 Vuex 也有很大的不同。

## 安装

```bash
npm i pinia
```

## 使用

main.js

```js
import {
  createApp
} from 'vue'
import App from './App.vue'
import {
  createPinia
} from 'pinia'

const app = createApp(App)

// NOTE 注册 pinia 插件
app.use(createPinia())

app.mount('#app')
```

> 在使用 store 之前，需要先注册 pinia 插件。

```js
import {
  useUserStore
} from '@/stores/user'
import {
  createPinia
} from 'pinia'
import {
  createApp
} from 'vue'
import App from './App.vue'

// ❌  fails because it's called before the pinia is created
const userStore = useUserStore()

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// ✅ works because the pinia instance is now active
const userStore = useUserStore()

// more info https://pinia.vuejs.org/core-concepts/outside-component-usage.html
```

## 创建 store

```js
import {
  defineStore
} from 'pinia'

// 定义并导出容器
// 参数1：store id
// 参数2：选项对象
export const useCounter = defineStore('counter', {
  /**
   * 全局状态：使用箭头函数返回
   */
  state: () => {
    return {
      count: 100,
      age: 20,
      books: ['vue', 'react', 'svelte'],
    }
  },
  getters: {
    // NOTE getters 使用了 this，需要手动声明返回值类型
    booksStr(state): string {
      console.log(state.books)
      return this.books.join('--')
    },
  },
  actions: {
    complexChange(step: number) {
      this.age += step
      this.books.push('solidjs', 'lit')
    },
  },
})
```

四个注意点：

1. state 使用函数返回一个状态；
2. getters 使用了 this，需要手动声明返回值类型；
3. actions 使用 this 访问状态和 getters。`actions`可以是异步的，不再有 mutations；
4. getters 和 actions 不使用箭头函数，否则 this 会指向 window，而不是 state。
5. 每个 store **只注册一次**，即 id 不能重复。

## 使用 store

```html
<template>
  <div>
    <p>counter.count {{ counter.count }}</p>
    <p>count{{ count }}</p>
    <p>age:{{ age }}</p>
    <ul>
      <li v-for="book in books" :key="book">{{ book }}</li>
    </ul>
    <p>{{ booksStr }}</p>
    <button @click="add">+</button>
    <hr />
    <button @click="changeMulti">批量修改</button>
    <hr />
    <button @click="changeMulti2">$patch使用接收函数</button>
  </div>
</template>

<script setup lang="ts">
  import {
    storeToRefs
  } from 'pinia'

  import {
    useCounter,
    useTodosStore
  } from '@/stores'

  const {
    finishedTodos,
    todos
  } = storeToRefs(useTodosStore())

  // NOTE 不要直接解构，会失去响应式
  // const { count } = counter
  const {
    count,
    age,
    books,
    booksStr
  } = useCounter()
  // const { count, age, books, booksStr } = storeToRefs(counter)

  // NOTE 状态修改
  // 方式1：最简单
  function add() {
    ++counter.count
  }

  // 方式2：修改多个数据，使用 $patch 接收函数批量更新
  function changeMulti2() {
    counter.$patch(counter => {
      counter.count += 10
      counter.books.push('angular')
    })
  }

  // 方式3：修改多个数据，使用 $patch 批量修改
  function changeMulti() {
    counter.$patch({
      count: counter.count + 1,
      age: counter.age + 10,
    })
  }

  // 方式4：封装 actions，适合复杂操作
  function changeByAction() {
    counter.complexChange(10)
  }
</script>
```

打印整个 store，是一个 proxy 对象，counter 里声明的属性都能在里面看到，这些普通属性（数据）都是 ref。

![vue3-pinia-store-counter](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/vue3/pinia-store-counter.png 'vue3-pinia-store-counter')

可以像使用普通 ref 一样使用 store 的数据 --- 监听，用于计算属性等等。

```js
const doubleCount = computed(() => {
  return counter.count * 2
})
watch(
  () => counter.count,
  count => {
    console.log(count, 'zqj log')
  }
)
```

### 访问

两种访问方式：

1. 不解构，使用整个 store 对象

```html
<template>
  <p>{{ counter.count }}</p>
</template>
<script setup lang="ts">
  import {
    useCounter
  } from '@/stores'
  const counter = useCounter()

  // 接解构，会失去响应式
  // const { count, age, books, booksStr } = useCounter()

  // NOTE 状态修改
  // 方式1：最简单
  function add() {
    ++counter.count
  }
  // 方式2：封装 actions，适合复杂操作
  function changeByAction() {
    counter.complexChange(10)
  }
</script>
```

2. 解构，借助`storeToRefs`保持属性响应性

```html
<template>
  <p>{{ count }}</p>
</template>

<script setup lang="ts">
  import {
    useCounter
  } from '@/stores'
  const counter = useCounter()

  const {
    count,
    age,
    books,
    booksStr
  } = storeToRefs(counter)

  // 方式3：修改多个数据，使用 $patch 接收函数批量修改
  function changeMulti2() {
    counter.$patch(counter => {
      counter.count += 10
      counter.books.push('angular')
    })
  }

  // 方式4：修改多个数据，使用 $patch 接收对象批量修改
  function changeMulti() {
    counter.$patch({
      count: counter.count + 1,
      age: counter.age + 10,
    })
  }
</script>
```

### 修改 store

有 3 种方式

```js
// 方式1：直接修改 store 里的属性
function add() {
  ++counter.count
}
// 方式2：封装 actions，适合复杂操作
function changeByAction() {
  counter.complexChange(10)
}

// 方式3：修改多个数据，使用 $patch 接收函数批量修改
function changeMulti2() {
  counter.$patch(counter => {
    counter.count += 10
    counter.books.push('angular')
  })
}
```

## 使用组合式 api 创建 store -- setup store

上面的 useCounter 使用选项式 api 创建，pinia 也支持组合式 api, 这和 vue3 的组合式函数非常贴近，使用上更加简单。

`defineStore` 的第二个参数，可接收一个函数，该函数内部可使用 `ref` 、 `computed` 和 `watch` 等 vue 的组合式函数。

```js
import {
  defineStore
} from 'pinia'

export const useTodosStore = defineStore('todos', () => {
  const todos = reactive([{
      id: '1',
      finished: true,
      content: 'coding'
    },
    {
      id: '2',
      finished: false,
      content: 'eating'
    },
  ])
  const finishedTodos = computed(() => {
    console.log('computed')
    return todos.filter(todo => todo.finished).map(todo => todo.content)
  })

  function finish(id: string, isFinished: boolean) {
    const index = todos.findIndex(todo => todo.id === id)
    todos[index].finished = isFinished
  }
  watch(todos, newTodos => {
    console.log(newTodos, 'newTodos')
  })

  function remove(id) {
    const index = todos.findIndex(todo => todo.id === id)
    todos.splice(index, 1)
  }

  return {
    todos,
    finish,
    remove,
    finishedTodos
  }
})
```

> 实际， `defineStore` 的第二个参数，就是一个普通的组合式函数。

> **注意：**，第二个参数虽然是一个函数，都是无法接收参数。
> 如果需要传递参数，可使用工厂函数传递新的 id 和参数。

学习使用 hook 管理全局状态时，有如下 useCart 例子，用于记录购物车的商品信息。

```ts
import { readonly } from 'vue'

export type Cart = {
  id: number
  name: string
  number: number
  price: number
}

const items = ref<Cart[]>([])

const totalBooks = computed(() =>
  items.value.reduce((preTotal, current) => {
    preTotal += current.number
    return preTotal
  }, 0)
)

export default function useCart() {
  function addCart(item) {
    const exist = items.value.find(el => el.id === item.id)
    if (exist) exist.number += 1
    else items.value.push({ id: item.id, name: item.name, number: 1, price: item.price })
  }
  function removeCart(id: number) {
    const index = items.value.findIndex(el => el.id === id)
    if (index !== -1) {
      const number = items.value[index].number
      number === 1 && items.value.splice(index, 1)
      number >= 2 && (items.value[index].number -= 1)
    }
  }
  // NOTE 导出的 items 是内部的 items 的只读副本
  // 防止在外部意外更改状态
  return { items: readonly(items), totalBooks: readonly(totalBooks), addCart, removeCart }
  // return { items: items, totalBooks, addCart, removeCart }
}
```

在商品页添加到购物车：

```html
<script setup lang="ts">
  import useCart from './useCart'

  const books = ref([{
      id: 1,
      name: 'vue',
      price: 12
    },
    {
      id: 2,
      name: 'react',
      price: 20
    },
    {
      id: 3,
      name: 'angular',
      price: 21
    },
  ])
  const {
    addCart,
    removeCart
  } = useCart()
</script>

<template>
  <div>
    <h3>使用hook共享状态</h3>
    <h4>书本列表</h4>
    <ul>
      <li v-for="(item, index) in books" :key="index">
        <button @click="() => removeCart(item.id)">-</button>
        {{ item.name }} -- ￥{{ item.price }}
        <button @click="() => addCart(item)">+</button>
      </li>
    </ul>
  </div>
</template>
```

在购物车页面，显示购物车里的商品信息：

```html
<script lang="ts" setup>
  import useCart from './useCart'

  const {
    items,
    totalBooks
  } = useCart()
  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => {
      return total + item.price * item.number
    }, 0)
  })
</script>

<template>
  <div class="user-cart">
    <h4>购物车</h4>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item.name }}--{{ item.price }}￥ --- {{ item.number }}
      </li>
    </ul>
    <div>总共：{{ totalBooks }}本</div>
    <div>总价：{{ totalPrice }}元</div>
  </div>
</template>
```

一个简单的 hook，就实现了管理**全局状态**。

## pinia 和 hook 的完美结合

现在，使用 pinia 来接管这个功能。

```ts
import { defineStore } from 'pinia'

import useCart from '@/components/HookTest/useCart'

export const useCartStore = defineStore('cart', useCart)
```

商品页面，从 store 里导出的方法，模板保持不变。

```html
<script setup lang="ts">
  // import useCart from './useCart'
  import {
    useCartStore
  } from '@/stores'
  const books = ref([{
      id: 1,
      name: 'vue',
      price: 12
    },
    {
      id: 2,
      name: 'react',
      price: 20
    },
    {
      id: 3,
      name: 'angular',
      price: 21
    },
  ])
  const {
    addCart,
    removeCart
  } = useCartStore()
  // const { addCart, removeCart } = useCart()
</script>
```

购物车页面，可以从 store 里获取商品，也可以保持原来的代码不变。

> 从 store 里获取商品

 `CartDemo.vue`

```html
<script lang="ts" setup>
  import {
    useCartStore
  } from '@/stores'

  const userCart = useCartStore()

  const totalPrice = computed(() => {
    return userCart.items.reduce((total, item) => {
      return total + item.price * item.number
    }, 0)
  })
</script>

<template>
  <div class="user-cart">
    <h4>购物车</h4>
    <ul>
      <li v-for="(item, index) in userCart.items" :key="index">
        {{ item.name }}--{{ item.price }}￥ --- {{ item.number }}
      </li>
    </ul>
    <div>总共：{{ userCart.totalBooks }}本</div>
    <div>总价：{{ totalPrice }}元</div>
  </div>
</template>
```

> hook 和 pinia 结合得如此完美，如此方便，很美妙。

::: tip 问题
useCart 把状态放在 hook 外部（变成全局变量），当和 pinia 结合时，可以放在内部吗？
:::

> 可以。

这个特点非常棒，意味着不是用于**共享全局状态**的 hook即普通hook，不做任何改动也能方便地通过 pinia 实现共享全局状态。pinia 和 hook 和结合，没有侵入性。

> 一个 store 只会注册一次, `CartDemo.vue` 再次挂载，不会再次注册。要是二个参数是一个 hooks, hooks 内的初始化操作不会再次执行，这个行为和 hooks 的行为不同，很可能导致 bug。

比如下面的代码：

```ts
function useTestHooks(type='hook') {
  const { adcd } = useUser() // 组件初始时，获取用户行政区
  console.log('useTestHooks', 'zqj log ',type)
  return {
    adcd,
  }
}
export {
  useTestHooks
}
```

下面的 useTestHooks 函数，**每次组件挂载前**，都会执行。

```HTML
<script setup lang="ts">
  import {
    useTestHooks
  } from '@/hooks'
  const {
    adcd
  } = useTestHooks()
</script>
```

当把 useTestHooks 和 `setup store` 结合时，只会执行一次。

```ts
  import {
    useTestHooks
  } from '@/hooks';
  const useTestStore = defineStore('testStore', useTestHooks)
  export {
    useTestStore
  }
```

在组件中使用 `TestStore.vue` ：

```html
<script setup lang="ts">
  import {
    useTestStore
  } from '@/stores'
  const {
    adcd
  } = useTestStore()
</script>
```

> TestStore.vue 第一次挂载，执行 useTestStore，注册 id 为 `testStore` 的 store，后续组件更新，不会再次执行 useTestStore，adcd 就不会更新。

> 也不能传递 type 参数。

### 如何解决上面的问题

> 使用一个工厂函数，组件每次挂载，都会执行工厂函数，返回一个新的 store。

```ts
const createTestStore = (id = 'useTestStore', type) => {
  return defineStore(id, () => {

    return useTestHooks(type)

  })()
}
```

在组件中使用：

```ts
import {
  createTestStore
} from '@/stores'
const {
  adcd
} = createTestStore('newID', 'store')
```

> 每次组价挂载，给它传递一个新的 id，就新建一个全新的 store。

> 这种方案，也不好，要是组件挂载多次，就会创建多个 store，这个 store 也不会被销毁，但是可以手动销毁的 API。下个版本，会解决这个问题。

参考：

[Passing arguments to useStore()](https://github.com/vuejs/pinia/discussions/826)

[How to pass an argument to Pinia store?](https://stackoverflow.com/questions/71583063/how-to-pass-an-argument-to-pinia-store)

[Add ability to destroy stores](https://github.com/vuejs/pinia/issues/557)

## 使用 hook 管理全局状态和 pinia 有何优缺点？

使用 hook 虽然能轻松管理全局状态，但是某些场景还是不如 pinia:

1. hook 无法与 dev-tool 结合，意味着想要查看当前的状态不方便，不好调试；

2. hook 扩展性不如 pinia：pinia 提供了插件扩展接口，能实现一些高级操作，比如统一订阅 store 的变化；

3. 基于 1 原因，更加方便团队协作。

> 什么场景使用 hook 共享全局状态最适合？

在 5 个组件之间共享 3 个左右的状态最好。5 和 3 是经验得到的结论，总之不应大范围使用 hook 共享状态。

## 参考

[Pinia: How to reset stores created with function/setup syntax](https://dev.to/the_one/pinia-how-to-reset-stores-created-with-functionsetup-syntax-1b74)

[Vue 3 + Pinia - User Registration and Login Example & Tutorial](https://jasonwatmore.com/post/2022/07/25/vue-3-pinia-user-registration-and-login-example-tutorial)

## 小结

pinia 和组合式 API 结合得非常好，项目里推荐使用这种方式。

hook 适合小范围共享状态。
