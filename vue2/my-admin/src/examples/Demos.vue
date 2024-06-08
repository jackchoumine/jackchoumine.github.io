<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-06-08 20:11:57
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-08 20:19:15
 * @Description : 
-->
<script>
import FunOne from './FunctionalComponent/FunOne.vue'
import FunTwo from './FunctionalComponent/FunTwo'
export default {
  name: 'Demos',
  components: {
    FunOne,
    FunTwo,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<template>
  <div>
    <h2>函数时组件</h2>
    <FunOne title="使用模板定义的函数式组件" />
    <FunTwo title="使用render函数定义的函数式组件" />
  </div>
</template>
