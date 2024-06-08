<!--
 * @Description: 首页
 * @Hash: ''
 * @Date: 2021-06-01 14:30:02 +0800
 * @Author: JackChou
 * @LastEditTime: 2024-06-08 23:50:37
 * @LastEditors : ZhouQiJun
-->
<template>
  <div>
    <Demos />
    <DynamicComponent />
    <el-button type="danger" @click="onRemoveSomething">删除</el-button>
    <DebounceTest />
    <FormTableTest />
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {}
  },
  methods: {
    onRemoveSomething() {
      this.$showConfirm('删除后不能恢复', '确定删除吗？').then(isOk => {
        if (isOk) {
          console.log('确定')
        } else {
          console.log('取消')
        }
      })
    },
  },
}
</script>

<style></style>
