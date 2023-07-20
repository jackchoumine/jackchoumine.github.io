<template>
  <div>
    <!-- <MyTextarea :modelValue="text" @update:modelValue="change" /> -->
    <MyTextarea v-model="text" />
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import MyTextarea from './MyTextarea.vue'
export default {
  name: 'YouTextarea',
  components: { MyTextarea },
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const text = ref(props.modelValue)
    const change = value => {
      text.value = value
      emit('update:modelValue', value)
    }
    watch(
      () => text.value,
      value => {
        emit('update:modelValue', value)
      }
    )
    return {
      text,
      change,
    }
  },
}
</script>
<style scoped lang="scss"></style>
