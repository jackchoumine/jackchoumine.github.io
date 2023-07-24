<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-24 20:11:02
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-24 20:13:50
 * @Description : 
-->
<template>
  <div class="form-demo">
    <form @submit="submitForm">
      <button>提交</button>
    </form>
  </div>
</template>

<script>
export default {
    name: 'FormDemo',
    data() {
        return {
            // data
        }
    },
    methods: {
        // methods
        submitForm() {
            this.$emit('form-submit')
        }
    },
}
</script>
