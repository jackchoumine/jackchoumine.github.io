<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-05-15 16:44:23
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-12-13 12:12:52
 * @Description : 
-->
<script lang="ts" setup name="CreateGlobalState">
import { useGlobalCounter, useOpen, useOpen2 } from './store'

const { count } = useGlobalCounter()
const { isOpen, toggleOpen } = useOpen()
const { isOpen: isOpen2, toggleOpen: toggleOpen2 } = useOpen2()

function decrement() {
  count.value--
}
function increment() {
  count.value++
}
</script>

<template>
  <div class="create-global-state">
    <h4>修改全局状态</h4>
    <button @click="decrement" class="btn-min">-</button>
    <button @click="increment" class="btn-plus">+</button>
    <p>count {{ count }}</p>
    <h4>使用全局变量保存全局状态</h4>
    <ElButton @click="() => toggleOpen()" type="primary">切换 open {{ isOpen }}</ElButton>
    <ElButton @click="() => toggleOpen2()" type="primary">
      切换 open2 {{ isOpen2 }}
    </ElButton>
  </div>
</template>

<style scoped lang="scss">
.create-global-state {
  // scss code
  .btn-plus,
  .btn-min {
    width: 50px;
  }
}
</style>
