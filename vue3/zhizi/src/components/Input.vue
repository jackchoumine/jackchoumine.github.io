<!--
 * @Description : 
 * @Date        : 2021-11-15 23:01:31 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-11-16 00:48:52 +0800
 * @LastEditors : JackChou
-->
<template>
  <div class="pd-3">
    <input
      class="form-control"
      :class="{ 'is-invalid': emailRef.message }"
      :value="emailRef.value"
      @input="onInputHandler"
      v-bind="$attrs"
      @blur="validateEmail"
    />
    <div class="invalid-feedback" v-if="emailRef.message">
      {{ emailRef.message }}
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Input',
  inheritAttrs: false,
}
</script>
<script lang="ts" setup>
import { reactive } from 'vue'
export type Rule = {
  // required?: boolean
  // minLength?: number
  // maxLength?: number
  // pattern?: RegExp
  type?: 'email' | 'url' | 'number' | 'tel' | 'text' | 'password' | 'required'
  message: string
}
const emailRef = reactive({
  value: '',
  message: '',
})

const props = defineProps<{ rules?: Rule[]; modelValue: string }>()

const emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/

function validateEmail() {
  if (!Array.isArray(props.rules)) {
    return
  }
  props.rules.every((rule) => {
    let passed = true
    emailRef.message = ''
    switch (rule.type) {
      case 'required':
        passed = emailRef.value.trim() !== ''
        emailRef.message = !passed ? rule.message : ''
        return passed
      case 'email':
        passed = emailReg.test(emailRef.value)
        emailRef.message = !passed ? rule.message : ''
        return passed
      default:
        break
    }
    return passed
  })
}
const emit = defineEmits(['update:modelValue'])
function onInputHandler(event: Event) {
  const target = event.target as HTMLInputElement
  emailRef.value = target.value
  emit('update:modelValue', target.value)
}
</script>
