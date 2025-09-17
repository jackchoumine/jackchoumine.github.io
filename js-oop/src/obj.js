/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-03-30 22:58:25
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-03-30 23:45:33
 * @Description : 对象
 */
var person = {
  name: 'xiaoMing',
  sayHi: function () {},
}

Object.preventExtensions(person)
console.log(Object.isExtensible(person))
console.log(person)
person.age = 100 // 添加属性 ❌
delete person.name // 删除属性 ✅
person.sayHi = 1000 // 改变类型 ✅
console.log(person)

var person1 = {
  name: 'xiaoMing',
  sayHi: function () {},
}

Object.seal(person1)
console.log(Object.isSealed(person1))
console.log(person1)
person1.age = 100 // 添加属性 ❌
delete person1.name // 删除属性 ❌
person1.sayHi = 1000 // 改变类型 ✅
person1.name = '你好' // 修改值 ✅
console.log(person1)

var person2 = {
  name: 'xiaoMing',
  sayHi: function () {},
}

Object.freeze(person2)
console.log(Object.isFrozen(person2))
console.log(person2)
person2.age = 100 // 添加属性 ❌
delete person2.name // 删除属性 ❌
person2.sayHi = 1000 // 改变类型 ❌
person2.name = '你好' // ❌
console.log(person2)
