/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-11-21 10:07:26
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-03-30 22:50:09
 * @Description : 函数
 */

// 迭代和闭包
function createIteration(arr) {
  let i = 0
  return () => {
    // ++ 在前面表示先自增再返回，++ 在后面表示先返回再自增
    return arr[i++]
    // 等效写法
    // let temp = i
    // ++i
    // return arr[temp]
  }
}

const next = createIteration([1, 2, 3, 4, 5])
console.log(next()) // 1
console.log(next()) // 2
console.log(next()) // 3

// 修改自身的函数
// function updateSelf() {
//   if (updateSelf.count == null) {
//     updateSelf.count = 0
//   }
//   updateSelf.count++
// }
// updateSelf()
// console.log(updateSelf.count) // 1
// updateSelf()
// console.log(updateSelf.count) // 2

const person = {
  sayHi,
}

person.sayHi(1, 2, 3)

function sayHi(...rest) {
  console.log(arguments, 'zqj')
  console.log(rest)
  console.log('Hi')
}
sayHi()
const sayHello = sayHi
sayHello('123')

const greet = (...rest) => {
  //console.log(arguments, 'arguments')
  console.log(rest, 'rest')
  console.log('greet')
}
greet(1, 2, 3)

function onClick(handler) {
  window.addEventListener('click', handler)
}

onClick(sayHello)

function plus(n) {
  return function (m) {
    return n + m
  }
}
const plus100 = plus(100)
const result1 = plus100(10)
const result2 = plus100(100)
console.log({ result1, result2 })

function sum(...rest) {
  return rest.reduce((curr, total) => total + curr, 0)
}

console.log(sum())
console.log(sum(1, 2, 3))
console.log(sum(1, 2, 3, 4, 5))

var name = '外面的小明'
const xiaoMing = {
  name: '小明',
  printName: function () {
    console.log(this.name, 'printName name')
    function inner() {
      console.log('inner', this?.name)
    }
    //inner()
    const arrow = () => {
      console.log('arrow', this?.name)
    }
    arrow()
  },
  // 剪头函数不可作为对象方法
  sayName: () => {
    // console.log(this.name, 'sayName name') // 报错 ❌
    function inner() {
      console.log('inner', this.name) // 报错 ❌
    }
    const arrow = () => {
      console.log('arrow', this.name) // 报错 ❌
    }
  },
  hello() {
    console.log('name', this.name)
  },
}

xiaoMing.printName()
xiaoMing.sayName()

const hi = xiaoMing.printName
hi()

class A {
  name = 'AAAA'
  method = () => {
    console.log('A.name', this.name)
  }
  sayHi() {
    //console.log('this.name', this.name)
  }
}

const a = new A()
a.method()

const { method } = a
method()
a.sayHi()
const { sayHi: ASayHi } = a
ASayHi()
