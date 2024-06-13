<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-06-12 21:04:24
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-12 21:21:56
 * @Description : Message 组件
-->
<script lang="ts">
export function validatorType(type) {
  const typeList = ['success', 'info', 'warning', 'error']
  if (!typeList.includes(type)) {
    throw new Error(`type must be one of ${typeList.join(', ')}, your type is ${type}`)
  }
  return true
}

export default {
  name: 'MyMessage',
  props: {
    type: {
      type: String,
      required: true,
      validator: validatorType
    }
  }
}
</script>

<template>
  <div :class="['message', type]">
    <slot></slot>
  </div>
</template>
