# vue 代码优化方案

## js 按需加载

webpack、vite 等打包工具往往会把**单页应用**打包成一个 js 文件，浏览器请求这个 js 文件，然后再执行 js 动态生产页面内容，如果 js 文件很大，势必影响加载速度。

打包工具会识别按需加载的文件，把它们分割成单独的文件，需要使用这些文件时，再去加载它们，从而提升访问速度。

### webpack 代码分割

代码分割是实现按需加载的手段，webpack、vite 等工具提供了代码分割的特性。

[webpack 代码分割](https://github.com/jackchoumine/webpack-practice/blob/master/%E5%88%86%E7%A6%BB%E5%85%AC%E5%85%B1%E8%B5%84%E6%BA%90.md)

### import 语句实现按需加载

```js
testClick() {
  console.log('testClick')
  // 魔术注释
  import( /* webpackChunkName: "test" */ './test.js').then(({
    onClick
  }) => {
    onClick()
  })
}
```

> test.js

```js
export const onClick = () => {
  console.log('onClick')
}
export const onClick2 = () => {
  console.log('onClick2')
}
```

> 可添加魔术注释，用于命名按需加载文件，方便在浏览器网络面板查看。

### 路由组件按需加载

```js
{
  path: '/',
  component: () => import( /* webpackChunkName: "layout" */ 'views/index.vue'),
}
```

> component 的值，是一个返回 `import` 的函数，可实现按需加载。

### 异步组件按需加载

vue 允许把组件定义成一个工厂函数，异步地解析组件，实现**需要渲染时**加载组件。

```js
import Vue from 'vue'
// NOTE import 加载组件 ，全局注册
const HelloOne = Vue.component('hello-one', () => import('./HelloOne.vue'))
const HelloTwo = Vue.component('hello-two', resolve => {
  // 使用 require 加载组件
  setTimeout(() => {
    require(['./HelloTwo.vue'], resolve)
  }, 3000)
})
```

```html
<template>
  <div>
    <button @click="testClick">按钮</button>
    <div>
      <!-- 使用 v-if 控制是否渲染 -->
      <HelloOne v-if="showAsync" />
      <HelloTwo />
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  // 全局注册
  const HelloTwo = Vue.component('hello-two', resolve => {
    setTimeout(() => {
      require(['./HelloTwo.vue'], resolve)
    }, 3000)
  })

  export default {
    name: 'FormTableTest',
    components: {
      // NOTE 本地注册
      HelloOne: () => import('./HelloOne.vue'),
      HelloTwo,
    },
    data() {
      return {
        showAsync: false,
      }
    },
    methods: {
      testClick() {
        this.showAsync = true
      },
    },
  }
</script>
```

> 动态组件和异步组件结合使用

> component 的 `is` 属性可以是组件名字，也可以是组件选项即一个组件。

```html
<template>
  <div>
    <button @click="show = false">销毁</button>
    <button @click="switchComponent('componentOne')">组件1</button>
    <button @click="switchComponent('componentTwo')">组件2</button>
    <div>
      <component :is="app" v-if="show"></component>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        app: null,
      }
    },
    methods: {
      switchComponent: function(component) {
        // NOTE app 是一个组件
        this.app = () => import(`./${component}`)
        this.show = true
      },
    },
  }
</script>
```

还可以在 `switchComponent` 中注册全局组件：

```html
<template>
  <div>
    <button @click="show = false">销毁</button>
    <button @click="switchComponent('componentOne')">组件1</button>
    <button @click="switchComponent('componentTwo')">组件2</button>
    <div>
      <component :is="app" v-if="show"></component>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false,
        app: 'App', // NOTE 注意这里的名字
      }
    },
    methods: {
      switchComponent: function(component) {
        // NOTE app 是一个名字
        Vue.component('App', () => import(`./${component}`))

        // 由于 component 改变后视图不会自动刷新, 需要手动刷新, 也可以使用this.$forceUpdate()
        this.show = false
        setTimeout(() => {
          this.show = true
        })
      },
    },
  }
</script>
```

> 用到再去加载组件，加载失败如何处理，vue2.3 提供了更强大的异步组件功能，可设置加载提示组件、错误处理组件和加载时间。

```html
<template>
  <div>
    <button type="primary" @click="myClick">立即执行</button>
    <HelloComponent v-if="show" />
  </div>
</template>

<script>
  import AsyncError from './ErrorComponent.vue'
  import AsyncLoading from './LoadingComponent.vue'
  export default {
    name: 'DebounceTest',
    components: {
      HelloComponent: () => ({
        component: import( /* webpackChunkName: "AsyncComponent" */ './AsyncComponent.vue'),
        loading: AsyncLoading,
        error: AsyncError,
        delay: 4000,
        timeout: 5000,
      }),
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
      myClick(event) {
        this.show = true
      },
    },
  }
</script>
```

或者这样写：

```js
import AsyncError from './ErrorComponent.vue'
import AsyncLoading from './LoadingComponent.vue'
export default {
  name: 'TestAsyncComponent',
  components: {
    // HelloComponent: () => import('./AsyncComponent.vue')
    HelloComponent: () => ({
      component: import( /* webpackChunkName: 'AsyncComponent' */ './AsyncComponent.vue'),
      loading: AsyncLoading,
      error: AsyncError,
      delay: 500 // 500 毫秒后 还没加载到 component 显示 loading 组件
      timeout: 3000 // 3000 毫秒后，还没加载到组件，说明网络超时了，显示 error 组件
    })
  },
  data() {
    return {
      show: false
    }
  },
  created() {
    console.log('hello async')
  },
  methods: {
    loadComponent() {
      this.show = true
    }
  }
}
```

> 总结：异步组件往往和条件渲染一起使用。

以上是 vue2 提供的异步组件使用方式，vue3 提供了一些方式。

### vue3 中异步组件

> 简化的 defineAsyncComponent 定义方式

```js
const StandaloneComponent = defineAsyncComponent(() => import('./Standalone.vue'))
```

StandaloneComponent 在 dev-tool 中显示为 `AsyncComponentWrapper` 。

> 完整的 defineAsyncComponent 定义方式

```js
const CompleteDefineMethod = defineAsyncComponent({
  loader: () => import('./IAmAsyncCom.vue'),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 200, // default: 200 // 显示 loadingComponent 之前的等待时间
  timeout: 3000, // default: Infinity
  suspensible: false, // default: true
  // true -- 开启后优先显示 Suspense 的后备内容 loadingComponent delay errorComponent 配置被忽略。
  // 当异步组件和 Suspense 一起使用时，尤其有用
  onError(error, retry, fail, attempts) {
    // 当加载出错时，尝试再次加载。error 是错误信息 retry 是重试函数 attempts 是尝试加载的次数 fail 不再加载
    if (error.message.match(/fetch/) && attempts <= 3) {
      retry()
    } else {
      fail()
    }
  },
})
```

注意 loader 的写法，是一个返回 `import` 的函数， 其他配置选项都在注释里了。

### 条件渲染触发异步组件加载

```html
<script setup>
  const LoginPopup = defineAsyncComponent(() => import('./LoginPopup.vue'))

  const show = ref(false)

  function onClose() {
    show.value = false
  }
</script>

<template>
  <div>
    <button @click="show = true">Login</button>
    <LoginPopup v-if="show" :on-close="onClose" />
  </div>
</template>
```

### 动态组件触发异步组件加载

```HTML
<component :is="LoginPopup" v-if="show" :on-close="onClose" />
```

> is 可以是一个组件名字或者组件定义。

> `v-for` 中的动态组件如何加载异步组件？

```html
<template>
  <component v-for="(item, index) of items" :key="index" :is="mapTypeComponents[item.type]" v-bind="item" />
</template>

<script>
  import {
    defineAsyncComponent,
    ref
  } from 'vue';

  export default {
    name: 'SearchResult',
    setup() {
      const items = ref([]);
      const mapTypeComponents = {
        product: defineAsyncComponent(() => import('DisplayProduct.vue')),
        service: defineAsyncComponent(() => import('DisplayService.vue')),
        client: defineAsyncComponent(() => import('DisplayClient.vue'))
      };

      const doSearch = async () => {
        // 从接口获取 items
        items.value = await getItems();
      };

      return {
        mapTypeComponents,
        doSearch,
        items
      };
    }
  }
</script>
```

### 动态组件触发异步组件加载方式二

```js
// use shallowRef to remove unnecessary optimizations
const currentIcon = shallowRef('')

import(`componentPath`).then(component => {
  // val is a Module has default
  currentIcon.value = component.default
})
```

> componentPath 可以通过 props 动态传入。

使用场景举例：当点击左侧菜单时，异步加载组件，渲染在右侧。

```html
<script setup>
  const rightComponent = shallowRef()
  const menuList = ref([{
      label: '菜单1',
      path: './menu/One.vue'
    },
    {
      label: '菜单1',
      path: './menu/Two.vue'
    }
  ])

  function onSelectMenu(menu) {
    import(menu.path).then(component => {
      rightComponent.value = component.default
    })
  }
</script>
<template>
  <div>
    <nav class="left">
      <ul>
        <li v-for="menu in menuList" :key="menu.path" @click="onSelectMenu(menu)">{{menu.label}}</li>
      </ul>
    </nav>
    <div class="right">
      <component :is="rightComponent" v-if="rightComponent" />
    </div>
  </div>
</template>
```

### 异步组件和 Suspense

内置组件 `Suspense` 可批量处理具有**异步依赖**的后代组件的异步加载情况：异步挂起状态和完成状态。

两种异步依赖：

1. `async setup`

```HTML
<script setup>
  import {
    ref
  } from 'vue'
  const url = 'https://jsonplaceholder.typicode.com/todos/1'
  const todo = ref()
  const res = await fetch(url)
  todo.value = await res.json()
</script>

<template>
  <div class="AsyncSetup">{{ todo }}</div>
</template>
```

在 `Suspense` 中使用：

```HTML
<Suspense>
  <AsyncSetup />
  <template #fallback>
    <p>todo is loading</p>
  </template>
</Suspense>
```

`fallback` 插槽是异步依赖解析前或者解析失败下渲染的内容。

2. 异步组件

异步组件可放在 `Suspense` 的默认插槽中，加载状态的处理就被 Suspense 接管。

> 如何处理异步依赖加载失败？

Suspense 不支持处理失败情况。使用 `onErrorCaptured` 在使用到 `Suspense` 的组件中捕获错误。

```JS
onErrorCaptured((error, instance, info) => {
  console.log(error)
  console.log(instance)
  console.log(info)
})
```

此时在父组件中处理错误，已经晚了，最佳的实践是在具有异步依赖的组件中处理最好。比如：

```js
const url = 'https://jsonplaceholder12.typicode.com/todos/1'
const todo = ref()
try {
  const res = await fetch(url)
  todo.value = await res.json()
} catch (error) {
  // 错误时展示一个友好的提示
  todo.value = '获取 todo 遇到错误'
}
```

### 参考文章

[vue3 异步组件的使用方式](https://vuejs.org/guide/components/async.html#basic-usage)

[Async Components in Vue 3](https://www.thisdot.co/blog/async-components-in-vue-3)

[Lazy Load Components in Vue with defineAsyncComponent](https://learnvue.co/tutorials/lazy-load-components)

[Dynamic component in Vue3 Composition API](https://stackoverflow.com/questions/65950655/dynamic-component-in-vue3-composition-api)

[How to use dynamic Components in Vue](https://blog.codeminer42.com/how-to-use-dynamic-components-in-vue/)

[Vue 3 Async Components and Bundle Splitting](https://vuejs-course.com/blog/vue-3-async-components-and-bundle-splitting)

### 按需加载的 js 在浏览器是如何加载和执行的？

> 使用 link 标签加载分割的文件。

这些文件最后都是 js，然后通过 link 标签改变加载优先级和缓存请求。

 `<link href="/js/hello.js" rel="prefetch">`

> 按需加载：用到了(点击导航或者下一页时)才加载，优先级低。在网络面板里看不到加载 hello.js，在网络面板的 其他 tab 里，有 hello.js。

 `<link href="/js/hello.js" rel="preload" as="script">`

> 预加载：在页面渲染之前加载，稍后使用(window 的 load 事件触发时使用)，优先级高，需要设置 as 属性。在网络面板，能看到加载 hello.js。稍后不使用，浏览器会提示设置适当的 as 属性。rel=preload 必须设置 as 属性

> link 只是改变资源请求的**优先级**和**缓存请求**，不会真正加载 js 并执行，真正加载并执行的是动态创建的 `script` 标签。

webpack 会在代码里生成一个动态创建 script 的函数：

```js
__webpack_require__.e = function requireEnsure(chunkId) {
  var promises = []

  // JSONP chunk loading for javascript

  var installedChunkData = installedChunks[chunkId]
  if (installedChunkData !== 0) {
    // 0 means "already installed".

    // a Promise means "currently loading".
    if (installedChunkData) {
      promises.push(installedChunkData[2])
    } else {
      // setup Promise in chunk cache
      var promise = new Promise(function(resolve, reject) {
        installedChunkData = installedChunks[chunkId] = [resolve, reject]
      })
      promises.push((installedChunkData[2] = promise))

      // start chunk loading
      var script = document.createElement('script')
      var onScriptComplete

      script.charset = 'utf-8'
      script.timeout = 120
      if (__webpack_require__.nc) {
        script.setAttribute('nonce', __webpack_require__.nc)
      }
      script.src = jsonpScriptSrc(chunkId) // 根据 chunkId 生成 src 链接

      // create error before stack unwound to get useful stacktrace later
      var error = new Error()
      onScriptComplete = function(event) {
        // avoid mem leaks in IE.
        script.onerror = script.onload = null
        clearTimeout(timeout)
        var chunk = installedChunks[chunkId]
        if (chunk !== 0) {
          if (chunk) {
            var errorType = event && (event.type === 'load' ? 'missing' : event.type)
            var realSrc = event && event.target && event.target.src
            error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')'
            error.name = 'ChunkLoadError'
            error.type = errorType
            error.request = realSrc
            chunk[1](error)
          }
          installedChunks[chunkId] = undefined
        }
      }
      var timeout = setTimeout(function() {
        onScriptComplete({
          type: 'timeout',
          target: script
        })
      }, 120000)
      script.onerror = script.onload = onScriptComplete
      document.head.appendChild(script)
    }
  }
  return Promise.all(promises)
}
```

生成标签： `<script charset="utf-8" src="/js/HelloOne.js"></script>` ，从而实现加载 js 脚本并执行。

## 图片懒加载

页面有大量图片，可使用懒加载方式。

[如何检测一个元素是否在视窗中](./如何检测一个元素是否在视窗中.md)

##### 更多阅读

[link 标签的 rel 属性进行性能优化](https://zhuanlan.zhihu.com/p/150231042)

[MDN link 标签](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link)

[link type preload](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload)

## 参考

[vue 按需动态异步加载组件的几种方法](https://blog.csdn.net/weixin_39547883/article/details/109387571)
