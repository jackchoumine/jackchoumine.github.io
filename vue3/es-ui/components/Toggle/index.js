/*
 * @Description : 导出 JToggle
 * @Date        : 2023-02-18 21:35:28 +0800
 * @Author      : JackChou
 * @LastEditTime: 2024-05-14 11:19:21
 * @LastEditors : ZhouQiJun
 */
import JToggle from './JToggle.vue'

JToggle.install = Vue => {
  Vue.component('JToggle', JToggle)
  return Vue
}

export default JToggle
