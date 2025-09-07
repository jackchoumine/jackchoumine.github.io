import { computed, effect, reactive, ref } from '@vue/reactivity'

// 创建响应式对象
const state = reactive({
  count: 0,
  message: 'Hello',
  user: {
    name: 'John',
    age: 25,
  },
})

// 创建响应式引用
const countRef = ref(0)

// 创建计算属性
const doubled = computed(() => state.count * 2)

// 副作用 effect
effect(() => {
  console.log('count changed:', state.count)
  console.log('doubled value:', doubled.value)
})

// 触发更新
state.count++ // 自动触发 effect
countRef.value++ // 也会触发相关的 effect
