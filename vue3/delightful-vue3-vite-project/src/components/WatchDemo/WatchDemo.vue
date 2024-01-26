<!--
 * @Date        : 2022-11-04 09:41:26
 * @Author      : ZhouQiJun
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-26 11:57:39
 * @Description : watch 有哪些用法 
-->
<template>
  <div>
    <h1>watch</h1>
    <WatchProps
      v-model="modelValue"
      :bool-val="isOk"
      :number-val="money"
      :obj="obj"
      :arr="testArr" />
    <button @click="changeObjAndModelValue">changeObjAndModelValue</button>
    <WatchCleanUp />
    <WatchRefDemo />
    <WatchRef />
    <WatchReactive />
  </div>
</template>

<script setup lang="ts">
import WatchCleanUp from './WatchCleanUp.vue'
import WatchProps from './WatchProps.vue'
import WatchReactive from './WatchReactive.vue'
import WatchRef from './WatchRef.vue'
import WatchRefDemo from './WatchRefDemo.vue'

const modelValue = ref('')
const isOk = ref(true)
const money = ref(100)
const obj = reactive({
  name: 'zhouQiJun',
  age: 18,
})
const testArr = ref(['1', '2', '3'])

function changeObjAndModelValue() {
  modelValue.value = 'modelValue' + Math.random()
  isOk.value = !isOk.value
  money.value = 100 * Math.random()
  obj.name = 'zhouQiJun2'
  obj.age = 20 * Math.random()
  testArr.value.push(Math.random() + '')
}
</script>

<style lang="scss"></style>
