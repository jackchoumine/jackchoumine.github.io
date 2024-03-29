/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-12 18:41:36
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-27 03:17:10
 * @Description : 权限指令
 */
import type { DirectiveBinding } from 'vue'

const $auth = function (key = '') {
  // NOTE 从后台获取到的权限列表，放在store里面
  const buttonKeys = ['key', 'key1', 'key2']
  // 返回 bool ，方便在结合 v-if 使用
  return buttonKeys.includes(key)
}
/**
 * 权限指令
 * // 无权限时禁用
 * <button v-auth:disabled="'authKey'">无权限时禁用</button>
 * // 无权限时删除
 * <button v-auth="'authKey'">无权限，按钮被删除</button>
 * // 没有传递 key，啥都不做
 * <button v-auth>无权限，按钮被删除</button>
 */
const auth = (el: HTMLElement, binding: DirectiveBinding<string>) => {
  const { value: key = '', arg = 'show' } = binding
  if (key && !$auth(key)) {
    // 1. 无权限时只是禁用，用户可以编辑页面启用，且可出发事件
    // NOTE 解决办法：克隆一个新元素，使用新元素代替旧元素
    // cloneNode(true) 克隆整个节点，通过 addEventListener 绑定的事件不会被克隆
    // NOTE 行内属性绑定的事件会被克隆
    // 2. 有的元素没有 disabled 属性，设置了没有用
    // NOTE pointer-events:none 可实现任意元素禁用 hover 和 click
    // 缺点：hover 时不显示 title

    // 无权限时禁用按钮
    if (arg === 'disabled') {
      // el.disabled = true
      // setAttribute 能新增不存在的属性
      el.setAttribute('disabled', 'true')
      el.title = '没有操作权限'
      // 设置无权限的样式
      // el.style['pointer-events'] = 'none'
      el.style.cursor = 'not-allowed'
      el.style.opacity = `0.6` // 设置该属性只是起到禁用效果而已
      const elClone = el.cloneNode(true)
      el.parentElement?.replaceChild(elClone, el)
    } else {
      // 无权限时删除按钮
      el.remove()
    }
  }
}
export default auth
