<template>
  <div>
    <input type="text" v-model="value" />
    <p>{{ value }}</p>
    <select name="select" v-model="selected">
      <option value="value1">Value 1</option>
      <option value="value2">Value 2</option>
      <option value="value3">Value 3</option>
    </select>
    <p>选中了{{ selected }}</p>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'MyModelTwo',
  setup() {
    const value = ref('输入')
    const selected = ref('value2')
    return { value, selected }
  },
})
</script>
