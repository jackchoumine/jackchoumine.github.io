<!--
 * @Date        : 2022-11-10 11:35:34
 * @Author      : ZhouQiJun
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-17 11:10:44
 * @Description : 
-->
<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useTabChange } from '@/hooks'
import { useCartStore } from '@/stores'

// import VideoPlayer from '../VideoPlayer/VideoPlayer.vue'
import ContactList from './ContactList.vue'
import TestHook from './HookTest.vue'
import { Modal, ModalHeader } from './Modal'
import SimpleCounter3 from './SimpleCounter3.vue'
import SimpleCounter from './SimpleCounter.vue'
import UseDebounceRefDemo from './UseDebounceRefDemo.vue'
import UseHoverDemo from './UseHoverDemo.vue'
import UseMouseFollower from './UseMouseDemo.vue'
import useCart from './useCart'

// hello
const books = ref([
  { id: 1, name: 'vue', price: 12 },
  { id: 2, name: 'react', price: 20 },
  { id: 3, name: 'angular', price: 21 },
])
const { addCart, removeCart /* items, totalBooks */ } = useCartStore()
// const { items, totalBooks } = storeToRefs(useCartStore())
// const { addCart, removeCart /* items, totalBooks */ } = useCart()
// const { items, totalBooks } = useCart()
// console.log(items)
// console.log(addCart)
// console.log(removeCart)
// 添加 readonly 之后，外部不可更改 items
// function onChangeItems() {
//   items.value = []
// }

const audio = ref(null)
useTabChange(hidden => {
  if (hidden) {
    audio.value?.pause()
  }
})
</script>

<template>
  <div>
    <h4>useDebounceRef</h4>
    <UseDebounceRefDemo />
    <h4>useHover</h4>
    <UseHoverDemo />
    <h4>useTabChange</h4>
    <audio
      ref="audio"
      controls
      src="https://mdn.github.io/webaudio-examples/audio-basics/outfoxing.mp3"></audio>
    <h3>组合函数例子</h3>
    <img
      src="https://jsd.cdn.zzko.cn/gh/jackchoumine/jack-picture@master/front-end-test.png"
      alt=""
      width="200"
      height="200" />
    <SimpleCounter />
    <SimpleCounter3 />
    <h3>在条件语句下使用组合函数</h3>
    <ContactList />
    <ContactList searchable />
    <h3>使用hook共享状态</h3>
    <h4>书本列表</h4>
    <ul>
      <li v-for="(item, index) in books" :key="index">
        <button @click="() => removeCart(item.id)">-</button>
        {{ item.name }} -- ￥{{ item.price }}
        <button @click="() => addCart(item)">+</button>
      </li>
    </ul>
    <!-- <h4>购物车</h4>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ item.name }} -- {{ item.number }}
      </li>
    </ul>
    <p>总的书本书数量：{{ totalBooks }}</p> -->
    <!-- <button @click="onChangeItems">修改共享的 items</button> -->
    <TestHook />
    <hr />
    <!-- <h4>useMouse</h4> -->
    <!-- <UseMouseFollower /> -->
    <!-- <VideoPlayer /> -->
    <hr />
    <h4>useContext</h4>
    <Modal>
      <ModalHeader>modal1</ModalHeader>
    </Modal>
    <Modal>
      <ModalHeader>modal2</ModalHeader>
    </Modal>
  </div>
</template>

<style lang="scss"></style>
