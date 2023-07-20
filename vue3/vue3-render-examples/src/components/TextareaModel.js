import { defineComponent, ref, h } from 'vue'
import MyTextarea from './MyTextarea.vue'
export default defineComponent({
  name: 'TextareaModel',
  setup() {
    const inputText = ref('TextareaModel')
    const title = ref('标题')
    const textarea = h(MyTextarea, {
      // 这个不生效了
      // model: {
      //   value: inputText.value,
      //   callback: value => {
      //     console.log('callback')
      //     console.log(value)
      //   },
      // },
      modelValue: inputText.value,
      'onUpdate:modelValue': value => {
        console.log('modelValue', value)
        inputText.value = value
      },
      title: title.value,
      'onUpdate:title': value => {
        console.log('title', value)
        title.value = value
      },
    })
    // NOTE 子元素必须写在 h 函数的第三个参数 const h1 = h('h1', inputText.value)
    return () => h('div', { style: { backgroundColor: '#ccc' } }, [textarea, h('h1', inputText.value + title.value)])
  },
})
