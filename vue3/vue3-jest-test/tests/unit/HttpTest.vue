<template>
  <button type="button" @click="onClick">hello http</button>
  <subComponent />
  <HelloWorld />
</template>

<script>
import {  onMounted, defineComponent } from 'vue'

import axios from 'axios'

export default defineComponent({
  name: 'HttpTest',
  setup(props, { emit, attrs, slots }) {
    onMounted(() => {
      axios.get('/')
    })
    function onClick() {
      emit('my-click', 'hello', 123)
    }
    return {
      onClick,
    }
  },
})
</script>
