<template>
  <div>
    <input v-bind="$attrs" />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MyInput',
  props: {
    size: {
      type: Number,
    },
  },
  inheritAttrs: false,
  setup(props, { emit, attrs, slots }) {
    console.log('props')
    console.log(props)
    console.log('attrs')
    console.log(attrs)
    console.log('$attrs')
    // console.log($attrs) //NOTE 没定义就使用,报错 not defined
    return {}
  },
  mounted() {
    console.log('this.$attrs')
    console.log(this.$attrs)
  },
})
</script>
<style scoped lang="scss">
</style>
