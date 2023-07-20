<!--
 * @Description : 
 * @Date        : 2021-11-15 22:49:33 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-11-16 01:33:30 +0800
 * @LastEditors : JackChou
-->
<template>
  <form class="needs-validation">
    <slot></slot>
    <slot name="submit">
      <button type="submit" class="btn btn-primary">提交</button>
    </slot>
  </form>
</template>
<script lang="ts">
export default {
  name: 'Form',
}
</script>
<script lang="ts" setup>
import { reactive, ref, shallowReactive } from 'vue'
import Input, { Rule } from './Input.vue'

const rules: Rule[] = [
  { type: 'required', message: '请输入邮箱' },
  { type: 'email', message: '请输入正确的邮箱' },
]
const emailRules = shallowReactive(rules)
const email = ref('')
const password = ref('')
</script>
<style></style>
