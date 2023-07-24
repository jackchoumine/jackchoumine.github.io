<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-24 17:49:45
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-24 20:02:38
 * @Description : 弹窗组件
-->
<template>
  <div>
    <button @click="closeModal" class="btn-close">关闭</button>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ModalDemo',
  props:['onClose'],
  methods:{
    closeModal(){
      this.$emit('close-modal','hello','modal')
      this.$emit('my-event')
      this.onClose&& this.onClose()
    }
  }
}
</script>
