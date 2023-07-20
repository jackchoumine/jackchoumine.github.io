import { h, ref } from 'vue'
export default {
  name: 'MyInput',
  setup() {
    const inputText = ref('jack')
    const onInput = ({ target }) => {
      inputText.value = target.value
    }
    return {
      inputText,
      onInput,
    }
  },
  render() {
    // return (
    //   <div>
    //     {/* NOTE 不再支持 */}
    //     <input vModel={this.inputText} />
    //     <h2>{this.inputText}</h2>
    //   </div>
    // )
    return (
      <div>
        <input value={this.inputText} onInput={this.onInput} />
        <h2>{this.inputText}</h2>
      </div>
    )
    // return h('div', null, [
    //   h('input', {
    //     // NOTE model 不再支持
    //     // model: {
    //     //   value: this.inputText,
    //     // },
    //     value: this.inputText,
    //     onInput: this.onInput,
    //   }),
    //   h('h2', this.inputText),
    // ])
  },
}
