<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-05-15 16:44:23
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-12-13 12:14:21
 * @Description : 
-->
<script lang="ts" setup name="CreateGlobalState">
import { useGlobalCounter, useOpen, useOpen2 } from './store'

const { count } = useGlobalCounter()
const { isOpen } = useOpen()
const { isOpen: isOpen2 } = useOpen2()
</script>

<template>
  <div class="create-global-state">
    <p>count {{ count }}</p>
    <p>isOpen {{ isOpen }}</p>
    <p>isOpen2 {{ isOpen2 }}</p>
  </div>
</template>

<style scoped lang="scss">
.create-global-state {
  // scss code
}
</style>
