/*
 * @Date        : 2023-02-18 20:50:43 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-07-22 01:34:38
 * @LastEditors : ZhouQiJun
 * @Description : 导出组件
 */
import JButton from './Button'
import JToggle from './Toggle'

const components = [JButton, JToggle]

const install = Vue => {
  if (install.installed) return Vue

  components.forEach(com => {
    Vue.use(com)
  })
  // 或者
  // components.forEach(component => {
  //  Vue.component(component.name, component)
  // })
  install.installed = true
  return Vue
}

// NOTE 导出 install 方法，可实现全局注册所有组件
// import  jackUI  from 'jack-ui-vue'
// Vue.use(jackUI)
const jackUI = {
  install,
}

// NOTE 导出组件，用于按需加载
// export { JButton } from './jack-ui-vue'
// Vue.use(JButton)
export { JButton, JToggle }

export default jackUI
