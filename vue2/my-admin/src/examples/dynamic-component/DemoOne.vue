<script>
import { Button } from 'element-ui'
import Vue from 'vue'

export default {
  name: 'DemoOne',
  methods: {
    showElButton() {
      this.$showElButton(this.$refs.container)
    },
  },
}
</script>

<template>
  <div>
    <h2>动态挂载组件</h2>
    <button @click="showElButton">显示el-button</button>
    <div>
      <div ref="container"></div>
    </div>
  </div>
</template>
