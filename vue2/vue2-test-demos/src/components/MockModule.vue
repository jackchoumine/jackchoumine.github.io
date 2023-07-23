<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-23 16:39:33
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-23 18:23:01
 * @Description : 模拟模块依赖
-->
<template>
  <ul>
    <li v-for="item in todoList" :key="item.id">{{ item.title }}</li>
  </ul>
</template>

<script>
import { getTodoList } from '@/api'
export default {
  name: 'MockModule',
  data() {
    return {
      todoList: [],
    }
  },
  created() {
    getTodoList().then(todos => {
      this.todoList = todos
    })
  },
}
</script>
