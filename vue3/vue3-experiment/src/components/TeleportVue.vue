<!--
 * @Description: 
 * @Hash: 不是路由组件
 * @Date: 2021-01-13 14:15:31 +0800
 * @Author: JackChou
 * @LastEditTime: 2021-03-18 16:57:35 +0800
 * @LastEditors: JackChou
-->
<template>
  <div>
    <a-button
      @click="
        () => {
          onClick(true)
        }
      "
    >
      打开modal
    </a-button>
    <Teleport to=".modal-container">
      <div v-if="isOpen" class="modal">
        <h2>Teleport组件</h2>
        <div>body</div>
        <p>modal footer</p>
        <a-button
          @click="
            () => {
              onClick(false)
            }
          "
        >
          关闭
        </a-button>
      </div>
    </Teleport>
  </div>
</template>
<script>
import { defineComponent, ref, reactive, watch, computed, onMounted, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'TeleportVue',
  components: {},
  setup(props, { emit, attrs, slots }) {
    // 创建挂起点
    const body = document.body
    const firstDiv = body.firstElementChild
    const modalDiv = document.createElement('div')
    modalDiv.classList.add('modal-container')
    const zIndex = 100,
      width = 50,
      height = 50,
      position = 'absolute',
      backgroundColor = 'red',
      display = 'none'
    const style = `z-index:${zIndex};width:${width}%;height:${height}%;position:${position};background-color:${backgroundColor};display:${display};`
    modalDiv.style = style
    body.insertBefore(modalDiv, firstDiv)

    const isOpen = ref(false)
    const onClick = open => {
      modalDiv.style.display = open ? 'block' : 'none'
      isOpen.value = open
    }
    onMounted(() => {
      // const instance = getCurrentInstance()
      // const body = document.body
      // const firstDiv = body.firstElementChild
      // const modalDiv = document.createElement('div')
      // modalDiv.classList.add('modal-container')
      // body.insertBefore(modalDiv, firstDiv)
    })
    return { isOpen, onClick }
  },
})
</script>
<style scoped lang="css">
.modal {
  height: 50%;
  width: 50%;
  position: relative;
  z-index: 999;
  background-color: gray;
}
</style>
