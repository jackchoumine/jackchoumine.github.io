<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-24 17:49:45
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-24 17:51:21
 * @Description : 弹窗组件
-->
<template>
  <div>
    <button @click="onClose" class="btn-close">关闭</button>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ModalDemo',
  props:['onClose'],
}
</script>
