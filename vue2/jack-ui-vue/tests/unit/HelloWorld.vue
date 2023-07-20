<!--
 * @Author      : ZhouQiJun
 * @Date        : 2023-07-20 16:09:25
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2023-07-20 16:10:13
 * @Description : 
-->
<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
}
</script>

<template>
  <div>{{ msg }}</div>
</template>
