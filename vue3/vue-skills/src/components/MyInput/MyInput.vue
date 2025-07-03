<script setup lang="ts">
import { ElInput } from 'element-plus'
import type { InputProps } from 'element-plus'
import { h } from 'vue'

const props = withDefaults(defineProps<Partial<InputProps>>(), {
  placeholder: '默认的 placeholder',
  modelValue: ''
})
</script>

<template>
  <div class="MyInput">
    <h3>二次封装的组件 placeholder {{ props.placeholder }}</h3>
    <component
      :is="h(ElInput, { ...props }, $slots)"
      :model-value="props.modelValue"
      @input="$emit('update:model-value', $event)"
    />
  </div>
</template>

<style lang="scss">
.MyInput {
  // scss code
}
</style>
