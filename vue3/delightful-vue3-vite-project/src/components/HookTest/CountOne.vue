<script lang="ts" setup>
import { useTestGlobalState } from '@/hooks'

// const emit = defineEmits(['add-count'])
const { localCount, addLocalCount, globalCount, addGlobalCount } = useTestGlobalState()

// watch(localCount, count => {
//   emit('add-count', count)
// })
</script>

<template>
  <div class="count-one">
    <h4>CountOne.vue</h4>
    <p>localCount:{{ localCount }}</p>
    <p>修改localCount<button @click="addLocalCount">addLocalCount</button></p>
    <p>globalCount:{{ globalCount }}</p>
    <p>修改globalCount<button @click="addGlobalCount">addGlobalCount</button></p>
  </div>
</template>

<style scoped lang="scss">
.count-one {
  // scss code
}
</style>
