import { ref } from 'vue'

export default {
  name: 'MyInputTwo',
  setup() {
    const inputText = ref('jack')
    return () => (
      <div>
        <input
          value={inputText.value}
          onInput={({ target }) => {
            inputText.value = target.value
          }}
        />
        <h2>{inputText.value}</h2>
      </div>
    )
  },
}
