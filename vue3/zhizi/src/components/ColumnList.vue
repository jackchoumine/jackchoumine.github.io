<!--
 * @Description :
 * @Date        : 2021-10-06 01:14:08 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-06 15:06:16 +0800
 * @LastEditors : JackChou
-->
<template>
  <div class="row">
    <div v-for="col in cols" :key="col.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="col.avatar"
            :alt="col.title"
            class="rounded-circle border border-light w-25 my-3"
          />
          <h5 class="card-title">{{ col.title }}</h5>
          <p class="card-text text-start">
            {{ col.description }}
          </p>
          <a href="#" class="btn btn-outline-primary">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, reactive, watch, computed, defineComponent, PropType } from 'vue'
import logo from '../assets/logo.png'

export type ColumnListProps = {
  id: number
  title: string
  avatar?: string
  description: string
}

export default defineComponent({
  name: 'ColumnList',
  components: {},
  props: {
    list: {
      // 类型声明的好处：① 自带文档 ② 在 setup 和 模板中得到类型提示
      type: Array as PropType<ColumnListProps[]>,
      default: () => [],
    },
  },
  setup(props, { emit, attrs, slots }) {
    const cols = computed(() => {
      return props.list.map((item) => {
        // 不支持 require 引入
        // https://juejin.cn/post/6934316962952544269
        if (!item.avatar) item.avatar = logo
        return item
      })
    })
    return { cols }
  },
})
</script>
<style scoped lang="scss"></style>
