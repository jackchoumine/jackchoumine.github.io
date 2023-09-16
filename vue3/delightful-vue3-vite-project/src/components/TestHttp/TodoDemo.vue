<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-01-30 08:49:19
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-09-16 12:51:23
 * @Description : 测试 http 封装
-->
<script lang="ts" setup>
import http from '@jack/http'

import { useHttp } from '@/hooks'

const todo = shallowReactive({})

type Todo = {
  userId: string
  id: number
  title: string
  completed: boolean
}

onBeforeMount(async () => {
  const [error, todoId120] = await http.get<Todo>(
    'https://jsonplaceholder.typicode.com/todos/120',
    { name: 'to' }
  )
  !error && Object.assign(todo, todoId120)
})
const url = 'https://jsonplaceholder.typicode.com/todos/120'
const params = { name: 'to' }
const [data, loading, getTodo] = useHttp(url, params, { immediate: false })
</script>

<template>
  <p>{{ todo }}</p>
  <h4>test useHttp</h4>
  <p v-if="loading">loading data</p>
  <p v-else>{{ data }}</p>
  <button @click="() => getTodo({ title: 'to' })">请求todo</button>
</template>
