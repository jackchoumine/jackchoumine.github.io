import { h } from 'vue'
import MyButton from './MyButton'
export default {
  name: 'RenderSlots',
  setup() {
    const ButtonSlots = {
      left: () => <span>左边插槽</span>,
      default: ({ person }) => <span>默认插槽{person?.age}</span>,
      right: ({ age }) => <span>右边插槽{age}</span>,
    }
    return () => h(MyButton, null, ButtonSlots)
  },
}
