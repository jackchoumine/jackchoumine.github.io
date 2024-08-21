<!--
 * @Author      : ZhouQiJun
 * @Date        : 2024-08-21 20:40:40
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-08-21 22:50:46
 * @Description : 
-->
<script setup>
import { ref, computed, reactive } from 'vue'
import { isFormValid, patientForm } from './formValidation'

const emit = defineEmits(['submit-form'])
const formValue = reactive({
  name: '',
  age: undefined
})

const validatedForm = computed(() => {
  return patientForm(formValue)
})

const valid = computed(() => {
  return isFormValid(validatedForm.value)
})

function onEmitSubmitForm() {
  emit('submit-form')
}
</script>

<template>
  <div class="FormValidation">
    <h3>病人信息</h3>
    <form>
      <div class="field">
        <div v-if="!validatedForm.name.valid" class="error name">
          {{ validatedForm.name.message }}
        </div>
        <label for="name">姓名</label>
        <input type="text" id="name" v-model="formValue.name" />
      </div>
      <div class="field">
        <div v-if="!validatedForm.age.valid" class="error age">
          {{ validatedForm.age.message }}
        </div>
        <label for="age">年龄</label>
        <input type="text" id="age" v-model="formValue.age" />
      </div>
      <div class="filed">
        <button :disabled="!valid" type="submit" @click.stop="onEmitSubmitForm">保存</button>
      </div>
    </form>
    <pre>
      {{ formValue }}
    </pre>
    <hr />
    <pre>
      {{ validatedForm }}
      <br/>
      {{ valid }}
    </pre>
  </div>
</template>

<style scoped lang="scss">
.FormValidation {
  // scss code
}
</style>
