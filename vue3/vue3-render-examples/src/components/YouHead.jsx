import { ref } from 'vue'
export default {
  name: 'YouHead',
  inheritAttrs: false,
  props: ['h'],
  setup(props, { slots, emit, attrs }) {
    console.log('setup props')
    console.log(props)
    console.log('setup slots')
    console.log(slots) // is real slots
    console.log('setup attrs')
    console.log(attrs) // contains event and props
    const person = ref({ name: 'jack', age: 23 })
    //   const tech = ref('vue')

    return {
      // tech,
      person,
      // slots,
      // emit,
    }
  },
  render() {
    console.log('props')
    console.log(this.$props) // not props
    console.log('slots')
    console.log(this.$slots) // [] not slots
    // console.log(this.$scopedSlots);// 没有作用域插槽了
    console.log('attrs')
    console.log(this.$attrs) // { h:1}
    console.log('vnode')
    // console.log(this.$vnode)
    const handlerClick = () => {
      this.person.age = Math.random().toString(36)
      this.$emit('my-click', this.person.age)
    }
    const button = <button onClick={handlerClick}>{this.$slots.default && this.$slots.default()}</button>
    const rightSlot = this.$slots?.right()
    const children = [this.person.age, button, rightSlot]
    return <h1>{children}</h1>
  },
}
