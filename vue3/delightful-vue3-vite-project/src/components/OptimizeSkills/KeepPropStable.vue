<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-02-28 19:26:14
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-04-20 19:01:48
 * @Description : 保持 props 稳定
-->
<script setup>
import ListItem from './ListItem.vue'
import ListItemBad from './ListItemBad.vue'

const list = [
  { name: 'jack', id: 0 },
  { name: 'Tom', id: 1 },
  { name: 'June', id: 2 },
  { name: 'J', id: 3 },
  { name: 'HELLO', id: 4 },
  { name: 'A', id: 5 },
]
const activeId = ref(0)
</script>

<template>
  <!-- NOTE activeId 为数字，一变化，所有 ListItem 的 props 改变。不稳定的 props 导致多余的重新渲染。 -->
  <!-- NOTE 把 props 转为稳定类型的数据，可提高性能，ListItem 使用 active 代替 activeId -->
  <!-- active 改成布尔值，只会在 true 和 false 之前变化，两个 ListItem 重新渲染 -->
  <!-- 尽可能保持 props 稳定。 当这样的组件很多时，性能提升会比较慢明显 -->
  <button @click="activeId = (activeId + 1) % list.length">切换</button>
  <ul>
    <ListItem
      v-for="item in list"
      :key="item.id"
      :active="item.id === activeId"
      :id="item.id"
      :name="item.name" />
    <br />
    <ListItemBad
      v-for="item in list"
      :key="item.id"
      :active-id="activeId"
      :id="item.id"
      :name="item.name" />
    <!-- v-for in 指令可写成 v-for of  -->
    <ul>
      <li v-for="(val, key, index) in list[0]" :key="index">
        val => {{ val }} | key => {{ key }} | index => {{ index }}
      </li>
    </ul>
  </ul>
</template>
