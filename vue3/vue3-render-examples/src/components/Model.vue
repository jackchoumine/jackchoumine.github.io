<template>
  <div>
    <h2>测试 vModel</h2>
    <MyInput />
    <h2>二次封装v-model</h2>
    <YouTextareaJSX v-model="youInput" />
    <!-- <YouTextarea v-model="youInput" /> -->
    <p>{{ youInput }}</p>
    <hr />
    <TextareaModelTwo />
    <hr />
    <TextareaModel />
    <hr />
    <MyTextarea v-model="input" v-model:title="title" />
    <h1>父组件：{{ input }}</h1>
    <MyInputOne />
    <MyInputTwo />
  </div>
</template>
<script>
import { ref, reactive, watch, computed } from 'vue'
import MyInputOne from './MyInputOne.vue'
import MyInputTwo from './MyInputTwo.jsx'
import MyTextarea from './MyTextarea.vue'
import TextareaModel from './TextareaModel.js'
import TextareaModelTwo from './TextareaModelTwo'
import YouTextarea from './YouTextarea.vue'
import YouTextareaJSX from './YouTextareaJSX.jsx'
import MyInput from './MyInput.jsx'
export default {
  name: 'Model',
  components: {
    YouTextareaJSX,
    YouTextarea,
    TextareaModelTwo,
    TextareaModel,
    MyTextarea,
    MyInput,
    MyInputTwo,
    MyInputOne,
  },
  setup(props, { emit, attrs, slots }) {
    const input = ref('')
    const title = ref('title')
    const youInput = ref('youInput')
    return { input, title, youInput }
  },
}
</script>
<style scoped lang="scss"></style>
