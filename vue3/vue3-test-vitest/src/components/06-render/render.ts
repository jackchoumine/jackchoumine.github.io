/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-30 10:19:57
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-30 10:52:15
 * @Description : 渲染函数学习
 * more info https://cn.vuejs.org/api/render-function
 */
import { createApp, h } from 'vue'
import FetchJoke from '../FetchJoke.vue'

// h(tag, props, children)
// tag: 标签名 或者 组件
// props: 属性，可以是一个对象，也可以是 null 事件以`on`开头 如`onClick`、`onInput`、`onUpdate:modelValue`等
// children: 子节点 可以是文本、数组、组件 或者插槽对象

// <div id="foo">Hello World</div>
const div = h('div', { id: 'foo' }, 'Hello World')

console.log(div)

const div2 = h('div', h('span', 'Hello World'))

console.log(div2)

// <p>true</p>
const p = h('p', true) // 只有子节点时，可以省略 props

console.log(p)

const btn = h(
  'button',
  {
    class: 'btn',
    onClick: () => {
      console.log('click')
    }
  },
  '按钮'
)

console.log(btn)

const FetchJokeVNode = h(FetchJoke, ({ loading, joke }) =>
  h('div', [h('p', loading ? 'loading...' : joke)])
)

console.log(FetchJokeVNode.type === FetchJoke)
const mountDiv = document.createElement('div')
const obj = createApp(FetchJokeVNode).mount(mountDiv)
// console.log(obj.$el)
console.log(FetchJokeVNode)
