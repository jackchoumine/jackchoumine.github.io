<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-21 08:47:44
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-10 16:11:07
 * @Description : 测试元素可见性和存在性
-->
<template>
  <button type="button">all</button>
  <button v-if="admin" type="button" id="admin">admin</button>
  <button v-show="dev" type="button" id="dev">dev</button>
  <button
    type="button"
    id="opacity"
    :style="{ opacity: opacity }"
    class="opacity-button hello">
    opacity
  </button>
</template>
<script>
export default {
  name: 'Condition',
  data() {
    return { admin: true, dev: false, opacity: 0 }
  },
}
</script>
