/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-23 03:23:18
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-02 21:13:59
 * @Description :
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [],
  },
  getters: {
    getTodos(state) {},
  },
  mutations: {},
  actions: {},
  modules: {},
})
