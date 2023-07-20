# vue 应用测试方法

掌握适当的测试方法可让测试用例的编写高效，且在失败时能给出具体的失败原因。

在对 vue 单文件组件进行测试时，有选择地测试某些特性非常重要，如果把组件的所有特性都测试一遍，将会导致低效。

## 如何确定你需要哪些特性？

组件契约：即组件的输入和输出。**测试就是从组件使用者的角度，给一个明确的输入，判断输出是否符合预期。**

根据组件契约决定编写哪些测试。

> 那组件的输入和输出有哪些?

输入：

- props

- 用户交互，比如点击按钮

- vue 事件，(是自定义事件吗)

- vuex 中的数据

> inject 、网络请求结果算输入吗？

输出：

- 组件渲染结果

- 发射出的事件。emit 触发的事件

- 外部函数调用，比如 http 请求

## Jest 测试框架简介

测试文件：以 .spec.js 或者 .test.js 结尾。

Jest 在查找项目中测试文件时使用默认的 glob 匹配模式。对于 non-glob 模式而言，这意味着 Jest 匹配**tests**目录中的.js 和.jsx 文件，以及扩展名为 .spec.js 或 .test.js 的所有文件。

> globs 是文件匹配模式。Jest 使用 Node glob 模块匹配文件。你可以在如下链接页面的 glob primer 部分中阅读到更多关于 globs 的内容，[glob-primer](www.npmjs.com/package/glob#glob-primer)。

### Jest 编译单文件组件

Jest 只能识别 cjs 的代码，需要将单文件组件转化成 cjs 的代码，jest 才能对其进行测试。

需要两个依赖：babel-jest vue-jest

配置：

```json
{
  "jest": {
    "transform": {
      "^.+\\.js$": "babel-jest",
      "^.+\\.vue$": "vue-jest"
    }
  }
}
```

<!-- 作用如下： -->

### 如何组织测试代码

测试文件应当尽可能挨近近被测试代码，这样方便他人阅读组件时就近找到测试用例。

比较推荐的实践：组件单独放在一个目录里，然后在该目录下新建一个**units**目录，用来放单元测试代码。

### 测试文件里如何组织代码？

describe 函数将多个单元测试用例定义为一个测试套件。当你在命令行运行测试时，Jest 会格式化输出，以便你了解哪些测试套件通过，哪些测试套件失败。describe 函数中的代码称为 describe 代码块。

> 不要嵌套使用 describe，会让测试代码难以理解。

`test`表示一个测试用例。

两个参数：

第一个参数是一个字符串，用于标识测试报告中的测试，用来对你的测试做讲要的说明，方便你的阅读测试报告。

第二个参数是包含测试代码的函数。

> it 是它的别名 xit 表示跳过这个测试用例，在跳过某些正在或者不想要测试的用例时特别有用。

expect 函数返回值是一个 Jest 匹配器对象。

常用的匹配器有哪些。

<!-- TODO -->

## 如何避免程序误报？

测试中，需要避免误报。测试之所以通过，是因为源代码正常工作，而不是因为编写始终能通过的测试。

常见的误报测试是使用**异步代码**。

```js
test('sets finished to true after 100ms', () => {
  runner.start()
  setTimeout(() => {
    expect(runner.finished).toBe(true) // 100ms 后 finished 为true
  }, 100)
})
```

> 避免误报的最好方法是使用 TDD。

红色阶段是编写一个**因正确原因**而失败的测试。这里的关键词是“因正确原因”，即确定程序失败的边界条件。

测试驱动开发（TDD）是一种在编写源代码之前先编写测试代码的工作流程，即在编写组件代码之前，需要先编写能够确保组件正常运行的测试代码。

“红、绿、重构” 是一种很流行的 TDD 方法。红代表编写一个不能通过的测试，绿代表让测试通过，在测试通过后，通过重构增强代码可读性。

以这样的方式开发应用程序会有如下好处。首先，你只编写测试功能的源代码，从而保持较少的源代码量；其次，它可以使你在编写代码之前先考虑组件设计。

## 组件挂载

Vue 组件在渲染到页面上之前，需要一个挂载的动作。

Vue2 组件挂载的方式：

1. 在组件选项中指定 el。

2. 使用 Vue 构造器动态挂载。

`new Vue(componentOptions).$mount(el)`

`new Vue.extend(componentOptions).$mount(el)`

Vue.extend 接收一个组件选项，然后返回一个构造器。

> 使用 Vue.extend 手动挂载组件，也是 vue2 中实现弹窗的方式，即新建一个和 body 同级的 div，然后把组件挂载到这个 div，从而让组件的渲染结果脱离组件的嵌套关系。

```js
import Vue from 'vue'
const App = {
  props: {
    count: Number,
  },
  data() {
    return { msg: 'hello', innerCount: 0 }
  },
  methods: {
    add() {
      this.innerCount += 1
    },
  },

  template: /*html*/ `
  <div v-if="count % 2 === 0">count:{{count}}. count is even.</div>
  <div v-else>count:{{count}}. count is odd.</div>
  <button @click="add">{{innerCount}}</button>
  `,
}

describe('App', () => {
  it('挂载App', () => {
    const Ctor = new Vue.extend(App)
    const app = new Ctor()
    app.$mount()
  })
})
```

Vue3 的挂载方式：

1. createApp

```js
const app = createApp(App)
app.mount('#app')
```

使用 createApp 挂载一个弹窗。

```html
<template>
  <div class="modal-container">
    我是弹窗组件
    <button type="button" @click="close">点击我关闭</button>
  </div>
</template>

<script>
  import { ref, onMounted, reactive, watch, computed, defineComponent } from 'vue'
  export default defineComponent({
    name: 'Modal',
    components: {},
    setup(props, { emit, attrs, slots }) {
      onMounted(() => {
        console.log('onMounted')
      })
      function close() {
        const modal = document.querySelector('.modal')
        document.body.removeChild(modal)
      }
      return { close }
    },
  })
</script>

<style>
  .modal {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 200px;
    z-index: 1000;
    background-color: #ccc;
  }
  .modal-container {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background-color: red;
  }
</style>
```

在某个组件内执行 mountModal 挂载显示弹窗。

```js
function mountModal() {
  const div = document.createElement('div')
  div.className = 'modal'
  document.body.appendChild(div)
  const modal = createApp(Modal)
  modal.mount(div)
}
```

[参考问题](https://forum.vuejs.org/t/vue-extend-equivalent-in-vue-3/123148)

2. 瞬移组件 Teleport

Jest 是在 jsdom 库创建的浏览器环境中运行测试。jsdom 是一个 DOM 实现，它完全是由运行在 node 中的 JavaScript 编写。使用 jsdom 替代真正的浏览器可以使测试运行变得更快。

手动挂载组件需要固定操作，每次要这样挂载，有点繁琐。

好在有 vue-test-utils 测试库，会让 Vue 组件的单元测试变得更容易。它包含的一些辅助方法可以实现组件挂载、与组件交互以及断言组件输出。你将在你的单元测试中大量使用到此库，因此了解 API 非常重要。

## vue-test-utils 的挂载

mount 方法挂载组件，返回包含组件实例的包装器。

为什么 mount 不直返回 Vue 实例（vm）而是返回包装器？

mount 返回的包装器不仅包含 Vue 实例，还包括一些辅助方法，你可以使用它们来设置 props，检查实例属性以及对实例执行操作。

mount 会挂载整棵组件树。

shalllowMount 只会挂载一层组件。

<!-- TODO -->

> 你可以使用 Vue Test Utils 编写各种测试。例如，测试单击按钮是否会打开弹出窗口，或者提交表单是否会向服务器发送 POST 请求。

> 怎么写？

## 如何调试测试代码

### 在 chrome 中调试测试代码

编辑脚本：

```json
{
  "test:debug": "node --inspect-brk ./node_modules/jest/bin/jest.js --no-cache --runInBand"
}
```

现在开启 Chrome，访问 `chrome://inspect `地址。

你将在 Remote Target 部分中看到 node_modules/jest/bin/jest.js。

点击`inspect`, 会跳到打断的的代码。

### 在 vscode 中调试

<!-- TODO 待查询 -->
