/*
 * @Description : 导出组件
 * @Date        : 2023-02-18 20:47:09 +0800
 * @Author      : JackChou
 * @LastEditTime: 2024-05-14 11:18:59
 * @LastEditors : ZhouQiJun
 */
import JButton from './JButton.vue'

JButton.install = Vue => {
  Vue.component('JButton', JButton)
  return Vue
}

export default JButton
