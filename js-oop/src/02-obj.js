import { deepFreeze } from './utils'

/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-07-01 10:45:17
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-09-27 18:26:12
 * @Description : 对象
 */
console.log('----- 对象', 'zqj')
const obj = new Object({
  name: 'JS',
})
Object.seal(obj)
console.log(Object.isSealed(obj))
console.log(Object.isExtensible(obj))
//const removed = delete obj.name
//if (removed) {
//  console.log('已经移除 name')
//}

const deepObject = deepFreeze({
  info: {
    name: 'jack',
    arr: [1, 2, 3],
    a: {
      b: 2,
    },
  },
  a: 123,
})

// 试图修改一个深度冻结的对象，报错
//deepObject.a = 123
//deepObject.info.a.b = 123

console.log({ deepObject })
