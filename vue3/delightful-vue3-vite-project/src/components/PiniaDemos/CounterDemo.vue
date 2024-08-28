<!--
 * @Description :
 * @Date        : 2023-01-05 01:34:31 +0800
 * @Author      : JackChou
 * @LastEditTime: 2024-08-28 22:07:33
 * @LastEditors : ZhouQiJun
-->
<template>
  <div>
    <p>{{ count }}</p>
    <p>age:{{ age }}</p>
    <ul>
      <li v-for="book in books" :key="book">{{ book }}</li>
    </ul>
    <p>{{ booksStr }}</p>
    <button @click="add">+</button>
    <hr />
    <button @click="changeMulti">批量修改</button>
    <hr />
    <button @click="changeMulti2">$patch使用接收函数</button>
    <hr />
    <button @click="changeByAction">action 修改</button>
    <hr />
    <ul>
      <li v-for="todo in finishedTodos" :key="todo">
        <span class="content">
          {{ todo }}
        </span>
      </li>
    </ul>
    <hr />
    <ul>
      <li v-for="todo in todos" :key="todo">
        <span class="content">
          {{ todo.finished ? '✅' : '' }}
        </span>
        <span class="content">
          {{ todo.content }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useCounter, useTodosStore } from '@/stores'

const { finishedTodos, todos } = storeToRefs(useTodosStore())

// NOTE 不要直接解构，会失去响应式
// const { count } = counter
const counter = useCounter()
const { count, age, books, booksStr } = storeToRefs(counter)

// NOTE 状态修改
// 方式1：最简单
function add() {
  ++counter.count
}

// 方式2：修改多个数据，使用 $patch 接收函数批量更新
function changeMulti2() {
  counter.$patch(counter => {
    counter.count += 10
    counter.books.push('angular')
  })
}

// 方式3：修改多个数据，使用 $patch 批量修改
function changeMulti() {
  counter.$patch({
    count: counter.count + 1,
    age: counter.age + 10,
  })
}

// 方式4：封装 actions，适合复杂操作
function changeByAction() {
  counter.complexChange(10)
}

// NOTE 如何监听 store 里的数据
// 1. 监听单个属性
watchEffect(() => {
  console.log('watchEffect count:', counter.count)
})

watch(
  () => counter.count,
  count => {
    console.log('watch () => counter.count, count:', count)
  }
)
watch(count, count => {
  console.log('watch count:', count)
})
// 2. 监听多状态属性的变化
watch([() => counter.count, () => counter.age], ([count, age]) => {
  console.log('count age ', { count, age })
})
// 3. $subscribe 多个属性修改，只触发一次
// 响应 store 变化
// 比起普通的 watch()，使用 $subscribe() 的好处是 subscriptions 在 patch 后只触发一次
counter.$subscribe((mutation, state) => {
  console.log('组件中 订阅 state 变化')
  console.log(mutation)
  console.log(state)
})
</script>

<style scoped lang="scss"></style>
