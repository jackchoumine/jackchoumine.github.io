/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-22 20:00:43
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-22 22:58:56
 * @Description : 关于博主，前端程序员，最近专注于 webGis 开发
 * @加微信         : MasonChou123，进技术交流群
 */
import Vue from 'vue'

export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = Vue.observable({ value: 0 })
  const y = Vue.observable({ value: 0 })

  // 组合式函数可以随时更改其状态。
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // 一个组合式函数也可以挂靠在所属组件的生命周期上
  // 来启动和卸载副作用
  const mixins = {
    mounted() {
      window.addEventListener('mousemove', update)
    },
    destroyed() {
      window.removeEventListener('mousemove', update)
    },
  }
  // 通过返回值暴露所管理的状态
  return { x, y, mixins }
}

export function useCounter(initVal) {
  const count = Vue.observable({ value: initVal })
  console.log({ count })
  const mixins = {
    computed: {
      doubleCount: () => {
        return count.value * 2
      },
    },
    methods: {
      add: (step = 1) => {
        count.value += step
      },
    },
  }
  return {
    count,
    mixins,
  }
}
