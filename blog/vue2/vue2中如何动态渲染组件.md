# vue2 中如何动态的渲染组件

vue2 的项目中，main.js 文件中有一个挂载 `App.vue` 组件的方法：

```js
new Vue({
  name: 'Root',
  render: h => h(App),
}).$mount('#app')
```

`new Vue` 创建了一个 Vue 实例，通过实例方法 `$mount` 方法将 `App` 组件挂载到 `#app` 上，这样就实现了App.vue 的渲染。

> App.vue 渲染出来的模板会把 `#app` 替换掉。

> App.vue 导出后是一个普通对象，没有 `$mount` 方法，而 Vue 实例有 `$mount` 方法。

> 问题：我们可通过这样的方式动态地渲染一个组件吗？

答案是可以的。 通过 `Vue.extend` + `$mount` 动态挂载组件。

## 动态渲染组件

既然可动态渲染一个组件，把这个过程封装成一个函数，可通过**函数调用**的方式渲染组件。
下面的代码，当用户点击按钮时，会动态渲染一个 `el-button` 组件。

```html
<script>
  import {
    Button
  } from 'element-ui'
  import Vue from 'vue'
  export default {
    name: 'DemoOne',
    methods: {
      showElButton() {
        const SubVue = Vue.extend(Button)
        const ButtonInstance = new SubVue({
          propsData: {
            type: 'primary'
          },
        })
        ButtonInstance.$slots = {
          default: 'el-button',
        }
        ButtonInstance.$mount(this.$refs.container)
      },
    },
  }
</script>
<template>
  <div>
    <h2>动态挂载组件</h2>
    <button @click="showElButton">显示el-button</button>
    <div>
      <div ref="container"></div>
    </div>
  </div>
</template>
```

### 代码解读

> Vue.extend 是什么作用？

`Vue.extend` 接收一个组件对象，用于创建一个 Vue 的子类。 `Vue.extend` 返回的是一个 Vue 的子类，而不是一个 Vue 的实例。

> new SubVue 是什么作用？

`new SubVue` 创建了一个 `Button` 组件的实例 `ButtonInstance` ，方便调用实例方法。

> ButtonInstance.$mount(this.$refs.container) 是什么作用？

 将 `ButtonInstance` 挂载到 `this.$refs.container` 上，即将 `el-button` 渲染到页面上。
通过 `Vue.extend` 和 `$mount` 方法，实现了动态地渲染组件。
了解了动态渲染组件的原理，我们可以通过函数调用的方式，动态地渲染组件。

### 通过函数调用渲染组件

上面的例子中 `showElButton` 方法局限了在组件内部，我们可以将这个方法抽离出来，挂载到 Vue 原型上，就可以在全局调用。

类似这样调用： `this.$showElButton(params)`

```js
// showElButton.js
import {
  Button
} from 'element-ui'
import Vue from 'vue'

export function showElButton(target, {
  type = 'primary',
  label = 'el-button'
} = {}) {
  const SubVue = Vue.extend(Button)
  const ButtonInstance = new SubVue({
    propsData: {
      type
    },
  })
  ButtonInstance.$slots = {
    default: label,
  }
  ButtonInstance.$mount()
  target.appendChild(ButtonInstance.$el)
}
```

> 代码解读

没有给 `$mount` 方法传递挂载的目标元素，而是在挂载目标元素中追加了 `ButtonInstance.$el` ，实现每点击一次渲染一个。

在 main.js 中挂载方法：

```js
Vue.prototype.$showElButton = showElButton
```

使用 `this.$showElButton` 方法：

```html
<script>
  export default {
    name: 'DemoOne',
    methods: {
      showElButton() {
        this.$showElButton(this.$refs.container)
      },
    },
  }
</script>

<template>
  <div>
    <h2>动态挂载组件</h2>
    <button @click="showElButton">显示el-button</button>
    <div>
      <div ref="container"></div>
    </div>
  </div>
</template>
```

> 效果

![vue2 动态地渲染组件](https://cdn.jsdelivr.net/npm/zqj-pics/vue2/%E5%8A%A8%E6%80%81%E6%B8%B2%E6%9F%93%E7%BB%84%E4%BB%B6-1.gif)

## 封装一个函数调用的二次确认弹窗

了解了如何通过函数调用渲染组件，可以封装一个二次确认弹窗， 用户确认后再进行下一步操作。

弹窗组件如下： `ConfirmModal.vue`

```html
<template>
  <div v-if="show" class="modal">
    <div ref="myModalContent" class="modal-content">
      <div>{{ title }}</div>
      <slot name="default">
        <div>{{ content }}</div>
      </slot>
      <slot name="footer">
        <div class="footer">
          <button @click="onCancel">取消</button>
          <button @click="onConfirm">确定</button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ConfirmModal',
    props: {
      title: {
        type: String,
        default: '确定操作吗？',
      },
      content: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        show: false,
      }
    },
    methods: {
      onCancel() {
        this.show = false
      },
      onConfirm() {
        this.show = false
      },
    },
  }
</script>

<style lang="less">
  .modal {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99; // 确保弹窗在顶层
    width: 100%;
    height: 100%;
    background-color: #e4e4e4c7;

    &-content {
      position: relative;
      left: 50%;
      top: 50%;
      width: 20vw;
      height: 100px;
      z-index: 999; //
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // align-items: flex-end;
      background-color: #fff;

      .footer {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
</style>
```

`showConfirm` :

```js
import Confirm from './ConfirmModal.vue'
import Vue from 'vue'

const ConfirmClass = Vue.extend(Confirm)

let confirmInstance = null

const showConfirm = (content = '插槽内容', title = '弹窗标题', options = {}) => {
  if (!confirmInstance) {
    confirmInstance = new ConfirmClass({
      el: document.createElement('div'),
      propsData: {
        content: content,
        title,
      },
    })
  }
  // NOTE 设置组件 data 为 true，内部 div 渲染
  confirmInstance.show = true
  // console.log(confirmInstance)
  document.body.appendChild(confirmInstance.$el)
  return confirmInstance
}

export default showConfirm
```

> 关键代码解读

```js
// 设置 confirmInstance 的 data 为 true，内部 div 渲染
confirmInstance.show = true
// 将 confirmInstance.$el 挂载到 body 上
document.body.appendChild(confirmInstance.$el)
```

在 main.js 中挂载方法：

```js
import showConfirm from './showConfirm'
Vue.prototype.$showConfirm = showConfirm
```

使用 `this.$showConfirm` 方法：

```html
<template>
  <div>
    <el-button type="danger" @click="onRemoveSomething">删除</el-button>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {}
    },
    methods: {
      onRemoveSomething() {
        this.$showConfirm('删除后不能恢复', '确定删除吗？')
      },
    },
  }
</script>
```

效果：

![vue2 动态地渲染组件](https://cdn.jsdelivr.net/npm/zqj-pics/vue2/%E5%8A%A8%E6%80%81%E6%B8%B2%E6%9F%93%E7%BB%84%E4%BB%B6-2.png)

### 如何让外部知道用户点击了取消还是确定呢？

还有一个关键问题，如何让外部知道用户点击了取消还是确定呢？

> 方法1：通过回调函数

给 `showConfirm` 函数传递一个回调函数，当用户点击确定时，执行回调函数。

改造 ConfirmModal.vue，内部的方法不要写死，而是在 `showConfirm` 函数中提供。

```js
// ConfirmModal.vue 内部不提供 onCancel 和 onConfirm 方法
methods: {
  // onCancel() {
  //   console.log(this.$options)
  //   this.show = false
  //   return false
  // },
  // onConfirm() {
  //   return true
  // },
}
// showConfirm 提供 onCancel 和 onConfirm 方法
const showConfirm = (
  content = '插槽内容',
  title = '弹窗标题',
  options = {}
) => {
  if (!confirmInstance) {
    confirmInstance = new ConfirmClass({
      el: document.createElement('div'),
      propsData: {
        content: content,
        title,
      },
    })
  }
  // 设置组件 data 为 true，内部 div 渲染
  confirmInstance.show = true

  // onConfirm 和 onCancel 方法
  confirmInstance.onConfirm = () => {
    options.onConfirm()
    confirmInstance.show = false
  }
  confirmInstance.onCancel = () => {
    options.onCancel()
    confirmInstance.show = false
  }
  console.log(confirmInstance)
  document.body.appendChild(confirmInstance.$el)
  return confirmInstance
}
```

使用 `showConfirm` 函数：

```js
this.$showConfirm('删除后不能恢复', '确定删除吗？', {
  onConfirm: () => {
    console.log('确定')
  },
  onCancel: () => {
    console.log('取消')
  },
})
```

> 方法2: showConfirm 返回一个 Promise

先看使用方式：

```js
this.$showConfirm('删除后不能恢复', '确定删除吗？').then(isOk => {
  if (isOk) {
    console.log('确定')
  } else {
    console.log('取消')
  }
})
```

showConfirm 函数：

```js
const showConfirm = (content = '插槽内容', title = '弹窗标题', options = {}) => {
  if (!confirmInstance) {
    confirmInstance = new ConfirmClass({
      el: document.createElement('div'),
      propsData: {
        content: content,
        title,
      },
    })
  }
  // 设置组件 data 为 true，内部 div 渲染
  confirmInstance.show = true

  // 返回一个 Promise
  const p = new Promise((resolve, reject) => {
    confirmInstance.onConfirm = () => {
      confirmInstance.show = false
      resolve(true)
    }
    confirmInstance.onCancel = () => {
      confirmInstance.show = false
      resolve(false)
    }
  })
  document.body.appendChild(confirmInstance.$el)
  return p
}
```

相比回调函数，Promise 更加直观，使用更加方便。

## 思考

element-ui 的 `this.$message` 方法，是如何实现调用后在页面上显示消息的？

## 小结

1. 了解 new Vue 的作用；
2. 结合 Vue.extend 和 $mount 方法，实现动态渲染组件；
3. 通过函数调用的方式，动态渲染组件；
4. 封装一个二次确认弹窗，用户确认后再进行下一步操作；
