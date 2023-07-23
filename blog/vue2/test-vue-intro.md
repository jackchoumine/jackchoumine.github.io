# vue 应用测试

[[toc]]

## 前端测试简介

软件测试：检查软件是否按照预期工作的过程。

测试分类：

从是否需要手动测试来分：

* 手动测试：需要人工操作，比如点击按钮，输入文字等。
* 自动测试：写代码测试其他代码，不需要人亲自手动测试每一个功能。

前端测试，从测试的范围来分：

1. 端到端测试

测试整个应用，从用户角度出发，**浏览器自动**测试整个应用是否按照预期工作。是自动执行的手动测试，加快手动测试的速度。

* 优点：测试全面，测试结果可靠。
* 缺点：① 测试速度慢 ② 调试困难 ③ 可能成为 flakey 测试 ④ 编写测试代码的成本高。

> flakey 测试：即使程序没有问题，测试也会失败。

2. 单元测试

对应用的小部分进行的测试。比如测试一个函数，一个组件等。

* 优点：① 测试速度快 ② 调试方便 ③ 编写测试代码的成本低 ④ 提供文档功能，可通过测试用例了解代码的行为 ⑤ 稳定，有助于重构。
* 缺点：测试范围小，测试结果不可靠。

> 重构：不改变代码的功能，但是改变代码的结构，目的是为了提高代码质量。

3. 快照测试

快照测试会给运行中的应用程序拍一张图片，并将其与以前保存的图片进行比较。如果图像不同，则测试失败。这种测试方法对确保应用程序代码变更后是否仍然可以正确渲染很有帮助。

各种测试在前端测试中的占比

![](https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/front-end-test.png)

> 为何没有集成测试？

前端的集成测试，难以定义、编写和调试，通常认为端到端测试就是集成测试。

> 什么时候不需要自动化测试？

自动化测试的目的是为了节省时间和精力，**长期开发**的**规模较大**的项目自动化测试才会带来巨大的收益。如果项目只是一个小项目，或者是一个短期项目，那么自动化测试可能会带来负担，即编写测试代码会比直接编写应用代码更花时间。

实际上，在我的工作中，前端进行自动化测试的团队都很少，大部分都是手动测试。

> 不必追求 100% 的测试覆盖率

除非一个 bug 导致了严重的后果，比如损失几百万元，否则不必追求 100% 的测试覆盖率。因为测试代码也是需要维护的，测试代码的维护成本也是需要考虑的。

## 组件测试

组件有很多属性，决定测试哪些属性很重要，能帮助编写高效的测试代码。

> 如何决定测试哪些属性？

**组件的输入和输出**（有人叫组件契约或者组件接口）可帮助决定测试哪些属性。

从开发人员使用组件但又不了解组件具体实现的角度来编写测试，好的组件单元测试应该始终可触发一个输入，并断言一个输出。

常见的组件输入：

1. 用户操作，比如点击按钮，输入文字等；
2. props；
3. 组件事件；
4. vuex store 中的数据。

常见的输出：

1. 触发的事件；
2. 外部调用的方法，即公有方法；
3. 渲染结果。

## 第一个测试

已经存在一个使用 `vue-cli` 创建的项目，希望添加测试。

1. 安装 vue 测试插件：

```bash
vue add @vue/cli-plugin-unit-jest
```

2. 编写 HelloWorld.vue 组件：

安装完毕会自动配置测试环境，并创建了一个测试 `HelloWorld.vue` 的用例，但是项目里没有 HelloWorld.vue，在 `tests/unit` 就近新建一个。

```html
<script>
  export default {
    name: 'HelloWorld',
    props: {
      msg: {
        type: String,
        default: '',
      },
    },
    data() {
      return {}
    },
  }
</script>

<template>
  <div>{{ msg }}</div>
</template>
```

然后引入组件：

```js
import HelloWorld from './HelloWorld.vue'
```

3. 运行测试

执行 `npm run test:unit` ，测试环境是否配置成功。

> 可用性（sanity）测试

搭建测试系统的第一步是编写一个简单的测试来检查系统是否配置正确。这被称为**可用性（sanity）测试**。

在排查复杂问题或者配置环境时，可用性测试应该成为第一个测试用例，因为它能检查环境是否配置正确。

> 就近放置测试文件

将单元测试放置在尽可能接近被测代码的位置，会更容易被其他开发人员找到。

### 避免误报

误报：测试始终通过，但是实际上程序有 bug。

> 测试通过，是因为源代码按照预期工作，而不是编写始终通过测试的测试代码。

异步代码经常出现误报，因为测试代码没有等待异步代码执行完毕，就开始断言。

```js
test('始终通过的测试', () => {
  // TODO 如何编写 runner
  // runner.start()
  // setTimeout(() => {
  //   expect(runner.finished).toBe(true)
  // }, 1000)
})
```

### 如何组织测试代码

`describe` 函数用于组织测试代码，describe 用于定义一组测试用例，每个测试用例都是一个 `test` 函数。

```js
describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: {
        msg
      },
    })
    expect(wrapper.text()).toMatch(msg)
  })
  test('始终通过的测试', () => {
    // TODO 如何编写 runner
    // runner.start()
    // setTimeout(() => {
    //   expect(runner.finished).toBe(true)
    // }, 1000)
  })
})
```

当运行测试时，会在控制台**格式化输出** describe 和 test 的一个参数，方便查看测试结果。

一个文件可写多个 describe，describe 可嵌套，

> 推荐的做法是一个文件只写一个 describe，describe 不嵌套。

否则会降低测试代码的可读性和新加的测试用例的不知道放在哪个 describe 里面。

> 测试代码和源代码挨近，方便他人查看。

### 挂载组件

vue 单文件组件经过编译后，是一个**有渲染函数的对象**，要测试组组件是否正确，需要开启渲染过程，这个过程称为挂载。

```js
new Vue({
  render: h => h(App),
}).$mount('#app')
```

使用 `new` 新建一个 vue 实例，然后调用 `$mount` 方法，传入一个 DOM 元素，vue 会将组件渲染到这个 DOM 元素中。

希望挂载组件，就需要将**组件对象**转成构造函数，组件对象无法直接挂载。

```js
const Ctor = Vue.extend(HelloWorld) // 使用 Vue.extend 将组件对象转成构造函数
const vm = new Ctor({
  propsData: {
    msg
  },
})
vm.$mount() // 挂载组件
expect(vm.$el.textContent).toMatch(msg)
```

> jest 在 jsdom 环境中运行，jsdom 是一个模拟浏览器环境的库，它提供了一些浏览器环境的全局变量，比如 window、document 等。
> 所以能直接挂载组件。

jsdom 实现了**大多数 DOM API**，它完全是由运行在 DOM 中的 JavaScript 编写。使用 jsdom 替代真正的浏览器可以使测试运行变得更快。

### vue-test-utils

手动挂载组件，代码量较多，[vue-test-utils](https://v1.test-utils.vuejs.org/zh/) 提供了一些 API，方便测试 vue 组件。

mount 方法，该方法在接收一个组件后，会将其挂载并返回一个包含被挂载组件实例（vm）的**包装器对象**。

> 知道为什么 mount 不直返回 Vue 实例（vm）而是返回包装器?

mount 返回的包装器不仅包含 Vue 实例，还包括一些辅助方法，你可以使用它们来**设置 props**，**检查实例属性**以及**操作实例**。

常用的包装器方法：

1. text 方法：返回包装器的文本内容。
2. html 方法：返回包装器的 HTML 内容。
3. find 方法：返回包含指定选择器的第一个 DOM 元素的包装器。
4. findAll 方法：返回包含指定选择器的所有 DOM 元素的包装器。
5. setData 方法：设置组件的 data 属性。
6. setProps 方法：设置组件的 props 属性。
7. trigger 方法：触发指定的事件。
8. vm 属性：返回包装器的 Vue 实例。

shallowMount 方法，该方法与 mount 方法类似，但是它不会渲染组件的子组件。

## 如何调试测试用例

1. 使用 vscode 扩展

`Jest Runner` 可以在 vscode 中运行测试用例，方便调试。

> 推荐使用

2. 在 chrome 浏览器调试

开启 jest 调试模式，新加一个脚本：

```bash
"test:debug": "node --inspect-brk node_modules/.bin/vue-cli-service test:unit",
```

<!-- TODO 没成功 https://weread.qq.com/web/reader/d013215071ff30aad01f5e4kd9d320f022ed9d4f495e456  -->

3. 在 vscode 中调试

<!-- TODO 还没找到配置方法 -->

## 参考

[Jest 单元测试环境搭建](https://www.aligoogle.net/pages/343eae/#%E4%B8%80-%E4%BE%9D%E8%B5%96%E8%AF%B4%E6%98%8E)

[Vue.js unit test cases with vue-test-utils and Jest](https://blog.octo.com/vue-js-unit-test-cases-with-vue-test-utils-and-jest/)

[](https://mayashavin.com/articles/testing-components-with-vitest)

[](https://blog.logrocket.com/guide-vitest-automated-testing-vue-components/)

[](https://vueschool.io/lessons/learn-how-to-test-vuejs-lifecycle-methods)

[](https://blog.canopas.com/vue-3-component-testing-with-jest-8b80a8a8946b)

[Guide to Unit Testing Vue Components](https://testdriven.io/blog/vue-unit-testing/)

[All Vue Content](https://fjolt.com/category/vue)
