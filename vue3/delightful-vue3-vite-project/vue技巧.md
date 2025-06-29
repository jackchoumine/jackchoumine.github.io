# vue 技巧

## 如何一次绑定多个 prop 和事件

`v-bind` 和 `v-on`

```html
<!-- binding an object of attributes -->
<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

<!-- pass down parent props in common with a child component -->
<MyComponent v-bind="$props" />
<!-- 当不带参数使用时，可以用于绑定一个包含了多个 attribute 名称-绑定值对的对象。 -->

<!-- prop binding. "prop" must be declared in the child component. -->
<MyComponent :prop="someThing" />
```

[vue3 文档 v-bind](https://cn.vuejs.org/api/built-in-directives.html#v-bind)

v-on 还支持绑定不带参数的事件/监听器对的对象。请注意，当使用对象语法时，不支持任何修饰符。

```html
<!-- 对象语法 -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button>
```

[vue3 文档 v-on](https://cn.vuejs.org/api/built-in-directives.html#v-on)

## 加强 prop 验证

props 声明使用对象写法，必要时再使用 validator 加强验证。

```js
const props = defineProps({
  type: {
    type: String,
    default: 'primary',
    validator: value => ['primary', 'danger', 'info'].includes(value),
  },
})
```

## toRef 设置默认值

```js
const person = reactive({ name: 'John', age: 12 })
const ageRef = toRef(person, 'age')
const cityRef = toRef(person, 'city', 'GuiYang') // 提供默认值
```

> toRef 的返回值会和其第一个参数保持同步，修改其中一个，另一个受到影响。

> toRef 传递给组合函数，是非常强大的用法，比如从 props 中获取某些 prop `useHttp('/hello',toRef(props,'name'))`

## 暴露组件的私有属性

ref 获取 setup 函数的返回值

```html
<script>
  export default {
    setup() {
      const modalIsOpen = ref(false)
      return { modalIsOpen }
    },
  }
</script>
```

通过`ref`访问 modalIsOpen 属性。

```html
<script setup>
  const HelloWorldCom = ref()
  onMounted(() => {
    console.log('HelloWorldCom.value.modalIsOpen')
    console.log(HelloWorldCom.value.modalIsOpen)
    setTimeout(() => {
      // HelloWorldCom.value 是一个对象，具有 setup 函数返回的对象属性
      HelloWorldCom.value.modalIsOpen = true
    }, 4000)
  })
</script>

<template>
  <HelloWorld ref="HelloWorldCom" />
</template>
```

不想完全暴露 setup 函数的返回值，可使用 `expose`属性指定暴露的属性：

```html
<script>
  export default {
    expose: ['modalIsOpen'],
    setup() {
      const modalIsOpen = ref(false)
      return { modalIsOpen }
    },
  }
</script>
```

通过 ref 只能访问到`modalIsOpen`，其他属性访问不到。

> [vue 文档的 expose](https://cn.vuejs.org/api/options-state.html#expose)

还可以从 setup 的 context 中使用 expose 函数暴露属性：

```js
  setup(_, { expose }) {
    // make the instance "closed" -
    // i.e. do not expose anything to the parent
    // expose()

    const publicCount = ref(0)
    const privateCount = ref(0)
    // selectively expose local state
    expose({ count: publicCount, exposeVar: '暴露的变量' })
    return {  }
  }
```

> [setupContext 暴露属性](https://vuejs.org/api/composition-api-setup.html#setup-context)

`script setup` 中 --- `defineExpose` 暴露属性

选项 api 中，组件的属性是完全暴露的，而 `script setup`中是完全封闭的，除非使用`defineExpose`暴露，否则外部访问不到。

```html
<script setup>
  import { ref } from 'vue'

  const a = 1
  const b = ref(2)

  defineExpose({
    a,
    b,
  })
</script>
```

> [vue 文档中的 defineExpose](https://cn.vuejs.org/api/sfc-script-setup.html#defineexpose)

## 在子组件内部修改插槽样式

> :slotted(selector) 修改插槽样式

子组件

```html
<template>
  <div class="test-slot">
    <h3>使用:slotted 修改插槽样式</h3>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  /* 修改父组件传递过来的额插槽样式 */
  :slotted(.slot) {
    background-color: red;
  }
</style>
```

父组件：

```html
<script setup>
  import TestSlotted from './TestSlotted.vue'
</script>

<template>
  <div class="slotted-test">
    <TestSlotted>
      <div class="slot">测试slotted</div>
    </TestSlotted>
  </div>
</template>

<style scoped lang="scss">
  .slotted-test {
    background-color: #ccc;
  }
</style>
```

> 使用`:slotted` 可在子组件的作用域样式内修改插槽样式。

## 在作用域内的样式暴露为全局样式

```html
<style lang="scss" scoped>
  :global(.slot) {
    background-color: red;
  }
</style>
```

> `:global` 把作用域内的样式暴露到全局。

## 在单文件组件中定义多个组件

1. 使用 jsx

```html
<script setup lang="jsx">
  const SubComponent = defineComponent({
    render() {
      return <div style={{ backgroundColor: 'red' }}>单个文中中定义多个组件</div>
    },
  })
</script>

<template>
  <div>
    <SubComponent />
  </div>
</template>
```

或者

```html
<script setup lang="jsx">
  const SubComponent = () => (
    <div style={{ backgroundColor: 'red' }}>单个文中中定义多个组件</div>
  )
</script>

<template>
  <div>
    <SubComponent />
  </div>
</template>
```

2. 使用内联模板

```html
<script>
  const SubComponent = defineComponent({
    template: /*html*/ `<div style="background-color:red">单个文中中定义多个组件</div>`,
  })
</script>
```

使用了构建工具，vue 默认导出的是不含运行时编译器的代码，使用了内联模板，需要导出带有运行时编译的 vue。

```js
// 导出包含运行时编译器
import { createApp } from 'vue/dist/vue.esm-bundler.js'
```

> 使用`es6-string-html`可获取 template 语法高亮。

推荐使用 jsx 的方式，可读性更好。

> 在组件内定义组件，有哪些使用场景？

看下面一个例子

`MyInput.vue`

```html
<script lang="ts" setup>
  const input = ref('')
</script>

<template>
  <input v-model="input" type="text" placeholder="my input" />
</template>
```

`TestKeepAlive.vue`

```html
<script setup lang="tsx">
  import MyInput from './MyInput.vue'

  const tab = ref('a')
  const comMap = {
    a: MyInput,
    b: MyInput,
  }
  const input = ref('hello')
</script>

<template>
  <div>
    <q-tabs v-model="tab">
      <q-tab name="a" label="A" />
      <q-tab name="b" label="B" />
    </q-tabs>
    <KeepAlive>
      <component :is="comMap[tab]" />
    </KeepAlive>
  </div>
</template>
```

使用 KeepAlive，希望在你切换 tab 的时候，维持输入的数据，但是这样的代码不能实现。

`TestKeepAlive.vue` 修改如下：

```html
<script setup lang="tsx">
  import MyInput from './MyInput.vue'

  const tab = ref('a')
  const MyNewInput = defineComponent({
    setup() {
      return () => <MyInput />
    },
  })
  const comMap = {
    a: MyInput,
    b: MyNewInput,
  }
</script>
```

## 二次封装如何处理插槽

```html
<template>
  <div>
    <ThirdPartyComponent>
      <template v-for="(_,name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps??{}"></slot>
      </template>
    </ThirdPartyComponent>
  </div>
</template>
```

## attr 函数的妙用

```html
<template>
  <div>
    <p :data-text="text">123</p>
    <p>123</p>
    <p>123</p>
    <p>123</p>
  </div>
</template>

<script setup>
  const text = ref('hello')
</script>

<style scoped>
  div p:first-of-type:before {
    content: attr(data-text);
  }
</style>
```

> [mdn attr](https://developer.mozilla.org/zh-CN/docs/Web/CSS/attr)

## webpack 自动注册组件

使用 webpack 或者 vue-cli 创建的项目，可使用`require.context`注册组件。

```js
const req = require.context(dir, (subDir = false), (regExp = /^.\.\//))
// dir: 扫描的目录
// subDir: 是否扫描自目录
// regExp: 匹配文件的正则
// 返回值：req 对象，key 是文件路径
```

自动扫描全局组件，并注册

```js
function registerComponent(
  app,
  options = { dir: './components', subDir: false, regExp: /^Base[A-Z]\w+\.(vue|js|jsx)$/ }
) {
  const req = require.context(options.dir, options.subDir, options.regExp)
  req.keys().forEach(filePath => {
    // 可对组件名字进行转换，转为 PascalCase
    const componentName = filePath.split('/').pop()
    app.component(componentName, req[filePath].default)
  })
  return app
}
// 用法
app.use(registerComponent)
```

## vite 自动注册组件

vite 提供了 `import.meta.glob` ，可使用其读取文件。

比如，读取`views`下的`.vue`文件，生成路由。

```js
function generateRoutes({ keepOriginalNames = ['JSX', 'WC'] } = {}) {
  // { path: ()=>import(path) }
  const modules = import.meta.glob('../views/**/*.vue')

  const routes = Object.keys(modules).map(key => {
    const dashNameMap = {}
    const dashKeys = []
    keepOriginalNames.forEach(name => {
      const dashName = name.toLowerCase().split('').join('-')
      dashKeys.push(dashName)
      dashNameMap[dashName] = name
    })

    const fileName = key.split('/').at(-1).replace('.vue', '')
    let dashCasePath = fileName.replace(/[A-Z]/g, m => '-' + m.toLowerCase()).slice(1)
    const hasDashKey = dashKeys.find(key => dashCasePath.includes(key))
    if (hasDashKey) {
      // 路径中含有专门的大写，不转化
      dashCasePath = dashCasePath.replace(hasDashKey, dashNameMap[hasDashKey])
    }
    // {path:'/about-page',name:'about'}
    // 首页 - 分隔路径，读写性高
    return {
      path: dashCasePath.includes('home') ? '/' : `/${dashCasePath}`,
      name: dashCasePath.replace('-page', ''),
      component: modules[key],
    }
  })
  return routes
}
```

## 如何给 vue3 的全局属性扩展类型以支持全局自定义属性？

<!-- TODO -->

## vue3 + ts 目录无法跳转？

```ts
import { useDebounceRef, useVisibilityChange } from '../../hooks' //可跳转
import { useDebounceRef, useVisibilityChange } from '@/hooks' // 使用路径别名，不可跳转
```

可能的原因：

1. 路径别名没设置好？

[Why does VSCode not pick up path aliases in tsconfig](https://stackoverflow.com/questions/70072923/why-does-vscode-not-pick-up-path-aliases-in-tsconfig)

可能的解决办法：

1. vscode 配置文件设置：

```json
{
  "typescript.disableAutomaticTypeAcquisition": true
}
```

[Enable Go to Implementation in Typescript Editors](https://github.com/microsoft/TypeScript/issues/6209#issuecomment-310578734)

似乎没有用。

[How to intellisense alias module path in VSCode](https://stackoverflow.com/questions/58249053/how-to-intellisense-alias-module-path-in-vscode)

<!-- TODO -->
