import { h, ref } from 'vue'
import MyTextarea from './MyTextarea.vue'
export default {
  name: 'YouTextareaJSX',
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const text = ref(props.modelValue)
    const change = value => {
      text.value = value
      emit('update:modelValue', value)
    }
    return () => h(MyTextarea, { modelValue: text.value, 'onUpdate:modelValue': change })
  },
}
