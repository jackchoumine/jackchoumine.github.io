/*
 * @Description: 入口文件
 * @Date: 2020-12-22 21:05:26 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-03-18 15:55:36 +0800
 * @LastEditors: JackChou
 */
import { createApp } from 'vue'
import App from './App.vue'
import { registerComponents } from './components'
// 使用这个组件库
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
// TODO 接受根组件或者组件定义对象作为参数,返回一个应用实例
// 整个组件树共享相同的上下文,可在应用挂载之前设置全局属性、注册全局组件、注册插件、注册全局指令等
// createApp 返回应用实例本身,可链式调用
const app = createApp(App)
// registerComponents(vue)
app.use(registerComponents, app).use(Antd)
// 将应用的根组件挂载到 DOM 元素上，根组件是组件树的渲染起点。
// TODO 如何理解渲染起点？？
// NOTE mount 不返回应用实例，而是根组件实例，需要在最后调用
const root = app.mount('#app')
// console.log(root)
