<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-06-05 10:14:53
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-10 17:37:16
 * @Description : 并发控制-示例一
-->
<script lang="ts" setup>
import { ConcurrencyControl } from '@/utils'

// 生成用于测试的任务集合

const tasks = new Array(10).fill(0).map((v, i) => {
  return function task() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(i + 1)
      }, i * 1000)
    })
  }
})
const concurrencyControl = new ConcurrencyControl({
  callback: res => {
    console.log(res)
  },
})
tasks.forEach(task => {
  concurrencyControl.push(task())
})
// 测试代码
// const sendRequest = concurrencyControl(tasks, 3, taskId => {
//   console.log(`task ${taskId} finish！`)
// })

// sendRequest()
</script>

<template>
  <div class="demo-one">
    <h4>使用 concurrencyControl</h4>
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
