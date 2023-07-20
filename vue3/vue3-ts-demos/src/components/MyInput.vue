<!--
 * @Description :
 * @Date        : 2021-10-28 02:18:26 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-10-28 02:40:03 +0800
 * @LastEditors : JackChou
-->
<template>
  <div>
    <input :value="value" @input="update" />
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { useVModel } from '../hooks'
export default defineComponent({
  name: 'MyInput',
  components: {},
  // eslint-disable-next-line vue/require-prop-types
  props: ['value'],
  setup(props) {
    console.log(props)
    const value = useVModel(props, 'value')
    function update(e) {
      value.value = e.target.value
    }
    return { value, update }
  },
})
</script>
<style scoped lang="scss"></style>
