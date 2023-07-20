<template>
  <div>
    <slot name="left"></slot>
    <h1>{{ msg }}</h1>
    <p>count:{{ count }}</p>
    <slot name="default"></slot>
    <button @click="add">+10</button>
    <slot name="right" :doubleCount="doubleCount"></slot>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, SetupContext, computed } from 'vue'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  emits: ['plus'],
  setup(_, ctx: SetupContext) {
    const count = ref(0)
    function add() {
      count.value += 10
      ctx.emit('plus', count.value)
    }
    const doubleCount = computed(() => count.value * 2)
    return { count, add, doubleCount }
  },
})
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
