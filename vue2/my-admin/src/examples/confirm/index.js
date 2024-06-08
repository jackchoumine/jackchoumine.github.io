/*
 * @Description: 导出确认组件
 * @Date: 2021-06-03 14:48:15 +0800
 * @Author: JackChou
 * @LastEditTime: 2024-06-08 23:50:20
 * @LastEditors : ZhouQiJun
 */
import Confirm from './src/Confirm.vue'
import Vue from 'vue'

const ConfirmClass = Vue.extend(Confirm)

let confirmInstance = null

const showConfirm = (content = '插槽内容', title = '弹窗标题', options = {}) => {
  if (!confirmInstance) {
    confirmInstance = new ConfirmClass({
      el: document.createElement('div'),
      propsData: {
        content: content,
        title,
      },
    })
  }
  // 设置组件 data 为 true，内部 div 渲染
  confirmInstance.show = true

  const p = new Promise((resolve, reject) => {
    confirmInstance.onConfirm = () => {
      confirmInstance.show = false
      resolve(true)
    }
    confirmInstance.onCancel = () => {
      confirmInstance.show = false
      resolve(false)
    }
  })
  document.body.appendChild(confirmInstance.$el)
  return p
}

export default showConfirm
