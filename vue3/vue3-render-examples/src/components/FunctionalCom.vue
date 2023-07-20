<template>
  <div>
    <MyTitle @my-click="onMyClick" :title="'使用模板定义的函数组件'" :id="Math.random().toString(36)" />
    <MyTitleFun
      class="my-class"
      :title="'使用普通函数定义函数组件'"
      :id="Math.random().toString(36)"
      @my-click="onMyClick"
    >
      <template #default>
        <span>默认插槽</span>
      </template>
      <template #mySlot>
        <span>默认插槽</span>
      </template>
    </MyTitleFun>
  </div>
</template>
<script>
import { ref, reactive, watch, computed } from 'vue'
import MyTitleFun from './MyTitleFun.jsx'
import MyTitle from './MyTitle.vue'
export default {
  name: 'FunctionalCom',
  components: { MyTitle, MyTitleFun },
  setup(props, { emit, attrs, slots }) {
    const onMyClick = data => {
      console.log(data)
    }
    return { onMyClick }
  },
}
</script>
