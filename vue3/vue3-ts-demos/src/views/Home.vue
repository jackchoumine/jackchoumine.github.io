<template>
  <div>
    <h1>home</h1>
    <TestLayer/>
    <span class="rating">hello web component in stencil!</span>
    <!-- BUG 无法监听事件 -->
    <!-- https://github.com/ionic-team/stencil/issues/2804 -->
    <!-- 传递复杂数据 https://github.com/ionic-team/stencil/issues/2810 -->
    <my-rating
      ref="myRating"
      :max-value="maxValue"
      :value="value"
      @rating-change="ratingChange"
      :is-show="false"
      :person.prop="{ name: 'stencil--' }"
      :personArray.prop="personArray"
    />
    <button @click="changeRating">修改评价</button>
    <hr />
    <h2>TestStencil</h2>
    <TestStencil />
    <hr />
    <p>render</p>
    <StencilRender :personArray="[{ name: 'stencil------' }]" />
    <HelloWorld msg="hello web component" @plus="change">
      <template #default>
        <h3>default slot</h3>
      </template>
      <template #left>
        <h3>left slot</h3>
      </template>
      <template #right="{ doubleCount }">
        <h3>right slot {{ doubleCount }}</h3>
      </template>
    </HelloWorld>
    <web-hello-world msg="hello web component" @plus="change2">
      <!-- <template #default>
        <h3>default slot</h3>
      </template> -->
      <!-- <template #left>
        <h3>left slot</h3>
      </template> -->
      <!-- <template #right="{ doubleCount }">
        <h3>right slot {{ doubleCount }}</h3>
      </template> -->
    </web-hello-world>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, nextTick } from 'vue'
import HelloWorld from '../components/HelloWorld.vue'
import TestStencil from './TestStencil.vue'
import TestLayer from './TestLayer.vue'
import StencilRender from './StencilRender.jsx'

const maxValue = ref(5)
const value = ref(1)
const myRating = ref(null)
const personArray = ref([{ name: 'stencil' }, { name: 'vue', age: 7 }, { name: 'react' }])
function change(count: number) {
  console.log(count)
}
function change2(event: CustomEvent) {
  console.log(event.detail)
}
onMounted(() => {
  console.log('Home mounted')
  const myRatingComponent = document.querySelector('my-rating')
  setTimeout(() => {
    // @ts-ignore
    myRatingComponent!.maxValue = 4
    myRatingComponent!.setAttribute('value', '4')
    console.log('set value')
    // NOTE 可检查到变化
    personArray.value.push({ name: 'stencil-vue' })
    // maxValue.value = 10
    // @ts-ignore
    // myRating.value!.getValue({ maxValue: 10, value: 5 }).then((value) => {
    //   console.log('get value', value)
    // })
    nextTick(() => {
      console.log(myRating.value)
    })
  }, 2000)
  // @ts-ignore
  // myRatingComponent!.addEventListener('ratingChange', ({ detail }) => {
  //   console.log('rating changed', detail)
  //   // alert(`rating change ${detail.value}`)
  // })
})
function changeRating() {
  maxValue.value = Math.max(Math.random() * 10, 5)
  value.value = Math.floor(Math.random() * maxValue.value)
}
function ratingChange(event: CustomEvent) {
  console.log('rating changed', event.detail)
}
</script>
<style scoped lang="scss"></style>
