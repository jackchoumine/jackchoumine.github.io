/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-07-01 10:45:17
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-07-03 11:40:31
 * @Description : 对象
 */
console.log('----- 对象', 'zqj')
const obj = new Object({
  name: 'JS',
})
Object.seal(obj)
console.log(Object.isSealed(obj))
console.log(Object.isExtensible(obj))
const removed = delete obj.name
if (removed) {
  console.log('已经移除 name')
}
