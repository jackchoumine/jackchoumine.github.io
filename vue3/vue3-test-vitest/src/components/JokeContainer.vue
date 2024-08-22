<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-22 21:45:45
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-23 02:00:31
 * @Description :
-->
<script setup>
import useJoke from '../hooks/useJoke'
const { loading, joke, fetchJoke } = useJoke()
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
