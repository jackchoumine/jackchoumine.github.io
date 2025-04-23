/*
 * @Author      : ZhouQiJun
 * @Date        : 2025-04-22 20:00:43
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2025-04-23 01:20:03
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
  const countIn = Vue.observable({ value: initVal })

  /**
   * 属性冲突：
   * 1. 生命周期冲突，mixin 中的先执行
   * 2. 其他属性冲突，mixin 的属性被覆盖
   * 缓解办法：
   * 1. mixin 中的属性进行特殊命名，vue 推荐使用 $_xxx 或者 xxxIn 命名 全局 mixin 使用 $g_xxx，优先使用局部混入
   *    因为 _xxx 是私有属性 $xxx 是 Vue 的特殊属性 其他命名约定可读性不高 比如 xxx
   * 2. mixin 中使用的方法或者属性应该直接在 mixin 中读取
   *    不是直接从 mixin 读取，组件就必须提供，否则就会报错，但是从组件提供属性，非常容易引发错误，且团队协作体验差 -- 成员一眼看出属性来自组件
   *   【隐式依赖】导致依赖来源不明确。团队协作中应该尽量避免隐式依赖
   * 3. 组件中的 mixin 不应该超过 2 个
   */
  const mixins = {
    mounted() {
      console.log('mixins mounted')
    },
    computed: {
      doubleCountIn: () => {
        return countIn.value * 2
      },
    },
    methods: {
      addIn: (step = 1) => {
        countIn.value += step
      },
    },
  }
  return {
    countIn,
    mixins,
  }
}
