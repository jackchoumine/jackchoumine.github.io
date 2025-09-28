/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-11-21 10:07:26
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-07-04 04:25:16
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
// 把函数体也改了
async function copyText(val) {
  if (navigator.clipboard && navigator.permissions) {
    //await navigator.clipboard.writeText(val)
    const copy = v => navigator.clipboard.writeText(v)
    await copy(v)
    copyText = copy
  } else {
    copyBack(v)
    function copyBack(v) {
      const textArea = document.createElement('textArea')
      textArea.value = val
      textArea.style.width = 0
      textArea.style.position = 'fixed'
      textArea.style.left = '-999px'
      textArea.style.top = '10px'
      textArea.setAttribute('readonly', 'readonly')
      document.body.appendChild(textArea)

      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
    }
    copyText = copyBack
  }
}

function add1(n, m) {
  throw new Error('Test Error1')
  //return n + m
}

const add2 = function (n, m) {
  throw new Error('Test Error2')

  //return n + m
}
const add3 = (n, m) => {
  throw new Error('Test Error3')

  //return n + m
}

function outer() {
  //add1(1, 2)
  //add2(1, 2)
  //add3(1, 2)
  console.log('outer')
}
outer()

console.log(add('Jack', 'Chou')) // 字符串拼接
console.log(add(100, 200)) // 数字相加

function add(a, b) {
  if (isStr(a) && isStr(b)) {
    return contact(a, b)
  }
  return plus(a, b)

  function isStr(v) {
    return typeof v === 'string'
  }
}

function plus(n, m) {
  return n + m
}
function contact(a, b) {
  return `${a} ${b}`
}

var name = '小华'
const bob = {
  name: '鲍勃',
  intro() {
    const greeting = `我是${this?.name}`
    console.log(greeting)
  },
}
bob.intro() // this 是 bob
const introMe = bob.intro
introMe() // this 是 window 输出  我是小华
const tom = {
  name: '汤姆',
}
bob.intro.call(tom) // this 是 tom 输出 我是汤姆

function hasProp(obj, key, checkPrototype = false) {
  if (!checkPrototype) return obj.hasOwnProperty(key)
  return key in obj
}

const obj = {
  name: 'Jack',
}

console.log(hasProp(obj, 'name'))

/**
 * 比较两个字符串
 * @param {*} str1 1-222---3---4--5
 * @param {*} str2 2-33---444-55
 * @return 0 1 -1
 */
function compare(str1, str2) {
  const strIter1 = walk(str1)
  const strIter2 = walk(str2)
  while (true) {
    const { value: v1, done: d1 } = strIter1.next()
    const { value: v2, done: d2 } = strIter2.next()
    if (d1 && d2) return 0
    if (d1) return -1
    if (d2) return 1
    if (v1 < v2) return 1
    if (v1 > v2) return -1
  }
}

//console.log(compare('1---2---33-41-5', '12-2-3-4-5'))
//console.log(compare('1---2---33-41-5', '1---2---33-41-5'))
//console.log(compare('1---2---33-41-5', '1---2---33-41-6'))
//console.log(compare('1---2---33-41-5', '1---2---33-41-4'))
console.log(compare('1.2.4', '1.2.5')) // 1
console.log(compare('1.2.4', '1.2.6')) // 1
console.log(compare('2.2.4', '1.2.6')) // -1
console.log(compare('2.2.4', '2.2.4')) // 0

function* walk(str) {
  let n = ''
  for (const c of str) {
    if (c !== '-') {
      n += c
    } else {
      if (n) {
        yield Number.parseInt(n)
        n = ''
      }
    }
  }
  if (n) {
    yield Number.parseInt(n)
  }
}

//const strIter = walk('-1-222---3---4--5-')
//let done = false
//while (!done) {
//  const { value, done: d } = strIter.next()
//  done = d
//  console.log({ value, done: d })
//}
