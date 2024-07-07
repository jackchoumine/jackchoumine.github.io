<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-06-05 10:14:53
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-07 16:42:32
 * @Description : 并发控制-示例一
-->
<script lang="ts" setup>
import pControl from 'p-control'
import pLimit from 'p-limit'

import { useHttp } from '@/hooks'
import { ConcurrencyControl } from '@/utils'

const limit = pLimit(6)
const url = 'https://jsonplaceholder.typicode.com/todos/120'
// const params = { name: 'to' }
const [data, loading, getTodo] = useHttp(url, {}, { immediate: false })
// 生成用于测试的任务集合

const tasks = new Array(10).fill(0).map((v, i) => {
  return {
    name: Math.random().toString(36),
  }
  // return function task() {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       resolve(i + 1)
  //     }, i * 1000)
  //   })
  // }
})

// 测试代码
// const sendRequest = concurrencyControl(tasks, 3, taskId => {
//   console.log(`task ${taskId} finish！`)
// })

// sendRequest()
async function sendRequest() {
  // const concurrencyControl = new ConcurrencyControl({
  //   maxConcurrencyLimit: 3,
  //   callback: res => {
  //     console.log(res)
  //   },
  // })
  // tasks.forEach(task => {
  //   concurrencyControl.push({ fn: getTodo, params: task })
  // })
  // concurrencyControl.run()
  // p control
  const p = pControl(3)
  tasks.forEach(task => {
    p.add(getTodo, task)
  })
  p.start((res, doneSize) => {
    console.log(res, doneSize)
  }).then(res => {
    console.log(res)
  })
  // p limit
  // const limitList = tasks.map(task => {
  //   return limit(() => getTodo(task))
  // })
  // Promise.all(limitList).then(res => {
  //   console.log(res)
  // })
  // const iterator = tasks.entries()
  // const limitList = []
  // for (const [index, task] of iterator) {
  //   const res = await getTodo(task)
  //   console.log(res)
  // }
}
</script>

<template>
  <div class="demo-one">
    <h4>使用 concurrencyControl</h4>
    <button @click="sendRequest">发起并发请求</button>
    <p class="p-1">hello</p>
    <p class="p-2">hello</p>
    <p class="p-3">hello</p>
    <p>hello</p>
  </div>
</template>

<style scoped lang="scss">
.demo-one {
  // scss code
  .p-1 {
    font-size: 1.6rem;
    color: green;
  }

  .p-2 {
    font-size: 16px;
    color: red;
  }

  .p-3 {
    font-size: 3.2rem;
    color: red;
  }
}
</style>
