/*
 * @Date        : 2023-02-18 20:50:43 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-07-20 14:46:02
 * @LastEditors : ZhouQiJun
 * @Description : 导出组件
 */
import JButton from './Button'
import JToggle from './Toggle'

export { JButton, JToggle }

const components = [JButton, JToggle]

const install = Vue => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  return Vue
}

const jackUI = {
  install,
}

export default jackUI
