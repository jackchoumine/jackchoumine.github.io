<template>
  <div>
    <h1>watchEffect</h1>
    <span>商品价格：</span>
    <a-input-number v-model:value="prod.price" :min="1" :max="100" />
    <br />
    <span>商品数量：</span>
    <a-input-number v-model:value="prod.num" :min="1" :max="100" />
    <br />
    <span>用户数：</span>
    <a-input-number v-model:value="num" :min="0" :max="100" />
    <br />
    <span>总价：{{ total }}</span>
  </div>
</template>
<script>
import { defineComponent, reactive, ref, watchEffect } from 'vue'
export default defineComponent({
  name: 'WatchEffect',
  setup() {
    const prod = reactive({
      price: 1,
      num: 1,
    })
    const num = ref(0)
    const total = ref(0)
    watchEffect(data => {
      console.log('data')
      console.log(data)
      total.value = prod.price * prod.num * num.value
    })
    return { prod, num, total }
  },
})
</script>
<style scoped lang="scss"></style>
