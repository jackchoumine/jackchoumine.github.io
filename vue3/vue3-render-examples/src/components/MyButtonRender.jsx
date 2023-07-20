import { reactive } from 'vue'

export default {
  name: 'MyButtonRender',
  setup(props, { slots }) {
    const person = reactive({ name: 'jack', age: 23 })
    return { person }
  },
  render() {
    // console.log(this.$data);
    console.log(this.$attrs);
    const { left, default: _defaultSlot, right } = this.$slots

    const backDefaultSlot = <span>按钮</span>
    const defaultSlot = <button>{(_defaultSlot && _defaultSlot({ person: this.person })) || backDefaultSlot}</button>

    const leftSlot = left && left()
    const rightSlot = right && right({ age: this.person.age })

    const children = [leftSlot, defaultSlot, rightSlot]
    return <div>{children}</div>
  },
}
