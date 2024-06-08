/*
 * @Author      : ZhouQiJun
 * @Date        : 2024-06-08 20:16:32
 * @LastEditors : ZhouQiJun
 * @LastEditTime: 2024-06-08 20:30:59
 * @Description : 使用 render 函数定义函数式组件
 */
function fullName(title) {
  return title + 'jack' + 'chou'
}

export default {
  name: 'FunTwo',
  functional: true,
  props: {
    title: [String],
  },
  render(h, ctx) {
    // console.log(ctx)
    const { props } = ctx
    return h('div', {}, [h('h3', {}, props.title), h('p', {}, fullName(props.title))])
  },
  // 这样定义属性拿不到
  // fullName(props) {
  //   return props.title + 'jack' + 'chou'
  // },
  // methods: {
  //   fullName(title) {
  //     return title + 'jack' + 'chou'
  //   },
  // },
}
