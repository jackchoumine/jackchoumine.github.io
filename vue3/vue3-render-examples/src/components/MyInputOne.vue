<template>
  <div>
    <input type="text" v-model="input" />
    <h2>{{ input }}</h2>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'MyInputOne',
  setup() {
    const input = ref('')
    return { input }
  },
}
</script>
