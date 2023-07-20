<!--
 * @Description : 
 * @Date        : 2021-11-07 22:10:28 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-11-07 23:14:40 +0800
 * @LastEditors : JackChou
-->
<template>
  <div ref="domDiv" class="container"></div>
</template>

<script>
/* 
交叉检测器：可以检测元素是否在视口中，并且可以获取元素的相对视口的位置
*/
export default {
  name: 'IntersectionObserver',
}
</script>

<script setup>
import { onMounted, ref, onUnmounted } from '@vue/runtime-core'
const domDiv = ref(null)
let io = null
function ioCallback(entries) {
  entries.forEach((entry) => {
    console.log(entry)
    // console.log(entry.isIntersecting)
    console.log(entry.intersectionRatio)
    if (entry.isIntersecting) {
      console.log('相交...')
    } else {
      console.log('不相交')
    }
  })
}
onMounted(() => {
  io = new IntersectionObserver(ioCallback, {
    root: document.querySelector('.srcoll-container'),
    rootMargin: '30px',
  })
  io.observe(domDiv.value)
})
onUnmounted(() => {
  io.unobserve(domDiv.value)
  // io.disconnect()
})
</script>

<style lang="scss" scoped></style>
