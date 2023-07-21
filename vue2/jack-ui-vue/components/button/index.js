/*
 * @Description : 导出组件
 * @Date        : 2023-02-18 20:47:09 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-07-22 01:07:16
 * @LastEditors : ZhouQiJun
 */
import JButton from './JButton.vue'

// NOTE 给组件添加 install 方法，可实现单独全局注册: Vue.use(JButton)
JButton.install = Vue => {
  if (JButton.installed) return Vue
  // NOTE 技巧：在函数内给自己添加属性，函数是一个特殊的对象
  JButton.installed = true
  Vue.component(JButton.name, JButton)
  // NOTE 返回 Vue，可链式调用 Vue.use().use()
  return Vue
}

export default JButton
