<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-01-05 09:57:27
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-16 09:03:19
 * @Description : v-memo 的使用

 v-memo 用来缓存渲染结果，绑定的变量是一个数组，数组变化时，才重新渲染。
 <p v-memo="[el1,el2]"></p>
 空数组和v-once相同
 <p v-memo="[]"></p>
 <p v-once></p>
 NOTE v-memo 常常和 v-for 配合使用，在 v-for 内部无效。
 v-memo 和 react 的 useMemo 返回 jsx 极为相似。
 <div v-memo="[a]"></div>
 const memoDiv = useMemo(()=><div></div>,[a])
-->
<script setup>
import { ref } from 'vue'

const subscribers = ref(4000)
const views = ref(10000)
const likes = ref(3000)
</script>

<template>
  <div>
    <h4>v-memo 缓存渲染结果</h4>
    <div v-memo="[subscribers]">
      <p>Subscribers: {{ subscribers }}</p>
      <p>Views: {{ views }}</p>
      <p>Likes: {{ likes }}</p>
    </div>
    <button @click="subscribers++">Subscribers++</button>
    <button @click="views++">Views++</button>
    <button @click="likes++">Likes++</button>
    <div>
      <p>Current state:</p>
      <p>Subscribers: {{ subscribers }}</p>
      <p>Views: {{ views }}</p>
      <p>Likes: {{ likes }}</p>
    </div>
  </div>
</template>
