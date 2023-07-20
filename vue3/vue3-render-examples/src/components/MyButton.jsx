import { h, reactive } from 'vue'

export default {
  name: 'MyButtonSetup',
  setup(props, { slots }) {
    const person = reactive({ name: 'jack', age: 23 })
    const { left, default: _defaultSlot, right } = slots

    const backDefaultSlot = <span>按钮</span>
    const defaultSlot = <button>{(_defaultSlot && _defaultSlot({ person })) || backDefaultSlot}</button>

    const leftSlot = left && left()
    const rightSlot = right && right({ age: person.age })

    const children = [leftSlot, defaultSlot, rightSlot]
    // 返回 jsx
    // return () => <div>{children}</div>
    return () => h('div', null, children)
  },
}
