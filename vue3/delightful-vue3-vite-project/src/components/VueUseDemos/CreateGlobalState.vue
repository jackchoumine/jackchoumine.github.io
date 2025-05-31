<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-05-15 16:44:23
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-05-28 10:23:47
 * @Description :
-->
<script lang="ts" setup name="CreateGlobalState">
import { useGlobalCounter, useOpen, useOpen2 } from './store'

const { count } = useGlobalCounter()
const { isOpen } = useOpen()
const { isOpen: isOpen2 } = useOpen2('hello', 'open2')
</script>

<template>
  <div class="create-global-state">
    <h4>使用闭包共享全局状态</h4>
    <p>count {{ count }}</p>
    <p>isOpen2 {{ isOpen2 }}</p>
    <h4>使用全局变量保存全局状态</h4>
    <p>isOpen {{ isOpen }}</p>
  </div>
</template>

<style scoped lang="scss">
.create-global-state {
  // scss code
}
</style>
