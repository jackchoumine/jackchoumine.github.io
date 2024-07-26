<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <div class="simple-count">
    <button @click="count + 1">+</button>
    <span>{{ count }}</span>
    <button @click="$emit('submit', count)" role="submit">submit</button>
  </div>
</template>

<style scoped lang="scss">
.simple-count {
  // scss code
}
</style>
