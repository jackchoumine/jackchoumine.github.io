/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-07-05 17:43:37
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-07-06 19:29:36
 * @Description : 数组
 */
console.log('-----------------------------------------')
const arr = Array.from({ length: 4 }, (ele, index) => {
  return index * 2
})
const arr2 = Array.from({ length: 4 }).map((ele, index) => {
  return index * 2
})

const set = new Set([1, 2, 3])
const arr3 = Array.from(set, ele => {
  return ele * 2
})
console.log(arr3)

/**
 * 串行生成器
 * @param {number} first 第一个元素
 * @param {number} last 最后一个元素
 * @param {number} step 步长
 * @returns number[]
 */
function range(first: number, last: number, step: number) {
  return Array.from({ length: (last - first) / step + 1 }, (_, i) => first + i * step)
}

const arr4 = range(1, 10, 1)
console.log(arr4)
const arr5 = range(2, 100, 2)
console.log(arr5)

const noExtentArr = Object.freeze([1, 2])
console.log(noExtentArr)

const array1 = ['a', 'b', 'c']
const array2 = ['d', 'e', 'f']
const array3 = ['g', 'h']
const array4 = array1.concat(array2, array3)
console.log(array4)

const counts = [1, 5, 2, 3, 4]

for (const item of counts) {
  console.log({ item })
}
const iterator = counts[Symbol.iterator]()

let done = false
while (!done) {
  const { done: d, value } = iterator.next()
  done = d
  console.log({ value })
}

const sliceArr = counts.slice(0, 3)
console.log({ sliceArr }) // [1,2,3]
const isAllThan4 = counts.every(ele => ele > 4)
console.log({ isAllThan4 })
const moreThan3 = counts.filter(ele => ele > 3)
console.log({ moreThan3 })
const counts2 = counts.map(ele => ele * 2)
console.log({ counts2 })
const sum = counts.reduce((total, curr, index, arr) => {
  console.log({ curr, total, index, arr })
  return total + curr
}, 0)
console.log({ sum })

const strArr = ['J', 'a', 'v', 'a', 'S', 'c', 'r', 'i', 'p', 't']
const string = strArr.reduceRight((acc, cur) => {
  return acc + cur
}, '')
console.log({ string })

const objArr = [{ city: 'GuiYang' }, { name: 'Jack' }, { age: 30 }]
objArr.forEach(item => {
  console.log({ item })
})
const mergedObj = objArr.reduceRight((acc, cur) => {
  return {
    ...acc,
    ...cur,
  }
}, {})
console.log({ mergedObj })
