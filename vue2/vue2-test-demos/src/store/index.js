/*
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-23 03:23:18
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-02 22:32:40
 * @Description :
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'

Vue.use(Vuex)

export const storeConfig = {
  state: {
    todos: [],
    count: 0,
  },
  mutations,
  actions,
  getters,
}

export default new Vuex.Store(storeConfig)
