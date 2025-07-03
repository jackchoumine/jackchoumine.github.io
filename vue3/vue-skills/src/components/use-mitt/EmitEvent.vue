<script setup>
import { useMitt } from '@/hooks'

const { emit } = useMitt('user:login', false)

function onEmit() {
  emit({ username: 'JACK', password: Math.random().toString() })
}
</script>

<template>
  <div class="EmitEvent">
    触发事件
    <button @click="onEmit">emit</button>
  </div>
</template>

<style scoped lang="scss">
.EmitEvent {
  // scss code
}
</style>
