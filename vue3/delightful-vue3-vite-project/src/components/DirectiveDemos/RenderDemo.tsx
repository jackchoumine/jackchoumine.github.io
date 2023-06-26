/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-06-27 02:59:50
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-06-27 03:47:33
 * @Description :
 */
import { ElButton } from 'element-plus'
import { h, withDirectives } from 'vue'

import { directiveObj } from '@/directives'

function JSXDemo() {
  return (
    <>
      <h3>v-copy 用jsx上</h3>
      <div v-copy={'这是复制的内容'} style={{ color: 'red' }}>
        点击复制
      </div>
      <h3>v-auth</h3>
      <button v-auth:disabled={'li'} class="button">
        无权限，被禁用
      </button>
      <br />
      <button v-auth="key3">无权限删除</button>
      <br />
      <button v-auth="key">有权限</button>
      <br />
      <ElButton type="primary" v-auth="key">
        按钮
      </ElButton>
    </>
  )
}

function RenderDemo() {
  // withDirectives(VNode, [[vDirective,value, arg, modifiers]])
  const Input = h('input', { type: 'text', value: 'hello' })
  const InputWithFocus = withDirectives(Input, [[directiveObj.focus, true]])
  const DivWithCopy = withDirectives(h('div', '这是复制的内容'), [
    [directiveObj.copy, '这是复制的内容'],
  ])
  const BtnWithAuth = withDirectives(h('button', '无权限,被禁用'), [
    [directiveObj.auth, 'li', 'disabled'],
  ])
  return h('div', [
    h('h3', 'v-copy 用h上'),
    DivWithCopy,
    ['点击复制', h('br'), InputWithFocus],
    h('br'),
    h('h3', 'v-auth'),
    BtnWithAuth,
  ])
}

export { JSXDemo as default, RenderDemo }
