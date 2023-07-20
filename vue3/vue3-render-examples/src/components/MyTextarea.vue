<template>
  <div>
    <textarea v-model="inputText"></textarea>
    <h2>textarea:{{ inputText }},{{ title }}</h2>
    <h2>title:{{ innerTitle }}</h2>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'MyTextarea',
  props: ['modelValue', 'title'],
  emits: ['update:modelValue', 'update:title'],
  setup(props, { emit }) {
    const inputText = ref(props.modelValue)
    const innerTitle = ref(props.title)
    watch(
      () => inputText.value,
      value => {
        const title = Math.random().toString(36)
        innerTitle.value = title
        emit('update:title', title)
        emit('update:modelValue', value)
      }
    )
    return {
      inputText,
      innerTitle,
    }
  },
})
</script>
