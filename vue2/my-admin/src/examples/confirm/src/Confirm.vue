<!--
 * @Description: 确认弹窗
 * @Date: 2021-06-03 14:49:13 +0800
 * @Author: JackChou
 * @LastEditTime: 2024-06-08 23:21:21
 * @LastEditors: JackChou
-->
<template>
  <div v-if="show" ref="myModal" class="modal">
    <div ref="myModalContent" class="modal-content">
      <div>{{ title }}</div>
      <slot name="default">
        <div>{{ content }}</div>
      </slot>
      <slot name="footer">
        <div class="footer">
          <button @click="onCancel">取消</button>
          <button @click="onConfirm">确定</button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmModal',
  props: {
    title: {
      type: String,
      default: '确定操作吗？',
    },
    content: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    // onCancel() {
    //   console.log(this.$options)
    //   this.show = false
    //   return false
    // },
    // onConfirm() {
    //   return true
    // },
  },
}
</script>

<style lang="less">
.modal {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99; // 确保弹窗在顶层
  width: 100%;
  height: 100%;
  background-color: #e4e4e4c7;
  &-content {
    position: relative;
    left: 50%;
    top: 50%;
    width: 20vw;
    height: 100px;
    z-index: 999; //
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // align-items: flex-end;
    background-color: #fff;
    .footer {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
