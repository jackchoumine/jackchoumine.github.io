<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-06-08 20:11:57
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-08 20:59:20
 * @Description : 
-->
<script>
import FunOne from './FunctionalComponent/FunOne.vue'
import FunTwo from './FunctionalComponent/FunTwo'
import DemoOne from './dynamic-component/DemoOne.vue'
export default {
  name: 'Demos',
  components: {
    FunOne,
    DemoOne,
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
    <DemoOne />
    <h2>函数式组件</h2>
    <FunOne title="使用模板定义的函数式组件" />
    <FunTwo title="使用render函数定义的函数式组件" />
  </div>
</template>
