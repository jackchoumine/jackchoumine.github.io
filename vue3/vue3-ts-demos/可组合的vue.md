# 可组合的 vue

> 什么是组合式的 API?

vue3 引入的组织组件代码的方式。

vue2 语法

```html
<script>
  export default {
    name: "Demo",
    data() {
      return {
        count: 1,
      }
    },
    computed: {
      addTen() {
        return this.count + 10;
      }
    }
  }
</script>
```

vue3 的语法：

<!-- 例子 -->

> 对象式 API 存在的问题

1. 和上下文 this 强绑定，冗余代码
2. 逻辑复用困难，mixin 等依然有问题
3. 类型支持不足，代码提示弱，不利于多人开发
4. 按照 API 划分一业务代码，阅读困难

> 组合式 API 解决以上问题

1. 不绑定 this，代码精简
2. 复用容易---这些 api 是函数,**生命周期也能多次使用**
3. ts 支持好，利于多人开发
4. 按照功能组织代码，易读
5. 响应式系统可独立使用

## 可组合的函数

可复用的逻辑集合，实现**关注点分离**

## Ref vs Reactive

```js
import {
  ref
} from 'vue'
let a = 0
let b = ref(0)
a = 10
b = 10 // ❌ error
b.value = 10 // ✅
```

 `reactive`

```js
import {
  reactive
} from 'vue'
const a = {
  prop: 0
}
const b = reactive({
  prop: 0
})
a.prop = 10 // ✅
b.prop = 10 // 不会报错  ✅
```

> FIXME 如何重置 Reactive?

### Ref

> 优点

* 显示调用，类型检查，**明确知道是否为响应式数据**
* 比 Reactive 局限少

> 缺点

* `.value` 具有一定的心智负担，反自觉

### Reactive

> 优点

* 自动解开(unwrap), 不需要`.value` 【函数不会自动解包】

> 缺点

* 类型和一般对象没区别，难以知道是否为响应式数据
* **ES6 解构，丢失响应式**
* 需要使用箭头函数包装才可`watch`

### 如何降低 `.value` 的心智负担?

Ref 自动解包的情况

* 作为 watch 的监听对象自动解包， 回调返回解包后的值

```js
const count = ref(0)
// watch(count.value) ❌ 不用 .value 否则监听不到
watch(count, (newVal, oldVal) => {
  console.log(newVal, oldVal)
})
```

* 模板中自动解包

```html
<div>{{count}}</div>
<p>{{ count.value }}</p>
<!--❌ 错误用法-->
```

* Reactive 包裹 Ref，Ref 解包

```js
const count = ref(0)
const obj = reactive({
  count,
  name: 'Mason'
})
console.log(obj.count) // 0
```

### Ref 的反操作 `unref` --- 手动解包

```js
function unref(r: Ref < T > | T) {
  return isRef(r) ? r.value : r
}
// 返回 非响应式的值
// FIXME toRaw 是什么作用？
// Proxy vs Ref
// isProxy vs isRef
```

> 技巧：使用 Ref 作为参数，返回 Ref

为何返回 Ref: 可直接在模板中使用，不必关心 `.value`

```ts
// 普通函数
function sum(a: number, b: number) {
  return a + b
}
const c = sum(1, 2) // 3

// 接收 ref 作为参数，返回 ref
function sum(a: Ref<number>, b: Ref<number>): Ref<number> {
  return computed(() => {
    return a.value + b.value
  })
}
const a = ref(3)
const b = ref(4)
const c = sum(a, b)
c.value // 7

// 更进一步，接收两种类型的值，返回 Ref
function sum(a: Ref<number> | number, b: Ref<number> | number): Ref<number> {
  return computed(() => {
    return unref(a) + unref(b)
  })
}
```

> 技巧：MaybeRef

```ts
type MaybeRef<T> = Ref<T> | T

export function useTimeAgo(time: Date | number | string | Ref<Date | number | string>) {
  return computed(() => {
    return someFormat(unref(time))
  })
}
// 简化
type DateType = Date | number | string
export function useTimeAgo(time: MaybeRef<DateType>) {
  return computed(() => {
    return someFormat(unref(time))
  })
}
```

### 让函数更加灵活

```js
import {
  useTitle
} from '@vueuse/core'
const title = useTitle('')
title.value = 'Hello World' // 希望页面 title 随着赋值改变

// TODO 如何使用和实现?
const name = ref('hello')
const title = computed(() => {
  return `${name.value} world`
})
// 参数是一个依赖于其他响应式数据的 ref,依赖变化，title 改变，触发useTitle内部的监听函数，更新 document.title
useTitle(title)
```

实现

```ts
function useTitle(newTitle: MaybeRef<string>) {
  const title = ref(newTitle | document.title)
  watch(
    title,
    (_title) => {
      if (_title) document.title = _title
    },
    { immediate: true }
  )
  return { title }
}
```

> 技巧：重复使用 Ref

将一个 ref 传递给 ref，会原样返回。

```ts
const foo = ref(1)
const bar = ref(foo)
foo == bar // true
function useFoo(foo: Ref<string>) {
  const bar = isRef(foo) ? foo : ref(foo)
  // 简便写法
  const bar = ref(foo)
}
```

> 编写参数类型不确定的函数时，特别有用

### 总结

* `MaybeRef<T>` 配合 Ref 和 unref；
* 使用 ref() 得到 Ref；
* 使用 unref 得到普通值。

## ref 组成的对象

返回 Ref 组成的对象，可获得 Ref 和 Reactive 的好处。

```js
function useMouse() {
  return {
    x: ref(x),
    y: ref(y),
  }
}
// 使用方式
const {
  x,
  y
} = useMouse() // 解构
// 把 x y 聚合，可读性好
const position = reactive(useMouse()) // 使用 reactive 包装
position.x === x.value // true
```

好处：

* 避免解构丢失响应性
* 希望自动解包，使用 Reactive 转为对象

## 将异步操作变成同步代码

```js
// 异步代码
const data = await fetch(url).then((r) => r.json())
// use data
```

> 同步写法

```js
const {
  data
} = useFetch(url).json()
const user_url = computed(() => data.value?.user_url)
```

先建立数据之间的 `连接关系` 或者 `依赖关系` , 再等待异步返回结果，触发有依赖关系的数据变化。

```ts
import { shallowRef, Ref, unref } from 'vue'
declare type MaybeRef<T = unknown> = Ref<T> | T
export function useFetch<T>(url: MaybeRef<string>) {
  const data = shallowRef<T | undefined>()
  const error = shallowRef<Error | undefined>()

  fetch(`${unref(url)}?api_key=feb97d79-2a3e-400e-9223-6ceca9d5593d`)
    .then((res) => res.json())
    .then((res) => (data.value = res))
    .catch((err) => {
      console.error(err)
      error.value = err
    })
  //NOTE data 和 error 都是 Ref，变化后模板更新
  return { data, error }
}
```

用法：

```js
const {
  data,
  error
} = useFetch('https://api.thecatapi.com/v1/categories3')
return {
  error,
  data,
}
```

### 副作用自动清除

`watch` 和 `computed` 在组件销毁时自动解除对依赖的监听。写函数时可遵循同样的模式。

```ts
import { onUnMounted } from 'vue'

function useOn(event: any, target: EventTarget, handler: any) {
  target.addListener(event, handler)
  onUnMounted(() => {
    target.removeListener(event, handler)
  })
}
```

> 生命周期函数可多次使用。

### 状态共享

组合式 API 非常灵活，可独立于组件使用和共享。

```ts
import { reactive } from 'vue'

export const state = reactive({ age: 10 })
// 30:00
```

> FIXME provide and inject

### useVModel

<!-- FIXME: 如何使用 -->

<!-- 37：00 -->

<!-- https://www.proyy.com/6994694671905587214.html -->
