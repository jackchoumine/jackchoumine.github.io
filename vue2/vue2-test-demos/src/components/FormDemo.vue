<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-24 20:11:02
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-08-10 17:22:32
 * @Description : 
-->
<template>
  <div class="form-demo">
    <form @submit="submitForm">
      <input v-model="email" type="email" />
      <br />
      <input type="radio" id="one" value="true" v-model="join" />
      <label for="one">参加</label>
      <input type="radio" id="two" value="false" v-model="join" />
      <label for="two">不参加</label>
      <br />
      <button type="submit">提交</button>
    </form>
    <p>{{ email }}</p>
    <span>{{ join }}</span>
  </div>
</template>

<script>
export default {
  name: 'FormDemo',
  data() {
    return {
      email: '',
      join: '',
    }
  },
  methods: {
    // methods
    async submitForm(event) {
      console.log(event,'zqj log')
      const res = await this.$http.post('test', {
        email: this.email,
        join: this.join === 'true'
      })
      this.$emit('form-submit')
      this.$emit('success', res)
    }
  },
}
</script>
