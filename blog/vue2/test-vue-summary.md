# vue2 组件测试总结

## 测试异步代码

jest 测试代码是同步的，在断言之前需要等待异步代码之前完，vue 组件中的异步代码有两种：
* vue 异步更新 DOM；
* 外部函数的异步调用，比如 setTimeout、fetch 等。

### vue 异步更新 DOM

当一个响应式数据变化后，要断言这个变化，需要等待 DOM 更新后才能断言。可使用 `vm.$nextTick` 、 `Vue.nextTick` ，更加简洁明了的方式是 `await` 那个更新状态的方法，比如 `await input.setValue('update input')` 。

可以被 `await` 的方法有：

* setProps
* setDate
* trigger
* setValue
* setChecked
* setSelected

### 外部函数的异步调用

常见是的 http 调用，比如 fetch、axios、vuex的action等。这种情况下，需要使用 `mock` 模拟外部调用，而不是真的让异步调用执行，比如 `jest.mock('axios')` 。

使用 `flush-promises` 包，flush-promises 会刷新所有处于 pending 状态或 resolved 状态的 Promise。

> 为何不使用 `await` 或者 `await Vue.$nextTick()` ？

Vue 更新其组件和完成其 Promise 对象的时机不同。

一个易于遵循的规则是在诸如 trigger 或 setProps 的变更时始终使用 await。如果你的代码依赖一些诸如 axios 的异步操作，也要为 flushPromises 加入一个 await。
