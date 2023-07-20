import { defineComponent, ref, h } from 'vue'
import MyTextarea from './MyTextarea.vue'
export default defineComponent({
  name: 'TextareaModelTwo',
  setup() {
    const inputText = ref('TextareaModelTwo')
    const title = ref('TextareaModelTwo')
    return () => (
      <div style={{ backgroundColor: '#ddd' }}>
        <MyTextarea
          modelValue={inputText.value}
          onUpdate:modelValue={modelValue => {
            console.log('modelValue', modelValue)
            inputText.value = modelValue
          }}
          title={title.value}
          onUpdate:title={modelTitle => {
            title.value = modelTitle
          }}
        />
        <h1>{inputText.value + title.value}</h1>
      </div>
    )
  },
})
