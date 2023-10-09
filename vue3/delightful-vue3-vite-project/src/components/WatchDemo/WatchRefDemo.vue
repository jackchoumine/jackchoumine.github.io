<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-08-18 00:02:00
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-10-09 16:10:01
 * @Description : 
-->
<script setup lang="ts">
const a = ref(0)
const b = ref(10)
watch(a, (a, oldA) => {
  console.log(`watch(a),a:${a},oldA:${oldA}`)
})
// 监听不到 ❌ ts 也给出提示
watch(a.value, (a, oldA) => {
  console.log(`watch(a),a:${a},oldA:${oldA}`)
})

watch([a, b], ([a, b]) => {
  console.log(`watch([a, b] ,a:${a},b:${b}`)
})

const sum = computed(() => {
  return a.value + b.value
})

watch(sum, sum => {
  console.log(`watch(sum) ,sum:${sum}`)
})

watch([a, () => b.value + 1000], ([a, sum]) => {
  console.log(`watch([a, () => b.value + 1000] a:${a} sum:${sum}`)
})

function changeA() {
  a.value += 1
  b.value += 10
}

const numList = shallowRef<any[]>([1, 2, 3])
function changeNumList() {
  // NOTE shallowRef<Array> 无法改变 ❌ ref<Array> 是可以监听到改变的
  // numList.value.push(10, 20, 30)
  numList.value = [...numList.value, 10, 20, 30]
}

watch(numList, numList => {
  console.log(numList, `watch(numList), numList: ${numList}`)
})

function changeNumList2() {
  numList.value = ['10', '20', '30']
}
const shallowA = shallowRef({
  a: {
    b: {
      c: 10,
    },
  },
  d: 100,
})
watch(shallowA, val => {
  console.log('watch(shallowA): ', val)
})
watch(
  () => shallowA.value.a,
  val => {
    console.log('watch(() => shallowA.value.a): ', val)
  }
)
function changeShallowA() {
  shallowA.value = {
    ...shallowA.value,
    a: { b: 'this is a.b ' },
    // @ts-ignore
    e: 1000,
  }
}
</script>

<template>
  <div>
    <h2>watch ref</h2>
    <p>a:{{ a }}</p>
    <p>b:{{ b }}</p>
    <p>sum:{{ sum }}</p>
    <button @click="changeA">changeA</button>
    <h2>watch shallowRef</h2>
    <p>shallowA:{{ shallowA }}</p>
    <button @click="changeShallowA">changeShallowA</button>
    <h2>watch array</h2>
    <p>numList:{{ numList }}</p>
    <button @click="changeNumList">changeNumList</button>
    <button @click="changeNumList2">changeNumList2</button>
  </div>
</template>
