/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-06-08 21:52:25
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-08 22:33:26
 * @Description :
 */
import { Button } from 'element-ui'
import Vue from 'vue'

export function showElButton(target, { type = 'primary', label = 'el-button' } = {}) {
  const SubVue = Vue.extend(Button)
  const ButtonInstance = new SubVue({
    propsData: { type },
  })
  ButtonInstance.$slots = {
    default: label,
  }
  ButtonInstance.$mount()
  target.appendChild(ButtonInstance.$el)
}
