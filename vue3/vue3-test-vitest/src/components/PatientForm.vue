<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-07-29 09:41:27
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-07-30 11:33:43
 * @Description : 病人表单
 NOTE:
 如何测试表单？

-->
<script setup>
import { reactive, ref, computed } from 'vue'
import { patientForm, isFormValid } from './formValidation'

function onSubmit() {
  console.log('submit')
}
const formValue = reactive({
  name: '',
  age: ''
})
const formValidation = computed(() => {
  return patientForm(formValue)
})
const isValid = computed(() => {
  return isFormValid(formValidation.value)
})
</script>

<template>
  <form>
    <div class="prop">
      <div class="error" v-if="!formValidation.name.valid">
        {{ formValidation.name.message }}
      </div>
      <label for="name">Name</label>
      <input id="name" v-model="formValue.name" />
    </div>
    <div class="prop">
      <div class="error" v-if="!formValidation.age.valid">
        {{ formValidation.age.message }}
      </div>
      <label for="age">Age</label>
      <input id="age" v-model="formValue.age" type="number" />
    </div>
    <button @click="onSubmit" :disabled="!isValid">Submit</button>
    <pre>formValue {{ formValue }}</pre>
    <pre>formValidation {{ formValidation }}</pre>
  </form>
</template>
