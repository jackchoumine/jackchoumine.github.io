<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-22 21:45:45
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-25 18:35:47
 * @Description :
-->
<script setup>
import { useJokeStore } from '@/stores/jokeStore'
import { storeToRefs } from 'pinia'
// import useJoke from '../hooks/useJoke'
const { loading, joke } = storeToRefs(useJokeStore())
const { fetchJoke } = useJokeStore()
</script>

<template>
  <div class="JokeContainer">
    <h3>笑话大全</h3>
    <p>{{ loading ? 'loading' : joke }}</p>
    <button @click="fetchJoke">获取笑话</button>
  </div>
</template>

<style scoped lang="scss">
.JokeContainer {
  // scss code
}
</style>
