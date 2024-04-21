<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-01-30 08:49:19
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-09-18 09:35:41
 * @Description : 测试 http 封装
-->
<script lang="ts" setup>
// import http from '@jack/http'

import { useHttp } from '@/hooks'

const todo = shallowReactive({})

type Todo = {
  userId: string
  id: number
  title: string
  completed: boolean
}

// onBeforeMount(async () => {
//   const [error, todoId120] = await http.get<Todo>(
//     'https://jsonplaceholder.typicode.com/todos/120',
//     { name: 'to' }
//   )
//   !error && Object.assign(todo, todoId120)
// })
const url = 'https://jsonplaceholder.typicode.com/todos/120'
const params = { name: 'to' }
const [data, loading, getTodo] = useHttp(url, params, { immediate: false })

const array: Ref<number[]> = ref(['张三', '李四', '王五', '赵六'])

function toSortArray() {
  array.value = array.value.toSorted((a, b) =>
    a.localeCompare(b, 'zh-Hans-CN', { sensitivity: 'accent' })
  )
}

function toRandomSort() {
  array.value = array.value.toSorted(() => {
    if (Math.random() > 0.5) return 1
    if (Math.random() < 0.5) return -1
    return 0
  })
}
</script>

<template>
  <p>{{ todo }}</p>
  <h4>test useHttp</h4>
  <p v-if="loading">loading data</p>
  <p v-else>{{ data }}</p>
  <button @click="() => getTodo({ title: 'to' })">请求todo</button>
  <ul>
    <li v-for="item in array" :key="item">{{ item }}</li>
  </ul>
  <button @click="toSortArray">排序</button>
  <button @click="toRandomSort">打乱</button>
</template>
