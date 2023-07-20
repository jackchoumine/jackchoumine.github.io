import { h } from 'vue'

export default {
  name: 'MyButton2',
  props: ['buttonText'],
  inheritAttrs: false,
  emits: ['my-click'],
  setup(props, { slots, emit, attrs }) {
    const button = h(
      'button',
      {
        onClick: () => {
          emit('my-click', Math.random().toString(36))
        },
        ...attrs,
      },
      props.buttonText
    )
    return () => h('div', null, [button, slots?.default()])
  },
}
