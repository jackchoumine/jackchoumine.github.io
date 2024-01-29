<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-01-26 11:04:56
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-01-29 10:38:55
 * @Description : 监听 props
-->
<script setup lang="ts">
// const props = defineProps<{
//   modelValue?: string
//   boolVal?: boolean
//   numberVal?: number
//   obj: {
//     name: string
//     age: number
//   }
//   arr: string[]
// }>()
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  boolVal: {
    type: Boolean,
    default: false,
  },
  numberVal: {
    type: Number,
    default: 0,
  },
  obj: {
    type: Object,
    default: () => ({
      name: 'zhouQiJun',
      age: 18,
    }),
  },
  arr: {
    type: Array,
    default: () => ['1', '2', '3'],
  },
})
const emit = defineEmits(['update:modelValue'])

// 监听 string
// watch(
//   () => props.modelValue,
//   val => {
//     console.log('() => props.modelValue', val)
//   }
// )
// string 报错
// watch(props.modelValue, val => {
//   console.log('props.modelValue', val)
// })
// watch(
//   () => props.boolVal,
//   val => {
//     console.log('() => props.boolVal', val)
//   }
// )
// watch(
//   () => props.numberVal,
//   val => {
//     console.log('() => props.numberVal', val)
//   }
// )
// NOTE obj 是一个计算属性，监听不到  是一个 reactive 能监听
// 监听对象、数组
watch(props.obj, (val, old) => {
  console.log('props.obj', val, old)
})
// NOTE obj 是一个计算属性能监听 是一个 reactive 监听不到
watch(
  () => props.obj,
  (val, old) => {
    console.log('()=>props.obj', val, old)
  }
  // {
  //   deep: true,
  // }
)
// NOTE 监听对象、数组，使用箭头函数 + deep, reactive 和计算属性都能监听到
watch(
  () => props.obj,
  (val, old) => {
    console.log('()=>props.obj', val, old)
  },
  {
    deep: true,
  }
)
// watch(props.arr, (val, old) => {
//   console.log('props.arr', val, old)
// })
// // NOTE 监听不到
// watch(
//   () => props.arr,
//   (val, old) => {
//     console.log('()=>props.arr', val, old)
//   },
//   {
//     deep: true,
//   }
// )
</script>

<template>
  <div>
    <h2>监听 props</h2>
    <p>modelValue {{ props.modelValue }}</p>
    <p>boolVal {{ props.boolVal }}</p>
    <p>numberVal {{ props.numberVal }}</p>
    <p>props.obj.name --> {{ props.obj?.name }}</p>
    <p>props.obj.age --> {{ props.obj?.age }}</p>
    <p>props.arr --> {{ props.arr.join() }}</p>
  </div>
</template>
