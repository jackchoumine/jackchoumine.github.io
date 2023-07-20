# vue-next-webpack-preview

> Minimal webpack setup for Vue 3 (RC)

This is for preview purposes. There might be bugs and undocumented behavior differences from v2, which are expected.

If you are using VSCode, Vetur isn't updated to take advantage of Vue 3's typing yet so intellisense in Vue files may not be fully functional (especially in templates).

Also note that this is for configuration reference only. For real-world projects, it's recommended to use [`vite`](https://github.com/vitejs/vite) or [`@vue/cli`](https://github.com/vuejs/vue-cli).

### Prerequisites

- Node & NPM

### Install

```sh
npm install
```

### Usage

##### Develop

```sh
# run dev server at localhost:8080
npm run dev
```

##### Build

```sh
# transpile js for deployment
npm run build
```

## setup

`setup` 函数是一个新的组件选项，是组件的入口。

```ts
interface Data {
  [key: string]: unknown
}

interface SetupContext {
  attrs: Data
  slots: Slots
  emit: (event: string, ...args: unknown[]) => void
}

function setup(props: Data, context: SetupContext): Data
```

> 参数：

1. 第一个参数 props，是响应式的，`不要解构，否则失去响应式`。

2. 第二个参数是上下文对象，暴露了`attrs`、`slots`、`emit` 属性，可通过解构获取。attrs 和 slots 都是内部组件实例上对应项的代理，可以确保在更新后仍然是最新值。

> 返回值

返回一个对象，该对象中包含在模板中使用的`数据`、`事件处理函数`。

返回函数，该函数返回一个渲染函数，在渲染函数中可是响应式数据。

**返回的响应式数据在模板中自动解开，需要`.value`**

> 关于 this，setup 中为 undefined。

> 调用时机

props 初始化后立即调用，先于`beforeCreate`调用。

在模板中使用 setup

```html
<template>
  <div class="setup-one">
    <h1>setup</h1>
    <p>分数：{{ count }}</p>
    <div>年纪：{{ age }}</div>
    <a-button @click="onChangeAge">修改年纪</a-button>
  </div>
</template>
<script>
  import { computed, defineComponent, ref } from 'vue'
  export default defineComponent({
    name: 'SetupOne',
    props: {
      mark: Number,
    },
    setup(props) {
      const age = ref(0)
      const count = computed(() => props.mark * 0.5)
      function onChangeAge() {
        console.log(this) //NOTE setup 中的this 是 undefined
        age.value = Math.random() * 50 // ref 的数据使用 .value 访问
      }
      return { age, onChangeAge, count }
    },
  })
</script>
<style scoped lang="scss"></style>
```

使用渲染函数

```html
<script>
  import { defineComponent, ref, h } from 'vue'
  export default defineComponent({
    name: 'SetupTwo',
    props: {
      mark: Number,
    },
    setup(props) {
      const count = ref(0)
      return () => h('div', [count.value, '--', h('span', [props.mark])])
    },
  })
</script>
<style scoped lang="scss"></style>
```

> 还不知道如何配置 JSX 的支持。

## watch

vue3 中提供了 watch 函数，用于监听响应式数据。

```js
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  name: 'WatchTest',
  setup(props, { emit, attrs, slots }) {
    const count = ref(0)
    const unWatch = watch(count, (value, oldValue) => {
      if (value === 6) {
        unWatch()
        console.log(timer)
        clearInterval(timer)
      }
      console.log(value, oldValue)
    })
    const timer = setInterval(() => {
      count.value += 2
      if (count.value === 10) {
        unWatch()
      }
    }, 2000)
    return { count }
  },
})
```

## vue3 中的 $attrs $listeners

> $attrs 包含传递给组件的`非props`,包括 style|class|事件监听器,会自动添加到组件的根元素.

2.x 中的 $attrs 不包含 style|class|事件监听器.

> 设置 `inheritAttrs: false,`后,可手动决定 `$attrs` 绑定到哪个元素上.

> 在 setup 中拿不到 $attrs, attrs 和 $attrs 属性是一样的.

```html
<template>
  <div>
    <input v-bind="$attrs" />
  </div>
</template>
<script>
import { defineComponent, } from 'vue'
export default defineComponent({
  name: 'MyInput',
  props: {
    size: {
      type: Number,
    },
  },
  inheritAttrs: false,
  setup(props, { emit, attrs, slots }) {
    console.log('props')
    console.log(props)
    console.log('attrs')
    console.log(attrs)
    console.log('$attrs')
    // console.log($attrs) //NOTE 没定义就使用,报错 not defined
    return {}
  },
  mounted() {
    console.log('this.$attrs')
    console.log(this.$attrs)
  },
})
```

> 3.x 中不再有 $listeners,而是在 `$attrs` 中, 以`on`前缀的属性是事件处理器.

```html
<MyInput
  :size="20"
  :disabled="false"
  v-model:value="inputValue"
  @input="onInputValue"
  class="test"
  style="color: red"
/>
```

## 自定义事件 --- emits

3.x 提供了`emits`选项,用于声明组件的自定义事件,和 props 类似.

数组语法:

```js
emits: ['check'],//元素为自定义事件名
```

对象语法:

```js
emits: {
  // eventName: ƒ
  check: params => {
    // 检查自定义事件抛出的数据是否满足要求
    return ['check params'].includes(params)
  }
}
```

```html
<template>
  <div class="my-button">
    <button class="button" @click="onClick" style="margin: 0 50px; padding: 35px 0">button</button>
  </div>
</template>
<script>
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'MyButton',
    setup(props, { emit, attrs, slots }) {
      const onClick = event => {
        console.log('原生事件')
        emit('click', "I'm emit")
      }
      return { onClick }
    },
    mounted() {
      console.log('MyButton----$attrs')
      console.log(this.$attrs)
    },
  })
</script>
<style scoped>
  .my-button {
    background-color: bisque;
  }
  .button {
    background-color: lightsalmon;
  }
</style>
```

使用 MyButton 组件:

```html
<template>
 <MyButton @click="onClick" />
</template>
<script>
import { onErrorCaptured } from 'vue'
export default {
  name: 'App',
  setup() {
    const onClick = params => {
      console.log('自定义事件抛出的数据:')
      console.log(params)
    }
    return { onClick }
  }
}
```

`.native` 事件修饰符已经移出,点击按钮,`MyButton` 上的事件处理器执行两次:

1. `emit` 触发执行;
2. 按钮上的点击事件冒泡到组件根元素,触发根元素上的监听器执行.

> margin 不属于元素,点击 button 的 margin 不会触发自定义事件.

如何防止两次执行?

1. 声明自定义事件:

```js
  emits: {
    // eventName:ƒ
    click: params => {
      if (typeof params === 'string') {
        console.log('验证自定义事件抛出的数据')
        return true
      } else {
        return false
      }
    },
  },
```

> 声明自定义的事件,可读性好,不会破坏继承属性的挂载,同时能对自定义事件抛出的数据进行校验.

2. 在原生事件中停滞事件冒泡

```js
const onClick = event => {
  console.log('原生事件')
  emit('click', "I'm emit")
  event.stopPropagation()
}
```

该方案在点击根元素时,仍然会触发根元素上的事件处理器. 如果不想点击根元素执行事件处理器时,不适合.

3. 防止继承属性绑定到组件根元素---从组件根元素移除事件监听

```js
inheritAttrs: false,
```

没有声明的事件会包含在`$attrs` 对象中,默认绑定到组件根元素,`inheritAttrs: false,`可取消默认绑定行为.

组件根元素不再监听父组件传入的事件,同时也不自动绑定其他原生的属性,比如 style.

## v-model

3.x 中,在原生的 DOM 上使用 v-model, 和 2.x 一样的.

- text 和 textarea 元素使用 value property 和 input 事件；
- checkbox 和 radio 使用 checked property 和 change 事件；
- select 字段将 value 作为 prop 并将 change 作为事件。

在自定义组件上使用`v-model`发生了变化.

1. prop 和事件默认名称已更改, prop -→ modelValue event -→ update:modelValue, 且在使用时可指定 prop.

2. 同一个组件可使用多个`v-model`.

```html
<ChildComponent v-model="pageTitle" />

<!-- 是以下的简写: -->

<ChildComponent :modelValue="pageTitle" @update:modelValue="pageTitle = $event" />
```

支持定义 prop 参数和使用多个`v-model`:

```html
<ChildComponent v-model:title="pageTitle" v-model:content="pageContent" />

<!-- 是以下的简写： -->

<ChildComponent
  :title="pageTitle"
  @update:title="pageTitle = $event"
  :content="pageContent"
  @update:content="pageContent = $event"
/>
```

[详细用法](https://v3.cn.vuejs.org/guide/component-custom-events.html#v-model-%E5%8F%82%E6%95%B0)

3.  移出`.sync`双向绑定语法,2.x 中该语法是,`update:propName`的语法糖.

```html
<ChildComponent :title.sync="pageTitle" />

<!-- 替换为 -->

<ChildComponent v-model:title="pageTitle" />
```

4. 支持自定义修饰符.

自定义修饰符:

2.x 版本中提供了`.trim`|`.number`等内置的修饰符,可定义输入值进行处理,3.x 可自定义修饰符.

修饰符是通过 prop `modelModifiers` 并在`update:propName` 事件发送数据之前,对数据进行更改实现的.

对于带参数的 v-model 绑定，生成的 prop 名称将为 arg + "Modifiers".

使用修饰符处理输入的金额,要求用户在输入数值时,转为千分位显示.
