// @ts-nocheck
import { isRef, unref } from 'vue'

import { LazyOrRef, MaybeLazyRef } from '../hooks/types'

// https://logaretm.com/blog/juggling-refs-around
export function isWatchable<T>(value: MaybeLazyRef<T>): value is LazyOrRef<T> {
  return isRef(value) || typeof value === 'function'
}

export function unravel<T>(value: MaybeLazyRef<T>): T {
  if (typeof value === 'function') {
    // casting because there is  a typescript bug
    // https://github.com/microsoft/TypeScript/issues/37663
    return (value as () => T)()
  }

  return unref(value)
}

// 并发控制函数
// function concurrencyControl(tasks, limit, callback) {
//   const queue = tasks.slice() // 当前执行的任务队列
//   let count = 0 // 已完成的任务数量

//   const runTask = () => {
//     while (limit) {
//       limit--

//       if (queue.length) {
//         const task = queue.shift() // 取出当前队头任务

//         task().then(res => {
//           console.log(res)
//           limit++
//           count++

//           if (count === tasks.length) {
//             // 最后一个任务
//             callback(res) // 执行回调函数
//           } else {
//             runTask() // 继续执行下一个任务
//           }
//         })
//       }
//     }
//   }

//   return runTask
// }
class ConcurrencyControl {
  maxConcurrencyLimit: number
  taskQueue: any[]
  callback: any
  constructor({ maxConcurrencyLimit = 3, callback = void 0 } = {}) {
    this.maxConcurrencyLimit = maxConcurrencyLimit
    this.taskQueue = []
    this.callback = callback
    setTimeout(() => {
      this._runTask()
    })
  }

  push(task: any) {
    this.taskQueue.push(task)
    // this.runTask()
  }

  _runTask() {
    // console.log(this.taskQueue.length)
    if (!this.taskQueue.length) return // 任务队列为空，直接返回
    // const task = this.taskQueue.shift() // 取出当前队头任务
    const needRunTaskCount = Math.min(this.taskQueue.length, this.maxConcurrencyLimit) // 需要执行的任务数量
    const tasks = this.taskQueue.splice(0, needRunTaskCount) // 取出需要执行的任务
    // const taskPromises = tasks.map(task => task()) // 执行任务
    // console.log(tasks)
    Promise.all(tasks).then(res => {
      this._finishTask(res)
      this._runTask()
    })
  }

  _finishTask(res) {
    this.callback(res) // 执行回调函数
  }
}
// ?? VS ||
// 相同点：都可用于多个变量的存在性检查，获取第一个存在的变量，可简化多个 if 语句。都需要注意短路效应或者说变量取值的优先级
// ?? 用于过滤空值，获取第一个非空值 undefined null
// 常用来获取非空值，特别小心 NaN
// || 用于过滤假值，获取第一个真值 undefined null 0 false '' NaN
// 常用来获取非空字符串、非零数值和 true，当 0 和 false 有意义时，要特别小心
// NOTE 常用在检测 http 接口返回的值
function calcPlace(location_info) {
  const { country, state, city, local } = location_info

  let first_part
  let second_part
  if (country === 'USA') {
    // 先处理正逻辑
    first_part = local || city || 'middle-of-nowhere'
    second_part = state || 'USA'
  } else {
    first_part = local || city || state || 'middle-of-nowhere'
    second_part = country || 'planet earth'
  }

  return `${first_part},${second_part}`
}

function checkOneVar(greet?) {
  // if (greet === 'hello') {
  //   console.log('字符串 hello', 'zqj log')
  // } else if (typeof greet === 'number' && greet === 1) {
  //   console.log('数值 1', 'zqj log')
  // } else if (typeof greet === 'boolean' && greet) {
  //   console.log('布尔值 true', 'zqj log')
  // } else {
  //   console.log('其他值', 'zqj log')
  // }

  // switch (greet) {
  //   case 'hello':
  //     console.log('字符串 hello', 'zqj log')
  //     break
  //   case 1:
  //     console.log('数值 1', 'zqj log')
  //     break
  //   case true:
  //     console.log('布尔值 true', 'zqj log')
  //     break

  //   default:
  //     console.log('其他值', 'zqj log')
  //     break
  // }
  // 策略模式简化对同一个变量不同值的检查，尤其是对枚举值的检查
  // NOTE 对象的键只能是字符串，非字符串会被转化
  // https://segmentfault.com/a/1190000021883055
  const obj = {
    hello: () => {
      console.log('字符串 hello', 'zqj log')
    },
    1: () => {
      console.log('数值 1', 'zqj log')
    },
    true: () => {
      console.log('布尔值 true', 'zqj log')
    },
    undefined: () => {
      console.log('undefined undefined', 'zqj log')
    },
    null: () => {
      console.log('null', 'zqj log')
    },
  }
  // obj[greet]?.()
  // 使用 map 呢
  const map = new Map()
  function hello() {
    console.log('字符串 hello', 'zqj log')
  }
  function whenUndefined() {
    console.log('undefined undefined', 'zqj log')
  }
  function whenNull() {
    console.log('null null', 'zqj log')
  }
  function when1() {
    console.log('数值 1', 'zqj log')
  }
  function when_true() {
    console.log('数值 1', 'zqj log')
  }

  map.set('hello', hello)
  map.set(1, when1)
  map.set(undefined, whenUndefined)
  map.set(null, whenNull)
  map.set(true, when_true)
  // 使用对象，用于变量不同字符串的匹配
  // 使用map, 可以用于任何值，还是使用 map 好，因为它扩展性更好
  map.get(greet)?.()
  // TODO 简化参数的方式
  // 1. 默认参数
  // 2. 对象参数解构
  // 3. 剩余参数
  // 4. 函数柯理化，实现参数复用或者减少参数
  // 通用的柯理化 返回一个函数
  // 常用的柯理化 返回对象，属性是函数
}
export { ConcurrencyControl, calcPlace, checkOneVar }
