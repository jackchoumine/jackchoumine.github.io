<script>
export default {
  name: 'ClickOutsideDemo',
  data() {
    return {
      msg: 'Hello web components in stencil!',
    }
  },
  methods: {
    onClickOutside() {
      console.log('onClickOutside')
      console.log(this.msg)
      // alert('onClickOutside')
    },
  },
}
</script>

<template>
  <div>
    <h3>测试 v-click-outside</h3>
    <div v-click-outside="onClickOutside" class="container">
      <p>测试点击外部</p>
      <p>测试点击外部</p>
    </div>
  </div>
</template>

<style>
.container {
  background-color: antiquewhite;
}
</style>
