# vue3 watch 最佳实践

项目中在监听数据变化，有时候不生效，又去翻阅文档，watch 和 watchEffect 如何选择才比较好？

这些问题，都挺关键的，现在总结一下比较好的做法。

[[toc]]

## watch

watch 的第一个参数是监听的数据源，有四种形式：

1. ref：`ref`、`computed`;
2. reactive；
3. getter: 返回一值的函数；
4. 以上三种组成的**数组**。

### 监听 ref 和 shallowRef

```HTML
<script setup lang="ts">
  const a = ref(0)
  const b = ref(10)
  watch(a, (a, oldA) => {
    console.log(`watch(a),a:${a},oldA:${oldA}`)
  })
  // 监听不到 ❌ ts 也给出提示
  watch(a.value, (a, oldA) => {
    console.log(`watch(a),a:${a},oldA:${oldA}`)
  })

  watch([a, b], ([a, b]) => {
    console.log(`watch([a, b] ,a:${a},b:${b}`)
  })

  const sum = computed(() => {
    return a.value + b.value
  })

  watch(sum, sum => {
    console.log(`watch(sum) ,sum:${sum}`)
  })

  watch([a, () => b.value + 1000], ([a, sum]) => {
    console.log(`watch([a, () => b.value + 1000] a:${a} sum:${sum}`)
  })

  function changeA() {
    a.value += 1
    b.value += 10
  }

  const numList = shallowRef([1, 2, 3])

  function changeNumList() {
    // numList.value.push(10, 20, 30)  // NOTE 无法改变 ❌
    numList.value = [...numList.value, 10, 20, 30]
  }

  watch(numList, numList => {
    console.log(numList, `watch(numList), numList: ${numList}`)
  })

  function changeNumList2() {
    numList.value = ['10', '20', '30']
  }
  const shallowA = shallowRef({
    a: {
      b: {
        c: 10,
      },
    },
    d: 100,
  })
  watch(shallowA, val => {
    console.log('watch(shallowA): ', val)
  })
  watch(
    () => shallowA.value.a,
    val => {
      console.log('watch(() => shallowA.value.a): ', val)
    }
  )

  function changeShallowA() {
    shallowA.value = {
      // @ts-ignore
      e: 1000,
    }
  }
</script>

<template>
  <div>
    <h2>watch ref</h2>
    <p>a:{{ a }}</p>
    <p>b:{{ b }}</p>
    <p>sum:{{ sum }}</p>
    <button @click="changeA">changeA</button>
    <h2>watch shallowRef</h2>
    <p>shallowA:{{ shallowA }}</p>
    <button @click="changeShallowA">changeShallowA</button>
    <h2>watch array</h2>
    <p>numList:{{ numList }}</p>
    <button @click="changeNumList">changeNumList</button>
    <button @click="changeNumList2">changeNumList2</button>
  </div>
</template>
```

> 最佳实践

1. 监听 ref： `watch(ref)` 或者 `watch(computedRef)`

2. 监听 shallowRef：`watch(ref)` 或者 `watch(computedRef)`

3. 关于 ref 的修改，使用`ref.value = newValue`，即直接重置，可有效降低心智负担。

比如上面的数组添加，numList 是一个 `shallowRef` ，使用数组方法 `numList.value.push(10, 20, 30)` 添加，不会改变 `numList` 。使用 `push` 、 `pop` 等改变数组的方法修改数组，是监听不到的。

 `numList.value = [...numList.value, 10, 20, 30]`

修改对象某个属性：

```js
  shallowA.value = {
    ...shallowA.value,
    a: {
      b: 'this is a.b '
    },
    // @ts-ignore
    e: 1000,
  }
```

### 关于 reactive 和 shallowReactive 的监听

* 监听整个 reactive，直接写，`watch(person)`，不添加 `{deep: true}`，是默认深度监听的；
* 使用函数返回整个 reactive：`watch(()=>({..person}))`, 默认浅层监听的，监听深层属性，添加`{deep:true}`；
* 监听 reactive 的单个属性，使用函数返回，监听多个属性，使用数组：`watch(person.age) watch([()=>person.age, ()=>person.name])`

> 不能直接侦听响应式对象的属性值

```js
const obj = reactive({
  count: 0
})

// 错误，因为 watch() 得到的参数是一个 number ❌
watch(obj.count, (count) => {
  console.log(`count is: ${count}`)
})
// 应该这样监听：提供一个 getter 函数 ✅
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  }
)
```

> shallowReactive 只是第一层属性是响应式的，添加 `{deep:true}` ，也监听不到深层次属性。

### watch 的第三个参数

watch 的第三个参数，是一个配置对象

```js
watch(reactiveVariable, effectCallback, {
  deep: true, // 监听深层属性
  immediate: true， // 立即执行 effectCallback
  flush: 'post', // vue 组件更新后执行 effectFn，默认 vue 组件更新之前执行 effectCallback
})
```

> flush?: 'pre' | 'post' | 'sync'; 

> 何时使用 `{flush:'post'}` ？希望在 `effectCallback` 中获取到新的 DOM 时，比如 effectCallback 中涉及 DOM 的操作。

## watchEffect

侦听器的回调使用与依赖源完全相同的响应式状态是很常见的，此时可使用 watchEffect：

```js
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```

watchEffect 立即执行的特点相当于立即执行的 `watch` 。

```js
watch(todoId, async (newTodoId) => {
  // totoId.value 和 newTodoId 是相同的
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${newTodoId}`
  )
  data.value = await response.json()
}, {
  immediate: true
})
```

> 侦听器是如何两次使用 todoId ? 一次是作为依赖源，另一次是在回调中，可使用 `watchEffect` 简化：

```js
watchEffect(async () => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
})
```

> watchEffect 不会深度监听

```js
const person = reactive({
  name: 'jack',
  age: '',
  deep: {
    city: 'GuiYang',
  },
})
console.log('----->', 'zqj log')
watchEffect(() => {
  const refPerson = toRefs(person)
  console.log(refPerson, 'zqj log toRefs')
})

watchEffect(
  () => {
    const refPerson = toRefs(person)
    console.log(refPerson, 'zqj log toRefs  deep: true')
  }, {
    deep: true,
  }
)

watchEffect(() => {
  console.log(person, 'zqj log')
})

watchEffect(
  () => {
    console.log(person, 'zqj log deep: true')
  }, {
    deep: true,
  }
)

watchEffect(() => {
  const city = person.deep.city
  console.log(city, 'zqj log')
})

setTimeout(() => {
  person.deep.city = 'Beijing'
}, 2000)

setTimeout(() => {
  person.deep = {
    city: 'ChengDu',
  }
}, 4000)
```

> 四个 watchEffect 的回调都会立即执行，两秒后，只有第三个 watchEffect 的回调执行。

> 注意，watchEffect 不支持深度监听，需要深度监听，使用 `toRefs` 。

2 秒后，只有

```js
watchEffect(() => {
  const city = person.deep.city
  console.log(city, 'zqj log')
})
```

的回调执行。

4 秒后，执行的回调有：

```js
watchEffect(() => {
  const refPerson = toRefs(person)
  console.log(refPerson, 'zqj log toRefs')
})
watchEffect(
  () => {
    const refPerson = toRefs(person)
    console.log(refPerson, 'zqj log toRefs  deep: true')
  }, {
    deep: true,
  }
)
```

> watchEffect 的第二个参数 `{flush:'pre'|'post'|'sync'}` , 用来改变回调执行时机 ，默认是 `{flush:'pre'}` ，vue 组件更新前执行。

`watchPostEffect(callback)` 是 `watchEffect(callback,{post:true})` 的别名。

> 使用 watchEffect 的最佳实践

1. 对于依赖项多：有**多个依赖项**的侦听器来说，使用 watchEffect，可以消除手动维护依赖列表的负担。

2. 深层监听： 侦听一个**嵌套数据结构**中的**几个属性**，watchEffect 可能会比深度侦听器更有效，因为它将只跟踪回调中被**使用到的属性**，而不是递归地跟踪所有的属性。

3. 立即执行：希望监听器回调立即执行时使用。

4. **惰性执行**副作用和希望**获取旧值**时，不要使用。

## ref vs reactive

两者对比

| reactive                     | ref                           |
| ---------------------------- | ----------------------------- |
| ✅ script 和 template 无差别 | ❌ script 中需要使用 `.value` |
| ❌ 只支持对象和数组          | ✅ 任意类型                   |
| ❌ 传递函数会丢失响应式      | ✅ 传递函数不会丢失响应式     |
| ✅ 直接返回属性              | ✅ 使用 `.value` 访问属性     |
| ❌ 解构丢失响应式            | ❌ 解构丢失响应式             |

> ref 会显示得使用 `.value` 返回，会让一眼看出是响应式变量，监听也更加方便；

> 直接使用 `ref` ，修改时使用 `.value = newValue` ，更加接近 `immutability` 特性，心智负担小；

> 监听变化，ref 比 reactive 心智负担更加小，监听 reactive 的深层次属性，需要添加 `{deep:true}` , ref 不用。

## watch vs watchEffect

### 相同点

1. 返回值都是一个用于停止监听的函数；

```js
const postID = ref(1)
const post = ref()

const stopWatchEffect = watchEffect(async () => {
  const [error, data] = await http.get(`http://localhost:3001/posts/${postID.value}`);
  !error && (post.value = data)
})

setTimeout(() => {
  // 取消监听，在修改 postID 之前
  stopWatchEffect()
}, 2000)

setTimeout(() => {
  // watchEffect 的回调不再执行
  postID.value = 2
}, 3000)
```

> 同步的 watch 和 watchEffect，vue 会自动停止监听，异步地执行 watch 和 watchEffect 才需要开发者手动停止。

2. cleanUp 的回调可清除副作用

用法:

```js
watchEffect(callback)

function callback(cleanUp) => {
  // cleanUp 回调会在 callback 之前执行
  cleanUp(() => {
    // 可以在此清除副作用
  })
  // do some effect
}

watch(deps, callback2)

function callback2(newDeps, old, cleanUp) {
  // cleanUp 回调会在 callback 之前执行
  cleanUp(() => {
    // 可以在此清除副作用
  })
  // do some effect
}
```

以 watch 为例，看看 cleanUp 如何取消请求：

```js
import http from '@jack/http'

const postID = ref(1)
const post = ref()

watch(postID, callback, {
  immediate: true
})

async function callback(newID, oldID, cleanUp) {
  let lastController
  console.log('callback ')
  cleanUp(() => {
    console.log('cleanUp 回调会在 callback 之前执行 ', '可以在此取消正在进行的请求')
    lastController?.abort()
  })
  lastController = new AbortController()
  const [error, data] = await http.get(`http://localhost:3001/posts/${newID}`, {}, {
    signal: lastController.signal,
  })
  lastController = null;
  !error && (post.value = data)
  const [error, data] = await http.get(`http://localhost:3001/posts/${newID}`, {}, {
    signal: lastController.signal,
  })
  lastController = null;
  !error && (post.value = data)
}
setTimeout(function() {
  postID.value = 2
}, 9)
setTimeout(function() {
  postID.value = 3
}, 10)
```

在 9 毫秒后修改依赖，postID 为 1 的 http 还没返回，被 `cleanUp` 的回调取消。

同理，postID 为 3 时，会取消 postID 为 2 的请求。

![](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/WX20230818-031317@2x.png)

> 如果网速极快，也许无法取消 http，可在 chrome 浏览器中开启网络模拟，让网速慢下来。

3. 都可进行调试

[侦听器调试](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html#watcher-debugging)

### 不同点

主要区别是 watchEffect 无法**惰性执行**副作用和**获取旧值**。

### 到底使用哪个呢？

经验法则：

**必须**使用 watch 的场景：

1. 获取旧值；
2. 惰性执行副作用；

可以使用 watchEffect 的常场景：

1. 依赖源对多 3 个的**立即执行**；
2. 不需要旧的**立即执行**；
3. 深层监听比较麻烦的时候。

> watchEffect 的副作用是立即执行的。

## watch 和 watchEffect 误用

常见的误用：

1. 在回调函数中修改数据源，容易导致死循环

```js
watch(() => source.value,
  n => {
    // 修改数据源
    sources.value = []
    if (!n) return
    // 修改数据源 ...
  })
```

## 小结

1. 优先使用 ref：心智负担小，监听和重置都很方便，一眼能看出时响应式变量；
2. watchEffect 和 watch 的 cleanUp 回调里可清除副作用；
3. 惰性执行副作用和获取旧值，必须使用 watch;
4. 当需要执行**深层监听**和**依赖源较多**的**立即执行**的副作用，watchEffect 更好；
