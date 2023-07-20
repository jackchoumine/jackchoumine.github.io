<template>
  <div class="my-button">
    <button class="button" @click="onClick" style="margin: 0 50px; padding: 35px 0">button</button>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'MyButton',
  inheritAttrs: false,
  // emits: {
  //   // eventName:ƒ
  //   click: params => {
  //     if (typeof params === 'string') {
  //       console.log('验证自定义事件抛出的数据')
  //       return true
  //     } else {
  //       return false
  //     }
  //   },
  // },
  setup(props, { emit, attrs, slots }) {
    const onClick = event => {
      console.log('原生事件')
      emit('click', "I'm emit")
      // event.stopPropagation()
    }
    return { onClick }
  },
  mounted() {
    console.log('MyButton----$attrs')
    console.log(this.$attrs)
  },
})
</script>
<style scoped>
.my-button {
  background-color: bisque;
}
.button {
  background-color: lightsalmon;
}
</style>