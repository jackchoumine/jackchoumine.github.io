<!--
 * @Description :
 * @Date        : 2021-10-27 21:57:25 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-11-07 20:14:30 +0800
 * @LastEditors : JackChou
-->
<template>
  <div>
    <h1>vue3 的语法</h1>
    <p>count:{{ count }}</p>
    <p>doubleCount:{{ doubleCount }}</p>
    <p>count:{{ obj.count }}</p>
    <button @click="onClick">+1</button>
    <ul v-if="!error">
      <li v-for="item in data" :key="item.id">{{ item.name }}</li>
    </ul>
    <div v-else>{{ error }}</div>
    <h2>状态共享</h2>
    <p>age:{{ state.age }}</p>
  </div>
</template>

<script>
import { onMounted, ref, computed, watch, reactive } from 'vue'
import { useTitle, useFetch } from '@hooks'
import { state } from './store'
export default {
  name: 'DemoV3',
  setup() {
    const count = ref(0)
    const obj = reactive({ count, name: 'Mason' })
    console.log(obj.count) // 0
    const doubleCount = computed(() => count.value * 2)
    onMounted(() => {
      setTimeout(() => {
        count.value = 20
      }, 3000)
    })
    function onClick() {
      count.value++
      state.age = state.age + 10
    }
    // watch(count.value) ❌
    watch(count, (newVal, oldVal) => {
      console.log(newVal, oldVal)
      name.value = newVal
    })
    const name = ref('hello')
    const title = computed(() => {
      return `${name.value} world`
    })
    const docTitle = useTitle()
    docTitle.value = title.value

    const { data, error } = useFetch('https://api.thecatapi.com/v1/categories')

    return {
      state,
      error,
      data,
      obj,
      count,
      doubleCount,
      onClick,
    }
  },
}
</script>
