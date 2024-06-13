<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-06-13 00:45:26
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-13 01:49:31
 * @Description : 
-->
<script>
export default {
  name: 'SimpleCounter',
  data: () => {
    return {
      count: 1
    }
  },
  methods: {
    onAdd() {
      this.count += 1
      this.$emit('add', this.count)
    },
    onMinus() {
      this.count -= 1
      this.$emit('minus', this.count)
    }
  }
}
</script>

<template>
  <div>
    <button @click="onAdd" role="add">+</button>
    <span>{{ count }}</span>
    <button @click="onMinus" role="minus">-</button>
  </div>
</template>
