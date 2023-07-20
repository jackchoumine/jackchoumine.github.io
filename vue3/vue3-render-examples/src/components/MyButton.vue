<template>
  <div>
    <slot name="left"></slot>
    <button>
      <slot v-bind:person="person">
        <span>按钮</span>
      </slot>
    </button>
    <slot name="right" v-bind:age="person.age"></slot>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'MyButton',
  setup(props, { slots }) {
    const person = reactive({ name: 'jack', age: 23 })
    return { person }
  },
}
</script>
