<!--
 * @Date        : 2022-11-02 14:19:48
 * @Author      : ZhouQiJun
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-17 22:27:40
 * @Description : 
-->
<script lang="ts">
export default {
  props: {
    isOpen: Boolean,
  },
  emits: {
    'close-modal': null,
  },
  setup(props, context) {
    // createMountEl()
    // NOTE 在 onMounted 创建 div 不行
    onMounted(createMountEl)

    const buttonClick = () => {
      context.emit('close-modal')
    }

    function createMountEl() {
      console.log('createMountEl', 'zqj log')
      // 在页面上添加一个div，用来挂载弹窗
      const modalContainer = document.createElement('div')
      modalContainer.classList.add('modal')
      // modalContainer.id = 'modal'
      document.body.appendChild(modalContainer)
    }
    return {
      buttonClick,
    }
  },
}
</script>

<template>
  <Teleport to=".modal" v-if="isOpen">
    <div class="modal--container">
      <h2>
        <slot>this is a modal</slot>
      </h2>
      <button @click="buttonClick">Close</button>
    </div>
  </Teleport>
</template>

<style>
.modal--container {
  position: fixed;
  top: 10%;
  left: 50%;
  width: 200px;
  height: 200px;
  margin-top: -100px;
  margin-left: -100px;
  border: 2px solid black;
  background-color: white;
}
</style>
