<!--
 * @Description : 测试 provider 和 inject 
 * @Date        : 2022-10-29 20:38:56 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-10-29 20:40:56 +0800
 * @LastEditors : JackChou
-->
<template>
  <button @click="add">{{ count }}</button>
</template>

<script>
import { computed, defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'DemoProvide',
  setup(props, { emit, attrs, slots }) {
    const store = inject('store')
    const count = computed(() => {
      return store.state.count
    })
    function add() {
      store.commit('add')
    }
    return { count, add }
  },
})
</script>
<style scoped lang="scss"></style>
