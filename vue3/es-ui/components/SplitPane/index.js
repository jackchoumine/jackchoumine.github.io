/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-04-20 05:47:04
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-05-14 11:21:32
 * @Description : 导出SplitPane组件
 */
import SplitPane from './SplitPane.vue'

const install = function (Vue) {
  Vue.component('JSplitPane', SplitPane)
}

SplitPane.install = install

export default SplitPane
