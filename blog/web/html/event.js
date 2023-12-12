/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-12-12 16:44:26
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-12-12 16:57:53
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
  emit.fire('myClick')
}
