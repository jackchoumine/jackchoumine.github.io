/*
 * @Description : 导出 JToggle
 * @Date        : 2023-02-18 21:35:28 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-07-22 01:19:47
 * @LastEditors : ZhouQiJun
 */
import JToggle from './JToggle.vue'

JToggle.install = Vue => {
  if (JToggle.installed) return Vue
  JToggle.installed = true
  Vue.component(JToggle.name, JToggle)
  return Vue
}

export default JToggle
