/*
 * @Description : count 全局状态
 * @Date        : 2023-01-05 01:26:42 +0800
 * @Author      : JackChou
 * @LastEditTime: 2023-06-18 23:54:29
 * @LastEditors : ZhouQiJun
 */
import { defineStore } from 'pinia'

// 定义并导出容器
// 参数1：容器名字
// 参数2：选项对象
export const useCounter = defineStore('counter', {
  /**
   * 全局状态：使用箭头函数返回
   */
  state: () => {
    return {
      count: 100,
      age: 20,
      books: ['vue', 'react', 'svelte'],
    }
  },
  getters: {
    // NOTE getters 使用了 this，需要手动声明返回值类型
    booksStr(state): string {
      console.log(state.books)
      return this.books.join('--')
    },
  },
  actions: {
    complexChange(step: number) {
      this.age += step
      this.books.push('solidjs', 'lit')
    },
  },
})
