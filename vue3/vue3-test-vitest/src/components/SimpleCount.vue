<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-07-26 11:20:33
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-26 13:09:19
 * @Description : 
-->
<script>
import { isNumber } from 'petite-utils'
import { ref } from 'vue'

export function submitValidator(count) {
  return isNumber(count)
}

export default {
  name: 'SimpleCount',
  props: {},
  emit: {
    submit: submitValidator
  },
  setup(props, { emit }) {
    const count = ref(0)
    function onEmitSubmit() {
      emit('submit', count.value)
    }
    function onClickPlus() {
      ++count.value
    }
    return {
      count,
      onClickPlus,
      onEmitSubmit
    }
  }
}
</script>

<template>
  <div class="simple-count">
    <button @click="onClickPlus">+</button>
    <span>{{ count }}</span>
    <button @click="onEmitSubmit" role="submit">submit</button>
  </div>
</template>

<style scoped lang="scss">
.simple-count {
  // scss code
}
</style>
