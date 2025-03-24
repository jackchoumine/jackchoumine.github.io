<script setup>
import { ref } from 'vue'
const users = ref()
const loading = ref()
getUsers()
function getUsers() {
  loading.value = true
  fetch('/api/users')
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      users.value = data
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="MSWTest">users {{ users }}</div>
</template>

<style scoped lang="scss">
.MSWTest {
  // scss code
}
</style>
