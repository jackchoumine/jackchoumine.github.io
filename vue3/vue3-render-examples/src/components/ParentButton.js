import { h, resolveComponent } from 'vue'
// import MyButton from './MyButton2.jsx'
export default {
  name: 'ParentButton',
  setup() {
    const Button = resolveComponent('MyButton2')
    const myButton = h(
      Button,
      {
        buttonText: '我的按钮',
        onMyClick: data => {
          console.log('myClick', data)
        },
        id: 'my-id-2',
        'data-key': 'custom-prop',
        onProp: () => {
          console.log('onPropFun')
        },
      },
      {
        default: () => {
          return h('span', { title: 'default' }, '这是默认插槽')
        },
      }
    )
    return () => myButton
  },
}
