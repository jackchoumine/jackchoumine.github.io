<!--
 * @Description :
 * @Date        : 2021-10-27 22:05:30 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-11-10 22:59:17 +0800
 * @LastEditors : JackChou
-->
<template>
  <div>
    <LineChart />
    <DemoV2 @vnode-mounted="mounted" @vnode-before-unmount="beforeUnmount" />
    <DemoV3 />
    <MyInput v-model="input" />
    <p>{{ input }}</p>
    <!-- <Foo :data="[{ a: 'a', b: 'b', c: 'c' }]" keys="" /> -->
    <ResizeObserver />
    <LazyLoadImg />
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ResizeObserver, LazyLoadImg } from '@com'
import DemoV2 from '../components/DemoV2.vue'
import DemoV3 from '../components/DemoV3.vue'
import MyInput from '../components/MyInput.vue'
import { LineChart } from '@com/Charts'
import { event } from '@utils'
// import { Foo } from '../components/jsx/Foo'
const input = ref('hello')
function mounted() {
  console.log('mounted')
}
event.on('event-name', function (data) {
  console.log('data --- ')
  console.log(data)
})

function beforeUnmount() {
  console.log('DemoV2 beforeUnmount')
}

onMounted(() => {
  console.log('vue3 mounted')
  function onResize() {
    console.log('onResize')
  }
  window.addEventListener('resize', onResize)
  event.once('vnode-before-unmount', () => {
    console.log('vnode-before-unmount')
    removeEventListener('resize', onResize)
  })
})
</script>
<style scoped lang="scss"></style>
