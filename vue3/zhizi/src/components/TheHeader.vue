<!--
 * @Description : 页面导航头部
 * @Date        : 2021-10-07 00:37:15 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-11-15 18:51:56 +0800
 * @LastEditors : JackChou
-->
<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-3">
    <a href="#" class="navbar-brand">知之专栏</a>
    <ul v-if="!user.hasLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light my-2">登录</a>
      </li>
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light my-2">注册</a>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <Dropdown :title="`你好，${user.name}`">
          <DropdownItem disabled>
            <a href="#" class="dropdown-item">新建文章</a>
          </DropdownItem>
          <DropdownItem>
            <a href="#" class="dropdown-item">新建文章</a>
          </DropdownItem>
        </Dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { ref, reactive, watch, computed, defineComponent, PropType } from 'vue'
import Dropdown from './Dropdown.vue'
import DropdownItem from './DropdownItem.vue'

export type UserProps = {
  hasLogin: boolean
  name?: string
  id?: number
}

export default defineComponent({
  name: 'TheHeader',
  components: {
    Dropdown,
    DropdownItem,
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true,
    },
  },
  setup(props, { emit, attrs, slots }) {
    return {}
  },
})
</script>

<style lang="scss"></style>
