import { createApp, h } from 'vue'
import App from './App.vue'
// @ts-ignore
import wrapper from 'vue3-webcomponent-wrapper'
import HelloWorld from './components/HelloWorld.vue'

const WebHelloWorld = wrapper(HelloWorld, createApp, h)

window.customElements.define('web-hello-world', WebHelloWorld)

import { setupRouter } from './route/index'

const app = createApp(App)

// 全局配置
// app.config.compilerOptions.isCustomElement
// 全局属性
app.config.globalProperties.appName = 'my vue3 demo'

function plugin() {
  console.log('vue plugin')
}

app.use(plugin)

// 全局混入
app.mixin({
  beforeCreate() {
    console.log('beforeCreate')
  },
})

// 注册全局组件
app.component('GlobalComponent', {})
// app.directive('') // 全局指令
// 引入自定义组件
// const script = document.createElement('script')
// script.type = 'module'
// script.src = 'https://unpkg.com/stencil-rating-component-test'
// document.head.appendChild(script)

// BUG vite 不支持这种写法
// info https://github.com/ionic-team/stencil/issues/2827
// import { defineCustomElements } from 'stencil-rating-component-test/loader'
// defineCustomElements().then(() => {})
// defineCustomElements(window, {
//   // @ts-ignore
//   ce: (eventName, opts) => new CustomEvent(eventName.toLowerCase(), opts),
// })

setupRouter(app)
app.mount('#app')
