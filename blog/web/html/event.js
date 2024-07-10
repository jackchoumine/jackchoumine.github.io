/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-12-12 16:44:26
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-10 19:30:52
 * @Description : 封装事件
 */
// emit.on('event',function () {
//
// })
// emit.fire('event',data)

var emit = {
  on: function (name, fn) {
    addEventListener(name, event => fn(event.detail, event))
  },
  fire: function (name, data = undefined) {
    dispatchEvent(new CustomEvent(name, { detail: data }))
  },
}

emit.on('my-click', function (data, event) {
  console.log(data, event, 'zqj log')
})

btn.onclick = function () {
  emit.fire('my-click', { a: 1 })
  // emit.fire('myClick')
}

const testBtn = document.getElementById('testBtn')
const span = document.getElementById('spanBtn')
const div = document.getElementById('divBtn')

const phaseMap = {
  1: '捕获',
  2: '目标',
  3: '冒泡',
}
// testBtn.addEventListener(
//   'click',
//   function (e) {
//     console.log('testBtn', phaseMap[e.eventPhase])
//     // 阻止冒泡
//     // e.stopPropagation()
//     // e.stopImmediatePropagation()
//   },
//   true
// )
testBtn.addEventListener('click', function (e) {
  console.log('testBtn', phaseMap[e.eventPhase])
  // return false
  // e.stopPropagation()
  // e.stopImmediatePropagation()
})

span.addEventListener('click', function (e) {
  console.log('span', phaseMap[e.eventPhase])
})

div.addEventListener('click', function (e) {
  console.log('div', phaseMap[e.eventPhase])
})

// stopImmediatePropagation vs stopPropagation
// NOTE 笔记
// 1. 都能阻止事件向祖先元素冒泡
// 2. stopImmediatePropagation 能阻目标元素的其他相同事件触发，而 stopPropagation 不能
// 元素可监听多次监听相同事件
