<!--
 * @Description :
 * @Date        : 2021-10-27 21:57:25 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-28 02:04:45 +0800
 * @LastEditors : JackChou
-->
<template>
  <div>
    <h1>vue2 的语法</h1>
    <p>count:{{ count }}</p>
    <p>doubleCount:{{ doubleCount }}</p>
    <button @click="onClick">+1</button>
    <p>_age:{{ _age }}</p>
  </div>
</template>

<script>
import { state } from './store'
export default {
  name: 'DemoV2',
  data() {
    return {
      count: 10,
    }
  },
  computed: {
    doubleCount() {
      return this.count * 2
    },
    _age() {
      return state.age
    },
  },
  mounted() {
    // 模拟异步获取数据
    setTimeout(() => {
      this.count = 20
    }, 3000)
  },
  methods: {
    onClick() {
      this.count++
    },
  },
}
</script>
