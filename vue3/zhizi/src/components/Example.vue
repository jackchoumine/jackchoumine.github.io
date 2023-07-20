<!--
 * @Description : 
 * @Date        : 2021-11-15 22:52:47 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-11-16 01:03:42 +0800
 * @LastEditors : JackChou
-->
<template>
  <div>
    <Form>
      <!-- <Form-Item> -->
      <div class="mb-3">
        <label class="form-label">Email address</label>
        <Input :rules="emailRules" v-model="email" placeholder="请输入邮箱" type="text" />
      </div>
      <!-- </Form-Item> -->
      <div class="mb-3">
        <label class="form-label">密码</label>
        <Input v-model="password" placeholder="请输入密码" type="password" />
      </div>
    </Form>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Example',
}
</script>
<script lang="ts" setup>
import { shallowReactive, ref } from 'vue'
import Form from './Form.vue'
import Input, { Rule } from './Input.vue'

const rules: Rule[] = [
  { type: 'required', message: '请输入邮箱' },
  { type: 'email', message: '请输入正确的邮箱' },
]

const emailRules = shallowReactive(rules)
const email = ref('')
const password = ref('')
</script>
