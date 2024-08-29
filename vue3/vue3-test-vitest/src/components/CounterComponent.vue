<script setup>
import { useCounterStore } from '@/stores/counterStore'
import { inject } from 'vue'
const counterStore = useCounterStore()
const { theme } = inject('useTheme')
</script>

<template>
  <div class="CounterComponent">
    <p>theme{{ theme }}</p>
    <h3>count: {{ counterStore.count }}</h3>
    <h3>doubleCount: {{ counterStore.doubleCount }}</h3>
    <button @click="counterStore.increment(2)">Increment</button>
  </div>
</template>

<style scoped lang="scss">
.CounterComponent {
  // scss code
}
</style>
