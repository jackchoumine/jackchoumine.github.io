# 如何写好 hooks

```html
<template>
  <div>
    <p>count:{{ count }}</p>
    <p>doubleCount:{{ doubleCount }}</p>
    <p><button @click="increase">加一</button></p>
  </div>
</template>

<script lang="ts">
  import { ref, reactive, watch, computed, toRefs, defineComponent } from 'vue'
  type dataPropsType = {
    count: number
    doubleCount: number
    increase: () => void
  }
  export default defineComponent({
    name: 'Demo',
    setup(props, { emit, attrs, slots }) {
      const dataProps: dataPropsType = reactive({
        count: 0,
        increase: () => dataProps.count++,
        doubleCount: computed(() => dataProps.count * 2),
      })
      return {
        ...toRefs(dataProps),
      }
    },
  })
</script>
```

> 方案一 `使用 ref`

```ts
import { computed, ref } from 'vue'
function useCount() {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increase() {
    count.value += 1
  }

  return {
    count,
    doubleCount,
    increase,
  }
}
```

使用

```html
<template>
  <div>
    <p>count:{{ counter.count }}</p>
    <p>doubleCount:{{ counter.doubleCount }}</p>
    <p><button @click="counter.increase">加一</button></p>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useCount } from '../hooks'
  export default defineComponent({
    name: 'Demo',
    setup() {
      const counter = useCount()
      console.log(counter) // count doubleCount 属性是具有响应性
      return { counter }
    },
  })
</script>
```

优点：

1. useCount 返回一个 `counter` 对象， 能好地区分了数据的来源，当使用 useCount 的组件的 setup 返回值比较复杂时，这个好处更加明显。

缺点：

1. useCount 定义使用 ref，相关的状态被打散，当 useCount 比较复杂时，缺点更加明显。

> 方案二 `使用 reactive 聚合相关状态，函数即行为独立`

`useCount`

```ts
import { computed, reactive, toRefs } from 'vue'

type dataPropsType = {
  count: number
  doubleCount: number
}

function useCount() {
  const dataProps: dataPropsType = reactive({
    count: 0,
    doubleCount: computed(() => dataProps.count * 2),
  })
  // NOTE 将函数独立出来
  function increase() {
    console.log('increase')
    dataProps.count++
    console.log(dataProps.count)
  }
  return {
    // NOTE 解构后失去响应性
    // count: dataProps.count,
    // doubleCount: dataProps.doubleCount,
    ...toRefs(dataProps),
    increase,
  }
}
```

使用同上。

优点：

1. useCount 返回一个 `counter`对象， 能好地区分了数据的来源，当使用 useCount 的组件的 setup 返回值比较复杂时，这个好处更加明显。

2. 相关的状态聚合了，代码比 ref 更加紧凑。

缺点：

1. 行为和状态被分开了。

> 方案三 `reactive 聚合状态和行为`

`useCount`

```ts
import { computed, reactive, toRefs } from 'vue'

type dataPropsType = {
  count: number
  doubleCount: number
  increase: () => void
}

function useCount() {
  const dataProps: dataPropsType = reactive({
    count: 0,
    increase: () => {
      dataProps.count++
    },
    doubleCount: computed(() => dataProps.count * 2),
  })
  return {
    ...toRefs(dataProps), // 不加 increase，在模板中使用 counter.increase.value
    increase: dataProps.increase, // 解构出 increase 在模板中使用 counter.increase
  }
}
```

优点：

1. 状态和行为实现聚合；

缺点：

1. useCount 的返回值变得复杂了；

可这样简化 useCount 的返回值：

```ts
import { computed, reactive, toRefs } from 'vue'

type dataPropsType = {
  count: number
  doubleCount: number
  increase: () => void
}

function useCount() {
  const dataProps: dataPropsType = reactive({
    count: 0,
    increase: () => {
      dataProps.count++
    },
    doubleCount: computed(() => dataProps.count * 2),
  })
  return {
    ...toRefs(dataProps), // NOTE 在模板中使用 counter.increase.value 获取 increase
  }
}
```

使用方式

`获取函数必须使用 .value，反直觉，不易用`

```html
<template>
  <div>
    <p>count:{{ counter.count }}</p>
    <p>doubleCount:{{ counter.doubleCount }}</p>
    <!-- NOTE 获取函数必须使用 .value -->
    <p><button @click="counter.increase.value">加一</button></p>
  </div>
</template>

<script lang="ts">
  import { ref, reactive, watch, computed, toRefs, defineComponent } from 'vue'
  import { useCount } from '../hooks'
  export default defineComponent({
    name: 'Demo',
    setup() {
      const counter = useCount()
      console.log(counter) // increase 属性具有响应性
      return { counter }
    },
  })
</script>
```

## 其他技巧

1. hooks 可返回 computed, setter getter
2. setup 在组件声明周期中只执行一次，就建立了数据和逻辑的连接。
