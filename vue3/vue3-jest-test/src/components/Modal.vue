<template>
  <div class="modal-container">
    我是弹窗组件
    <button type="button" @click="close">点击我关闭</button>
  </div>
</template>

<script>
import { ref, onMounted, reactive, watch, computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'Modal',
  components: {},
  setup(props, { emit, attrs, slots }) {
    onMounted(() => {
      console.log('onMounted')
    })
    function close() {
      const modal = document.querySelector('.modal')
      document.body.removeChild(modal)
    }
    return { close }
  },
})
</script>

<style>
.modal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 200px;
  z-index: 1000;
  background-color: #ccc;
}
.modal-container {
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background-color: red;
}
</style>
